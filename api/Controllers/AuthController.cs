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
        UserManager<IdentityUser> userManager,
        IUserClaimsPrincipalFactory<IdentityUser> userClaimsPrincipalFactory,
        RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _claimsPrincipalFactory = userClaimsPrincipalFactory;
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
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
                    return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
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
                var customer = new Customer()
                {
                    //Username = register.Username,
                    Customer_ID = int.NewGuid(),
                    Title = register.Customer.Title,

                    Cell_Number = register.Customer.Cell_Number,
                    Email = register.Email,

                };
                var address = new Address()
                {
                   

                };

                AppUser user = new()
                {
                    Id = int.NewGuid().ToString(),
                    UserName = register.Username,                    
                };
                var result = await _userManager.CreateAsync(user, register.Password);

                if (result.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Account registration failed. Please contact support.");

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
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }
    }
}
