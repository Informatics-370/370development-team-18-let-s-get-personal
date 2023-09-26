using IPKP___API.Controllers.Models.Entities;
using IPKP___API.Controllers.Models.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;
using IPKP___API.Controllers.Models.Repository;
using static System.Net.WebRequestMethods;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;

namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        //METHODS: login, register, register admin, forgot password, generate2factorcode, getuniquekey, send email
        private readonly IIPKPRepository _IPKPRepository;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IUserClaimsPrincipalFactory<AppUser> _claimsPrincipalFactory;
        private static Dictionary<string, TwoFactorCode> _twoFactorCodeDictionary
          = new Dictionary<string, TwoFactorCode>();

        public AuthenticateController(
        UserManager<IdentityUser> userManager, IIPKPRepository iPKPRepository,
        RoleManager<IdentityRole> roleManager,
        IConfiguration configuration)
        {
            _IPKPRepository = iPKPRepository;
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)

        {
            var user = await _userManager.FindByNameAsync(model.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                try
                {
                    var userRoles = await _userManager.GetRolesAsync(user);
                    var userId = await _userManager.GetUserIdAsync(user);


                    var authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, user.UserName),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    };

                    foreach (var userRole in userRoles)
                    {
                        authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                    }

                    var token = GetToken(authClaims);

                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo,
                    });
                }
                catch
                {
                    return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });

                }
            }
            else
            {
                return BadRequest(new Response { Status = "Error", Message = "User details wer not found. Please check your login details" });
                //return StatusCode(StatusCodes.Status404NotFound, new Response { Status = "Error", Message = "User details wer not found. Please check your login details"  });
            }
        }

        [HttpPost]
        [Route("RegisterCustomer")]
        public async Task<IActionResult> RegisterCustomer([FromBody] RegisterViewModel model)
        {

            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            //create and save new identity user
            IdentityUser user = new()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await _userManager.CreateAsync(user, model.Password);

            //create and save new customer
            var customer = new Customer
            {
                Customer_ID = new Guid(),
                FirstName = model.FirstName,
                Surname = model.Surname,
                Email = model.Email,
                Username = model.Username,
                Cell_Number = model.Cell_Number,
                Date_Registered = DateTime.Now,
                User_ID = new Guid(user.Id),

                User = new User
                {
                    User_ID = new Guid(user.Id),
                    Username = model.Username,
                }
            };

            _IPKPRepository.Add(customer);
            await _IPKPRepository.SaveChangesAsync();

            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            if (!await _roleManager.RoleExistsAsync(User_Role.user))
                await _roleManager.CreateAsync(new IdentityRole(User_Role.user));
            if (await _roleManager.RoleExistsAsync(User_Role.user))
            {
                await _userManager.AddToRoleAsync(user, User_Role.user);
            }

            var subject = "Your IPKP account has been successfully registered!";
            var message = "We are excited to welcome you to It's Personal's community!<br><br>" +
    "We are writing to inform you that your account has been successfully registered, and you are now a valued member of our platform. This is a significant step toward enjoying the full range of benefits and services we offer.<br><br>" +
    "Here are some key details about your account:<br>" +
    "<ul>" +
    "<li>Username: " + model.Username + "</li>" +
    "<li>Email Address: " + model.Email + "</li>" +
    "<li>Account Created On: " + customer.Date_Registered + "</li>" +
    "</ul>" +
    "With your newly registered account, you can now:<br>" +
    "<ul>" +
    "<li>Access our platform and explore all the features and services we offer.</li>" +
    "<li>Customize your profile and preferences to tailor your experience.</li>" +
    "<li>Enjoy personalizing your products and gifting your loved ones.</li>" +
    "</ul>" +
    "If you encounter any issues during the registration process or have questions about using our platform, please don't hesitate to reach out to our dedicated customer support team at <a href='mailto:ktlmamadi@gmail.com'>IPKP@gmail.com</a>. We are here to assist you every step of the way.<br><br>" +
    "Thank you for choosing It's Personal. We look forward to providing you with an exceptional experience, and we're excited to have you as a member of our community.<br><br>" +
    "Warm regards,<br>Let's Get Personal";

            await SendEmail(subject, message, model.Email);


            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        [HttpPost]
        [Route("RegisterAdmin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterViewModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });
            }
            else
            {
                //create and save new identity user
                IdentityUser user = new()
                {
                    Email = model.Email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = model.Username
                };
                var result = await _userManager.CreateAsync(user, model.Password);

                //create and save new admin user
                var admin = new Admin
                {
                    Admin_ID = new Guid(),
                    FirstName = model.FirstName,
                    Surname = model.Surname,
                    Email = model.Email,
                    Username = model.Username,
                    Cell_Number = model.Cell_Number,
                    User_ID = new Guid(),
                    Date_Registered = DateTime.Now,

                    User = new User
                    {
                        User_ID = new Guid(user.Id),
                        Username = model.Username,
                    }
                };

                _IPKPRepository.Add(admin);
                await _IPKPRepository.SaveChangesAsync();

                if (result.Errors.Count() > 0)//(!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

                }
                if (!await _roleManager.RoleExistsAsync(User_Role.admin))
                {
                    await _roleManager.CreateAsync(new IdentityRole(User_Role.admin));
                }
                if (await _roleManager.RoleExistsAsync(User_Role.admin))
                {
                    await _userManager.AddToRoleAsync(user, User_Role.admin);
                }
                return Ok(new Response { Status = "Success", Message = "User created successfully!" });
            }
        }

        [HttpPost]
        [Route("RegisterEmployee")]
        public async Task<IActionResult> RegisterEmployee([FromBody] RegisterViewModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });
            }
            else
            {

                IdentityUser user = new()
                {
                    Email = model.Email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = model.Username
                };
                var result = await _userManager.CreateAsync(user, model.Password);

                //create and save new admin user
                var employee = new Employee
                {
                    Employee_ID = new Guid(),
                    FirstName = model.FirstName,
                    Surname = model.Surname,
                    Email = model.Email,
                    Username = model.Username,
                    Cell_Number = model.Cell_Number,
                    User_ID = new Guid(user.Id),
                    Date_Registered = DateTime.Now,

                    User = new User
                    {
                        User_ID = new Guid(user.Id),
                        Username = model.Username,
                    }
                };

                _IPKPRepository.Add(employee);
                await _IPKPRepository.SaveChangesAsync();


                if (result.Errors.Count() > 0)//(!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

                }
                //give user employee role
                if (!await _roleManager.RoleExistsAsync(User_Role.employee))
                {
                    await _roleManager.CreateAsync(new IdentityRole(User_Role.employee));
                }
                if (await _roleManager.RoleExistsAsync(User_Role.employee))
                {
                    await _userManager.AddToRoleAsync(user, User_Role.employee);
                }

                return Ok(new Response { Status = "Success", Message = "User created successfully!" });
            }
        }

        [HttpGet]
        [Route("GetCustomerID/{username}")]
        public async Task<IActionResult> GetCustomerID(string username)
        {
            try
            {
                var results = await _IPKPRepository.GetUser(username);
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Customer" });
                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpGet]
        [Route("GetAdminID/{username}")]
        public async Task<IActionResult> GetAdminID(string username)
        {
            try
            {
                var results = await _IPKPRepository.GetAdmin(username);
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Admin" });
                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpGet]
        [Route("GetEmployeeID/{username}")]
        public async Task<IActionResult> GetEmployeeID(string username)
        {
            try
            {
                var results = await _IPKPRepository.GetEmployee(username);
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Admin" });
                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }

        [HttpPost]
        [Route("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPassword uvm)
        {
            var user = await _userManager.FindByNameAsync(uvm.UserName);

            int otp = GenerateRandomNumer();

            if (user != null)
            {
             
                try
                {

                    /*var principal = await _claimsPrincipalFactory.CreateAsync((AppUser)user);

                    await HttpContext.SignInAsync(IdentityConstants.ApplicationScheme, principal);

                    // 2 Step Verification
                    var otp = GenerateTwoFactorCodeFor(user.UserName);

                    var fromEmailAddress = "u19032618@tuks.co.za"; // you must add your clients email
                    var subject = "System Log in";
                    var message = $"Enter the following OTP: {otp}";
                    var toEmailAddress = user.Email;

                    // Sending email
                    await SendEmail(subject, message, toEmailAddress);

                    //return GenerateJWTToken(user);*/

                    //string userId = uvm.UserName;
                    // string generatedOTP = GenerateOTP(6); // Generate OTP
                    // DateTime expirationTime = DateTime.Now.AddMinutes(15); // Set expiration time (adjust as needed)

                    // Store OTP and expiration time in the distributed cache
                    // You'll need to use the appropriate caching library and configuration here

                    var subject = "Your One-Time Password (OTP) Pin";
                    var message = "Dear "+uvm.UserName+",<br><br>" +
                    "We hope this message finds you well.<br><br>"+
                    "Thank you for using our services. To ensure the security of your account, we have generated a One-Time Password (OTP) pin for you.<br><br>" +
                    "Your OTP Pin: "+otp+"<br><br>" +

                    "If you did not request this OTP or have any concerns about your account security, please contact our customer support immediately at <a href='mailto:ktlmamadi@gmail.com'>IPKP@gmail.com</a> <br>" +
                    "Thank you for choosing our services. We appreciate your trust in us.<br><br>"+
   
                    "Best regards,<br>Let's Get Personal";

                    _ = SendEmail(subject, message, user.Email);

                }
                catch (Exception)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Internal error12 occured. Please contact support");
                }
            }
            else
            {
                return NotFound("Does not exist");
            }

            //, Password = user.PasswordHash
            var loggedInUser = new ForgotPassword { UserName = user.UserName };

            return Ok(otp);
        }


        //[HttpGet("ResetPassword")]
        //public async Task<IActionResult> ResetPassword(string token, string email)
        //{
        //    var model = new ResetPassword { Token = token, Email = email };
        //    return Ok(new
        //    {
        //        model
        //    });
        //}

        /*[HttpPost]
        [Route("ResetPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword(ResetPassword resetPassword)
        {
            var user = await _userManager.FindByEmailAsync(resetPassword.Email);
            if (user != null)
            {
                var resetPassResult = await _userManager
                  .ResetPasswordAsync(user, resetPassword.Token, resetPassword.ConfirmPassword);
                if (!resetPassResult.Succeeded)
                {
                    foreach (var error in resetPassResult.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }
                    return Ok(ModelState);
                }
                return StatusCode(StatusCodes.Status200OK,
                  new Response { Status = "Success", Message = $"Password changed successfully!" });
            }
            return StatusCode(StatusCodes.Status400BadRequest,
                new Response { Status = "Fail", Message = $"Password not changed! Please contact support." });

        }*/

        private int GenerateRandomNumer() {
            int _min = 1000;
            int _max = 9999;

            Random _rdm = new Random();

            return _rdm.Next(_min, _max);
        }

        public static string GenerateOTP(int length)
        {
            const string validChars = "0123456789";
            using (var rng = new RNGCryptoServiceProvider())
            {
                var otp = new char[length];
                var charsLength = validChars.Length;
                var buffer = new byte[1];

                for (int i = 0; i < length; i++)
                {
                    rng.GetBytes(buffer);
                    var randomNumber = BitConverter.ToUInt32(buffer, 0);
                    var randomIndex = (int)(randomNumber % charsLength);
                    otp[i] = validChars[randomIndex];
                }

                return new string(otp);
            }
        }

        private static string GenerateTwoFactorCodeFor(string username)
        {
            var code = GetUniqueKey();

            var twoFactorCode = new TwoFactorCode(code);

            // add or overwrite code
            _twoFactorCodeDictionary[username] = twoFactorCode;

            return code;
        }

        private static string GetUniqueKey()
        {
            Random rnd = new Random();

            var optCode = rnd.Next(1000, 9999);

            return optCode.ToString();
        }

        private async Task SendEmail(/*string fromEmailAddress,*/ string subject, string message, string toEmailAddress)
        {
            string fromEmailAddress = "sarahpick@gmail.com";
            var fromAddress = new MailAddress(fromEmailAddress);
            var toAddress = new MailAddress(toEmailAddress);

            SmtpClient client = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("ktlmamadi@gmail.com", "wauc crru pvma osvq"),
                EnableSsl = true
            };

            MailMessage msg = new MailMessage() { 
                From= new MailAddress(fromEmailAddress),
                Subject =subject,
                Body = message,
                IsBodyHtml=true
            };

            msg.To.Add(toEmailAddress);

            try {
                client.Send(msg);
                Console.WriteLine("Email sent successfully!");
            }
            catch (Exception e) {
                Console.WriteLine($"An error occurred: {e.Message}");

            }
            /*
            using (var compiledMessage = new MailMessage(fromAddress, toAddress))
            {
                compiledMessage.Subject = subject;
                compiledMessage.Body = string.Format("Message: {0}", message);

                using (var smtp = new SmtpClient())
                {
                    smtp.Host = "smtp.gmail.com"; // for example: smtp.gmail.com
                    smtp.Port = 587;
                   // smtp.EnableSsl = true;
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.UseDefaultCredentials = false;
               
                    smtp.Credentials = new NetworkCredential("sarahpick@gmail.com", "Sarah@Gmail0702"); // your own provided email and password
                    await smtp.SendMailAsync(compiledMessage);
                }
            }*/
        }

        //FOR CAPTURING RATINGS BY CUSTOMER
        [HttpPost]
        [Route("GetCustomerbyID")]
        public async Task<IActionResult> GetCustomerbyID([FromBody] LoginViewModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                List<Customer> CustomerList = new List<Customer>();

                var results = await _IPKPRepository.GetAllCustomersAsync();

                return Ok(user);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal error occured. Please contact support");
            }
        }

        [HttpPost]
        [Route("ChangeUserPassword")]
        public async Task<IActionResult> ChangeUserPassword([FromBody] ChangePasswordVM changepasswordVM)
        {
            var user = await _userManager.FindByNameAsync(changepasswordVM.UserName);

            if (user != null)
            {
                var result = await _userManager.ChangePasswordAsync(user, changepasswordVM.OldPassword, changepasswordVM.NewPassword);

                if (result.Succeeded)
                {
                    return Ok(new Response { Status = "Success", Message = "User Password Updated Successfully!" });
                }
                else
                {
                    return BadRequest(new Response { Status = "Error", Message = "User Password Not Updated!" });
                }

            }
            else
            {
                return NotFound(new Response { Status = "Error", Message = "User Not Found!" });                
            }            

        }

        [HttpPost]
        [Route("DeleteUser/{username}")]
        public async Task<IActionResult> DeleteUser(string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound(new Response { Status = "Error", Message = "User Not Found!" });
            }
            else
            {
                var result = await _userManager.DeleteAsync(user);

                if (result.Succeeded)
                {
                    return Ok(new Response { Status = "Success", Message = "User Password Updated Successfully!" });
                }
                else
                {
                    return BadRequest(new Response { Status = "Error", Message = "User Password Not Updated!" });
                }
            }
        }

        //[HttpPost]
        //[Route("ChangeUserName")]
        //public async Task<IActionResult> ChangeUserName([FromBody] ChangePasswordVM changeVM)
        //{
        //    var user = await _userManager.FindByNameAsync(changeVM.UserName);

        //    if (user != null)
        //    {
        //        var result = await _userManager.UpdateNormalizedUserNameAsync(user);

        //        if (result.Succeeded)
        //        {
        //            return Ok(new Response { Status = "Success", Message = "User Password Updated Successfully!" });
        //        }
        //        else
        //        {
        //            return BadRequest(new Response { Status = "Error", Message = "User Password Not Updated!" });
        //        }

        //    }
        //    else
        //    {
        //        return NotFound(new Response { Status = "Error", Message = "User Not Found!" });
        //    }

        //}

    }
}

