using IPKP___API.Controllers.Models;
using IPKP___API.Controllers.Models.Entities;
using IPKP___API.Controllers.Models.Repository;
using IPKP___API.Controllers.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http.HttpResults;

namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        //Users, employees and customers
        private readonly IIPKPRepository _IPKPRepository;
        private readonly UserManager<IdentityUser> _userManager;
        public UserProfileController(IIPKPRepository iPKPRepository, UserManager<IdentityUser> userManager)
        {
            _IPKPRepository = iPKPRepository;
            _userManager = userManager;
        }
        //*************** Admins ***************\\
        [HttpGet]
        [Route("GetAllAdmins")]
        public async Task<IActionResult> GetAllAdminssAsync()
        {
            try
            {
                var results = await _IPKPRepository.GetAllAdminssAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        [HttpGet]
        [Route("GetAdminDetails/{admin_ID}")]
        public async Task<IActionResult> GetAdminDetails(Guid admin_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetAdminDetailsAsync(admin_ID);
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        [HttpPut]
        [Route("UpdateAdmin/{admin_ID}")]
        public async Task<IActionResult> UpdateAdminAsync(Guid admin_ID, Admin admin)
        {
            try
            {
                var existingAdmin = await _IPKPRepository.GetAdminDetailsAsync(admin_ID);
                var user = await _userManager.FindByNameAsync(existingAdmin.Username);

                if (existingAdmin == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Employee " + admin_ID });
                }
                else 
                {
                    existingAdmin.User = admin.User;
                    existingAdmin.FirstName = admin.FirstName;
                    existingAdmin.Surname = admin.Surname;
                    existingAdmin.Cell_Number = admin.Cell_Number;
                    existingAdmin.Email = admin.Email;
                    existingAdmin.Username = admin.Username;
                    var usernamereuslt = await _userManager.SetUserNameAsync(user, admin.Username);
                    var emailresult = await _userManager.SetEmailAsync(user, admin.Email);

                    if (await _IPKPRepository.SaveChangesAsync())
                    {                        
                        if (usernamereuslt.Succeeded && emailresult.Succeeded)
                        {
                            return Ok(new Response { Status = "Success", Message = "Admin details Updated Successfully!" });
                        }
                    }                    
                }
                
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "New Admin Details Saved To Database." });
        }

        [HttpDelete]
        [Route("DeleteAdminUser/{admin_ID}")]
        public async Task<IActionResult> DeleteAdminUserProfileAsync(Guid admin_ID)
        {
            try
            {
                var existingAdminUser = await _IPKPRepository.GetAdminDetailsAsync(admin_ID);

                if (existingAdminUser == null)
                {
                    return NotFound("Could Not Find Admin User" + admin_ID);
                }
                else
                {
                    _IPKPRepository.Delete(existingAdminUser);

                    if (await _IPKPRepository.SaveChangesAsync())
                    {
                        return Ok("Admin User Removed Successfully");
                    }
                }

            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok("Admin USer Removed From Database.");
        }


        //*************** Customers ***************\\
        [HttpGet]
        [Route("GetAllCustomers")]
        public async Task<IActionResult> GetAllCustomersAsync()
        {
            try
            {
                var results = await _IPKPRepository.GetAllCustomersAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        [HttpGet]
        [Route("GetCustomerUserProfile/{customer_ID}")]
        public async Task<IActionResult> GetCustomerUserProfileDetailsAsync(Guid customer_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetCustomerDetailsAsync(customer_ID);
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        [HttpDelete]
        [Route("DeleteCustomerUser/{customer_ID}")]
        public async Task<IActionResult> DeleteCustomerUserProfileAsync(Guid customer_ID)
        {
            try
            {
                var orderrequests = await _IPKPRepository.GetOrderRequestByCustomerID(customer_ID);
                var existingCustomerUser = await _IPKPRepository.GetCustomerDetailsAsync(customer_ID);
                var user = await _userManager.FindByNameAsync(existingCustomerUser.Username);

                if (existingCustomerUser == null) 
                {
                    return NotFound("Could Not Find Customer User" + customer_ID);
                }
                else if (orderrequests != null)
                {
                    return BadRequest(new Response { Status = "Error", Message = "Customer has a requested order." });
                }
                else
                {
                    _IPKPRepository.Delete(existingCustomerUser);
                    var result = await _userManager.DeleteAsync(user);

                    if (await _IPKPRepository.SaveChangesAsync())
                    {
                        if (result.Succeeded)
                        {
                            return Ok(new Response { Status = "Success", Message = "User Customer Removed Successfully!" });
                        }
                    }     
                }                
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok("Customer USer Removed From Database.");
        }

        [HttpPut]
        [Route("UpdateCustomerUserProfile/{customer_ID}")]
        public async Task<IActionResult> UpdateCustomerUserProfileAsync(Guid customer_ID, Customer customer)
        {
            try
            {
                var existingCustomerUser = await _IPKPRepository.GetCustomerDetailsAsync(customer_ID);
                var user = await _userManager.FindByNameAsync(existingCustomerUser.Username);

                if (existingCustomerUser == null) 
                { 
                    return NotFound("Could Not Find Customer" + customer_ID); 
                }
                else
                {
                    existingCustomerUser.FirstName = customer.FirstName;
                    existingCustomerUser.Surname = customer.Surname;
                    existingCustomerUser.Cell_Number = customer.Cell_Number;
                    existingCustomerUser.Email = customer.Email;
                    existingCustomerUser.Username = customer.Username;
                    var usernamereuslt = await _userManager.SetUserNameAsync(user, customer.Username);
                    var emailresult = await _userManager.SetEmailAsync(user, customer.Email);

                    if (await _IPKPRepository.SaveChangesAsync())
                    {
                        if (usernamereuslt.Succeeded && emailresult.Succeeded)
                        {
                            return Ok(new Response { Status = "Success", Message = "Customer details Updated Successfully!" });
                        }
                    }
                }
                
            }
            catch (Exception)
            {
                return BadRequest("Invalid Transaction");
            }
            return Ok("Customer User Saved To Database.");
        }

        //*************** Employees ***************\\
        [HttpGet]
        [Route("GetAllEmployees")]
        public async Task<IActionResult> GetAllEmployees()
        {
            try
            {
                var results = await _IPKPRepository.GetAllEmployeesAsync();

                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        [HttpGet]
        [Route("GetEmployee/{employee_ID}")]
        public async Task<IActionResult> GetEmployee(Guid employee_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetEmployeeDetailsAsync(employee_ID);
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        [HttpPut]
        [Route("UpdateEmployee/{employee_ID}")]
        public async Task<IActionResult> UpdateEmployeeAsync(Guid employee_ID, Employee employee)
        {
            try
            {
                var existingEmployee = await _IPKPRepository.GetEmployeeDetailsAsync(employee_ID);
                var user = await _userManager.FindByNameAsync(existingEmployee.Username);

                if (existingEmployee == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Employee" + employee_ID });
                }
                else
                {

                    existingEmployee.User = employee.User;
                    existingEmployee.FirstName = employee.FirstName;
                    existingEmployee.Surname = employee.Surname;
                    existingEmployee.Cell_Number = employee.Cell_Number;
                    existingEmployee.Email = employee.Email;
                    existingEmployee.Username = employee.Username;
                    var usernamereuslt = await _userManager.SetUserNameAsync(user, employee.Username);
                    var emailresult = await _userManager.SetEmailAsync(user, employee.Email);
                    if (await _IPKPRepository.SaveChangesAsync())                   
                    { 
                        if (usernamereuslt.Succeeded && emailresult.Succeeded)
                        {
                            return Ok(new Response { Status = "Success", Message = "Admin details Updated Successfully!" });
                        }
                    }                            
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Employee Saved To Database." });
        }

        [HttpDelete]
        [Route("DeleteEmployee/{employee_ID}")]
        public async Task<IActionResult> DeleteEmployee(Guid Employee_ID)
        {
            try
            {
                var existingEmployee = await _IPKPRepository.GetEmployeeDetailsAsync(Employee_ID);
                var user = await _userManager.FindByNameAsync(existingEmployee.Username);

                if (existingEmployee == null)
                { 
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Employee" + Employee_ID }); 
                }
                else
                {
                    _IPKPRepository.Delete(existingEmployee);
                    var result = await _userManager.DeleteAsync(user);

                    if (await _IPKPRepository.SaveChangesAsync())
                    {
                        if (result.Succeeded)
                        {
                            return Ok(new Response { Status = "Success", Message = "User Password Updated Successfully!" });
                        }
                    }
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Employee Removed From Database." });
        }
    }
}


    