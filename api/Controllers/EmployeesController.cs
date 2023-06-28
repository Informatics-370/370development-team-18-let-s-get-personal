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
        [Route("GetEmployee")]
        public async Task<IActionResult> GetEmployee(Guid Employee_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetCustomerDetailsAsync(Employee_ID);
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
                Title = employee.Title,
                Gender = employee.Gender,
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
                return BadRequest("Invalid Transaction");
            }
            return Ok("Employee Added To Database.");
        }

        [HttpPut]
        [Route("UpdateEmployee")]
        public async Task<IActionResult> UpdateEmployeeAsync(Guid Employee_ID, Employee employee)
        {
            try
            {
                var existingEmployee = await _IPKPRepository.GetEmployeeDetailsAsync(Employee_ID);

                if (existingEmployee == null) return NotFound("Could Not Find Employee" + Employee_ID);

                existingEmployee.Title = employee.Title;
                existingEmployee.Gender = employee.Gender;
                existingEmployee.Address = employee.Address;
                existingEmployee.User  = employee.User;
                existingEmployee.FirstName = employee.FirstName;
                existingEmployee.Surname = employee.Surname;
                existingEmployee.Cell_Number = employee.Cell_Number;
                existingEmployee.Email = employee.Email;

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok("Employee Updated Successfully");
                }
            }
            catch (Exception)
            {
                return BadRequest("Invalid Transaction");
            }
            return Ok("Employee Saved To Database.");
        }

        [HttpDelete]
        [Route("DeleteEmployee")]
        public async Task<IActionResult> DeleteEmployee(Guid Employee_ID)
        {
            try
            {
                var existingEmployee = await _IPKPRepository.GetPolicyAsync(Employee_ID);

                if (existingEmployee == null) return NotFound("Could Not Find Employee" + Employee_ID);

                _IPKPRepository.Delete(existingEmployee);

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok("Employee Removed Successfully");
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
            return Ok("Employee Removed From Database.");
        }
    }
}
