using IPKP___API.Controllers.Models.Repository;
using IPKP___API.Controllers.Models.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System;
using IPKP___API.Controllers.Models.Entities;

namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IUserClaimsPrincipalFactory<IdentityUser> _claimsPrincipalFactory;
        private readonly IConfiguration _configuration;
        private readonly IIPKPRepository _IPKPRepository;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AuthController(
        UserManager<IdentityUser> userManager, IIPKPRepository iPKPRepository,
        IUserClaimsPrincipalFactory<IdentityUser> userClaimsPrincipalFactory,
        RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _claimsPrincipalFactory = userClaimsPrincipalFactory;
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _IPKPRepository = iPKPRepository;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginViewModel login)
        {
            var user = await _userManager.FindByNameAsync(login.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, login.Password))
            {
                try
                {
                    var pfactory = await _claimsPrincipalFactory.CreateAsync(user);
                    await HttpContext.SignInAsync(IdentityConstants.ApplicationScheme, pfactory);

                }
                catch (Exception)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
                }

                var userloggedin = new LoginViewModel { Username = login.Username };
                return Ok(userloggedin);
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterViewModel register)
        {
            var checkuser = await _userManager.FindByNameAsync(register.Username);

            if (checkuser == null)
            {
                using (var context = new AppDbContext())
                {
                    var customer = new Customer()
                    {
                        Customer_ID = new Guid(),
                        Title_ID = register.Title_ID,
                        FirstName = register.FirstName,
                        Surname = register.Surname,
                        Cell_Number = register.Cell_Number,
                        Email = register.Email,
                        Username = register.Username,
                        //User_ID = register.User_ID,

                        Address = new Address()
                        {
                            Address_ID = new Guid(),
                            Province_Name = register.Province_Name,
                            City_Name = register.City_Name,
                            Street = register.Street,
                            Number = register.Number,
                            Dwelling_Type = register.Dwelling_Type,
                            Unit_Number = register.Unit_Number,
                            Area_Code = register.Area_Code,
                        }                       

                    };
                };

                AppUser user = new()
                {
                    Id = Guid.NewGuid().ToString(),
                    UserName = register.Username,                    
                };
                try
                {
                    //_IPKPRepository.Add(customer);
                    //await _IPKPRepository.SaveChangesAsync();

                    var result = await _userManager.CreateAsync(user, register.Password);
                    if (result.Succeeded)
                    {
                        return Ok(new Response { Status = "Success", Message = "User created successfully!" });
                    }
                    else
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Unable to Register Account" });

                    }
                }
                catch
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Unable to add Account details" });

                }
            }
            else //if user exists
            {
                return StatusCode(StatusCodes.Status403Forbidden, "This account already exists.");
            }
        }

        [HttpGet]
        [Route("GetTitles")]
        public async Task<IActionResult> GetTitles(RegisterViewModel register)
        {
            try
            {
                var results = await _IPKPRepository.GetTitlesAsync();
                
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Delivery" });

                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }
    }
}
