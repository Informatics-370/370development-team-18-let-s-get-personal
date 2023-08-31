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

namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        //Users, employees and customers
        private readonly IIPKPRepository _IPKPRepository;
        public UserProfileController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
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

                if (existingAdmin == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Employee " + admin_ID });

                existingAdmin.User = admin.User;
                existingAdmin.FirstName = admin.FirstName;
                existingAdmin.Surname = admin.Surname;
                existingAdmin.Cell_Number = admin.Cell_Number;
                existingAdmin.Email = admin.Email;

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(new Response { Status = "Success", Message = "Employee Updated Successfully" });
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Employee Saved To Database." });
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
                var existingCustomerUser = await _IPKPRepository.GetCustomerDetailsAsync(customer_ID);

                if (existingCustomerUser == null) return NotFound("Could Not Find Customer User" + customer_ID);

                _IPKPRepository.Delete(existingCustomerUser);

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok("Customer User Removed Successfully");
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
            return Ok("Customer USer Removed From Database.");
        }

        [HttpPut]
        [Route("UpdateCustomerUserProfile/{customer_ID}")]
        public async Task<IActionResult> UpdateCustomerUserProfileAsync(Guid customer_ID, Customer upvm)
        {
            try
            {
                var existingCustomerUser = await _IPKPRepository.GetCustomerDetailsAsync(customer_ID);

                if (existingCustomerUser == null) return NotFound("Could Not Find Customer" + customer_ID);

                //existingCustomerUser.Title = upvm.Title;
                existingCustomerUser.FirstName = upvm.FirstName;
                existingCustomerUser.Surname = upvm.Surname;
                existingCustomerUser.Cell_Number = upvm.Cell_Number;
                existingCustomerUser.Email = upvm.Email;

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok("Customer User Updated Successfully");
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

                if (existingEmployee == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Employee" + employee_ID });

                existingEmployee.User = employee.User;
                existingEmployee.FirstName = employee.FirstName;
                existingEmployee.Surname = employee.Surname;
                existingEmployee.Cell_Number = employee.Cell_Number;
                existingEmployee.Email = employee.Email;

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(new Response { Status = "Success", Message = "Employee Updated Successfully" });
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

                if (existingEmployee == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Employee" + Employee_ID });

                _IPKPRepository.Delete(existingEmployee);

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(new Response { Status = "Success", Message = "Employee Removed Successfully" });
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


    