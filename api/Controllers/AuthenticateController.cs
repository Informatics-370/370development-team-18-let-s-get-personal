using IPKP___API.Controllers.Models.EmailInterface;
using IPKP___API.Controllers.Models.Entities;
using IPKP___API.Controllers.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace IPKP___API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthenticateController : ControllerBase
  {
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _configuration;
    private readonly IEmailService _emailService;

    public AuthenticateController(
        UserManager<IdentityUser> userManager,
        RoleManager<IdentityRole> roleManager,
        IConfiguration configuration)
    {
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
        var userRoles = await _userManager.GetRolesAsync(user);

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
          expiration = token.ValidTo
        });
      }
      return Unauthorized();
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
    {
      var userExists = await _userManager.FindByNameAsync(model.Username);
      if (userExists != null)
        return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

      IdentityUser user = new()
      {
        Email = model.Email,
        SecurityStamp = Guid.NewGuid().ToString(),
        UserName = model.Username
      };
      var result = await _userManager.CreateAsync(user, model.Password);
      if (!result.Succeeded)
        return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

      if (!await _roleManager.RoleExistsAsync(User_Role.User))
        await _roleManager.CreateAsync(new IdentityRole(User_Role.User));
      if (await _roleManager.RoleExistsAsync(User_Role.User))
      {
        await _userManager.AddToRoleAsync(user, User_Role.User);
      }
      return Ok(new Response { Status = "Success", Message = "User created successfully!" });
    }

    [HttpPost]
    [Route("register-admin")]
    public async Task<IActionResult> RegisterAdmin([FromBody] RegisterViewModel model)
    {
      var userExists = await _userManager.FindByNameAsync(model.Username);
      if (userExists != null)
        return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

      IdentityUser user = new()
      {
        Email = model.Email,
        SecurityStamp = Guid.NewGuid().ToString(),
        UserName = model.Username
      };
      var result = await _userManager.CreateAsync(user, model.Password);
      if (!result.Succeeded)
        return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

      if (!await _roleManager.RoleExistsAsync(User_Role.Admin))
        await _roleManager.CreateAsync(new IdentityRole(User_Role.Admin));
      if (!await _roleManager.RoleExistsAsync(User_Role.User))
        await _roleManager.CreateAsync(new IdentityRole(User_Role.User));

      if (await _roleManager.RoleExistsAsync(User_Role.Admin))
      {
        await _userManager.AddToRoleAsync(user, User_Role.Admin);
      }
      if (await _roleManager.RoleExistsAsync(User_Role.Admin))
      {
        await _userManager.AddToRoleAsync(user, User_Role.User);
      }
      return Ok(new Response { Status = "Success", Message = "User created successfully!" });
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
    [AllowAnonymous]
    [Route("ForgotPassword")]
    public async Task<IActionResult> ForgotPasswordAsync([Required] string email)
    {
      var user =await  _userManager.FindByEmailAsync(email);
      if(user! == null)
      {
        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        var forgotPasswordLink = Url.Action(nameof(ResetPassword), "Authenticate",
          new { token, email = user.Email }, Request.Scheme);
        var message = new Message(email, "Password Reset",
          "<p>Please use the link to reset your password: </p>" + forgotPasswordLink);
        _emailService.SendEmail(message);
        return StatusCode(StatusCodes.Status200OK,
          new Response { Status = "Success", Message = $"Email sent successfully!" });
      }
      else
      {
        return StatusCode(StatusCodes.Status400BadRequest,
          new Response { Status = "Fail", Message = $"Email not sent! Please contact support." });
      }
    }

    [HttpGet("ResetPassword")]
    public async Task<IActionResult> ResetPassword(string token, string email)
    {
      var model = new ResetPassword { Token = token, Email = email };
      return Ok(new
      {
        model
      });
    }

    [HttpPost]
    [Route("ResetPassword")]
    [AllowAnonymous]
    public async Task<IActionResult> ResetPassword(ResetPassword resetPassword)
    {
      var user = await _userManager.FindByEmailAsync(resetPassword.Email);
      if(user != null)
      {
        var resetPassResult = await _userManager
          .ResetPasswordAsync(user, resetPassword.Token, resetPassword.ConfirmPassword);
        if(!resetPassResult.Succeeded)
        {
          foreach(var error in resetPassResult.Errors)
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

    }
  }
}
