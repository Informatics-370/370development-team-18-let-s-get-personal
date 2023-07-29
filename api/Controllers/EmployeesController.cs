using IPKP___API.Controllers.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using IPKP___API.Controllers.Models.Entities;
using IPKP___API.Controllers.Models.ViewModels;

namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IIPKPRepository _IPKPRepository;
        public EmployeesController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }
        
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
        public async Task<IActionResult> GetEmployee(int employee_ID)
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
                Employee_ID = new int(),
                Title = employee.Title,
                Address = employee.Address,
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
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Employee Added To Database." });
        }

        [HttpPut]
        [Route("UpdateEmployee/{employee_ID}")]
        public async Task<IActionResult> UpdateEmployeeAsync(int employee_ID, Employee employee)
        {
            try
            {
                var existingEmployee = await _IPKPRepository.GetEmployeeDetailsAsync(employee_ID);

                if (existingEmployee == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Employee" + employee_ID });

                existingEmployee.Title = employee.Title;
                existingEmployee.Address = employee.Address;
                existingEmployee.User  = employee.User;
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
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Employee Saved To Database." });
        }

        [HttpDelete]
        [Route("DeleteEmployee/{employee_ID}")]
        public async Task<IActionResult> DeleteEmployee(int Employee_ID)
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
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Employee Removed From Database." });
        }
    }
}
