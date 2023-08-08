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
        //*************** Users ***************\\
        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            try
            {
                var results = await _IPKPRepository.GetAllUsersAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }
        [HttpDelete]
        [Route("DeleteUser")]
        public async Task<IActionResult> DeleteUserAsync(Guid user_ID)
        {
            try
            {
                var existingUser = await _IPKPRepository.GetUserDetailsAsync(user_ID);

                if (existingUser == null) return NotFound("Could Not Find User" + user_ID);

                _IPKPRepository.Delete(existingUser);

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok("User Removed Successfully");
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
            return Ok("User Removed From Database.");
        }

        //*************** Customers ***************\\
        [HttpGet]
        [Route("GetCustomerUserProfile")]
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
        [Route("DeleteCustomerUser")]
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


        [HttpPost]
        [Route("AddCustomerUserProfile")]
        public async Task<IActionResult> AddCustomerUserProfileAsync(UserProfileViewModel upvm)
        {

            var userCustomer = new Customer
            {
                Customer_ID = new Guid(),
                FirstName = upvm.FirstName,
                Surname = upvm.Surname,
                Cell_Number = upvm.Cell_Number,
                Email = upvm.Email
            };
            try
            {
                _IPKPRepository.Add(userCustomer);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest("Invalid Transaction");
            }
            return Ok("New Customer User Added To Database.");
        }

        [HttpPut]
        [Route("UpdateCustomerUserProfile")]
        public async Task<IActionResult> UpdateCustomerUserProfileAsync(Guid customer_ID, UserProfileViewModel upvm)
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
                var results = await _IPKPRepository.GetCustomerDetailsAsync(employee_ID);
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        [HttpPost]
        [Route("AddEmployee")]
        public async Task<IActionResult> AddEmployee(Employee employee)
        {
            var newemployee = new Employee
            {
                Employee_ID = new Guid(),
                User = employee.User,
                FirstName = employee.FirstName,
                Surname = employee.Surname,
                Cell_Number = employee.Cell_Number,
                Email = employee.Email
            };
            try
            {

                _IPKPRepository.Add(newemployee);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Employee Added To Database." });
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
                var existingEmployee = await _IPKPRepository.GetPolicyAsync(Employee_ID);

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


    