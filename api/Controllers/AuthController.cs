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
        //private readonly UserManager<IdentityUser> _userManager;
        //private readonly IUserClaimsPrincipalFactory<IdentityUser> _claimsPrincipalFactory;
        //private readonly IConfiguration _configuration;
        //private readonly IIPKPRepository _IPKPRepository;
        //private readonly RoleManager<IdentityRole> _roleManager;
        //public AuthController(
        //UserManager<IdentityUser> userManager, IIPKPRepository iPKPRepository,
        //IUserClaimsPrincipalFactory<IdentityUser> userClaimsPrincipalFactory,
        //RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        //{
        //    _claimsPrincipalFactory = userClaimsPrincipalFactory;
        //    _userManager = userManager;
        //    _roleManager = roleManager;
        //    _configuration = configuration;
        //    _IPKPRepository = iPKPRepository;
        //}

        //[HttpPost]
        //[Route("Login")]
        //public async Task<IActionResult> Login(LoginViewModel login)
        //{
        //    var user = await _userManager.FindByNameAsync(login.Username);

        //    if (user != null && await _userManager.CheckPasswordAsync(user, login.Password))
        //    {
        //        try
        //        {
        //            var pfactory = await _claimsPrincipalFactory.CreateAsync(user);
        //            await HttpContext.SignInAsync(IdentityConstants.ApplicationScheme, pfactory);

        //        }
        //        catch (Exception)
        //        {
        //            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
        //        }

        //        var userloggedin = new LoginViewModel { Username = login.Username };
        //        return Ok(userloggedin);
        //    }
        //    return Unauthorized();
        //}

        //[HttpPost]
        //[Route("Register")]
        //public async Task<IActionResult> Register(RegisterViewModel register)
        //{
        //    var checkuser = await _userManager.FindByNameAsync(register.Username);

        //    if (checkuser == null)
        //    {

        //        AppUser user = new()
        //        {
        //            Id = Guid.NewGuid().ToString(),
        //            UserName = register.Username,                    
        //        };
        //        try
        //        {

        //            var result = await _userManager.CreateAsync(user, register.Password);
        //            if (result.Succeeded)
        //            {
        //                return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        //                //trigger get request for the app user id 
        //            }
        //            else
        //            {
        //                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Unable to Register Account" });

        //            }
        //        }
        //        catch
        //        {
        //            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Unable to add Account details" });

        //        }
        //    }
        //    else //if user exists
        //    {
        //        return StatusCode(StatusCodes.Status403Forbidden, "This account already exists.");
        //    }
        //}

        //[HttpGet]
        //[Route("GetTitles")]
        //public async Task<IActionResult> GetTitles(RegisterViewModel register)
        //{
        //    try
        //    {
        //        var results = await _IPKPRepository.GetTitlesAsync();
                
        //        if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Delivery" });

        //        return Ok(results);
        //    }
        //    catch (Exception)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
        //    }
        //}

        ////add address
        ////add customer

        //[HttpPost]
        //[Route("AddCustomer")]
        //public async Task<IActionResult> AddCustomer(Customer customer)
        //{
        //    var newcustomer = new Customer
        //    {
        //        Customer_ID = new Guid(),
        //        //Address_ID = new Guid(),

        //        //Title = customer.Title,
        //        //Address = customer.Address,
        //        //User = customer.User,
        //        FirstName = customer.FirstName,
        //        Surname = customer.Surname,
        //        Cell_Number = customer.Cell_Number,
        //        Email = customer.Email,                
        //        Basket = customer.Basket,

        //        //newAddress = new Address
        //        //{
        //        //    Address_ID = customer.Address,
        //        //    Province_Name = adress.Province_Name,
        //        //    City_Name = adress.City_Name,
        //        //    Street = adress.Street,
        //        //    Number = adress.Number,
        //        //    Dwelling_Type = adress.Dwelling_Type,
        //        //    Unit_Number = adress.Unit_Number,
        //        //    Area_Code = adress.Area_Code,
        //        //}
        //    };
        //    try
        //    {

        //        _IPKPRepository.Add(newcustomer);
        //        await _IPKPRepository.SaveChangesAsync();
        //    }
        //    catch (Exception)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
        //    }
        //    return Ok(new Response { Status = "Success", Message = "Employee Added To Database." });
        //}
    }
}
