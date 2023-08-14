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
                User_ID = new Guid(),
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
                    User_ID = new Guid(),
                    Date_Registered = DateTime.Now,
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

            if (user != null)
            {
                try
                {

                    var principal = await _claimsPrincipalFactory.CreateAsync((AppUser)user);

                    await HttpContext.SignInAsync(IdentityConstants.ApplicationScheme, principal);

                    // 2 Step Verification
                    var otp = GenerateTwoFactorCodeFor(user.UserName);

                    var fromEmailAddress = "resinartnewsletter@gmail.com"; // you must add your own provided email
                    var subject = "System Log in";
                    var message = $"Enter the following OTP: {otp}";
                    var toEmailAddress = user.Email;

                    // Sending email
                    await SendEmail(fromEmailAddress, subject, message, toEmailAddress);

                    //return GenerateJWTToken(user);

                }
                catch (Exception)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Internal error occured. Please contact support");
                }
            }
            else
            {
                return NotFound("Does not exist");
            }

            //, Password = user.PasswordHash
            var loggedInUser = new ForgotPassword { UserName = user.UserName };

            return Ok(loggedInUser);
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

        private async Task SendEmail(string fromEmailAddress, string subject, string message, string toEmailAddress)
        {
            var fromAddress = new MailAddress(fromEmailAddress);
            var toAddress = new MailAddress(toEmailAddress);

            using (var compiledMessage = new MailMessage(fromAddress, toAddress))
            {
                compiledMessage.Subject = subject;
                compiledMessage.Body = string.Format("Message: {0}", message);

                using (var smtp = new SmtpClient())
                {
                    smtp.Host = "smtp.gmail.com"; // for example: smtp.gmail.com
                    smtp.Port = 587;
                    smtp.EnableSsl = true;
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new NetworkCredential("itspersonal@gmail.com", "pnyblzriureedwgp"); // your own provided email and password
                    await smtp.SendMailAsync(compiledMessage);
                }
            }
        }
    }
}

//[HttpPost]
//[Route("GetCustomerbyID")]
//public async Task<IActionResult> GetCustomerbyID([FromBody] LoginViewModel model)
//{
//    var user = await _userManager.FindByNameAsync(model.Username);
//    if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
//    {
//        List<Customer> CustomerList = new List<Customer>();

//        var results = await _IPKPRepository.GetAllCustomersAsync();

//        return Ok(user);
//    }
//    else
//    {
//        return StatusCode(StatusCodes.Status500InternalServerError, "Internal error occured. Please contact support");
//    }
//}