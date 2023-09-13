﻿using IPKP___API.Controllers.Models.Repository;
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
    public class ExperienceRatingController : ControllerBase
    {
        //AppDbContext _CoreDbContext = new AppDbContext();
        //METHODS: exp rating crud
        private readonly IIPKPRepository _IPKPRepository;
        public ExperienceRatingController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

        //get all
        [HttpGet]
        [Route("GetAllExperienceRatings")]
        public object GetAllExperienceRatings()
        {
            try
            {
                var results = _IPKPRepository.GetAllExperienceRatings();
                if (results == null)
                {
                    return NotFound(new Response { Status = "Success", Message = "No Experience Ratings were found." });
                }
                else
                {
                    return Ok(results);
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpGet]
        [Route("GetExperienceRatingByCustomerID/{customer_ID}")]
        public object GetExperienceRatingByCustomerID(Guid customer_ID)
        {
            try
            {
                var results = _IPKPRepository.GetExperienceRatingByCustomerIDAsync(customer_ID);

                if (results == null)
                {
                    return NotFound(new Response { Status = "Success", Message = "No Experience Ratings  were found." });
                }
                else
                {
                    return Ok(results);
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        //get one
        [HttpGet]
        [Route("GetExperienceRating/{experience_Rating_ID}")]
        public async Task<IActionResult> GetExperienceRating(Guid experience_Rating_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetExperienceRatingAsync(experience_Rating_ID);
                
                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        //edit
        [HttpPut]
        [Route("UpdateExperienceRating/{experience_Rating_ID}")]
        public async Task<IActionResult> UpdateExperienceRating(Guid experience_Rating_ID, Experience_Rating exRating)
        {
            try
            {
                var existingRating = await _IPKPRepository.GetExperienceRatingAsync(experience_Rating_ID);

                if (existingRating == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Rating" + experience_Rating_ID });
                }
                else
                {
                     existingRating.Customer_ID = exRating.Customer_ID;
                    //existingRating.Customer.Customer_ID = exRating.Customer.Customer_ID;
                    existingRating.Experience_Star_Rating = exRating.Experience_Star_Rating;
                    existingRating.Experience_Rating_ID = exRating.Experience_Rating_ID;
                    existingRating.Experience_Rating_Comments = exRating.Experience_Rating_Comments;

                    if (await _IPKPRepository.SaveChangesAsync())
                    {
                        return Ok(new Response { Status = "Success", Message = "Rating Updated Successfully" });
                    }
                }                      
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Rating Saved To Database." });
        }

        //add
        [HttpPost]
        [Route("AddExperienceRating")]
        public async Task<IActionResult> AddExperienceRating(Experience_Rating exRating)
        {
            try
            {
               //var results = await _IPKPRepository.GetCustomerDetailsAsync(new Guid(exRating.Customer_ID));
                var newRating = new Experience_Rating
                {
                    Experience_Rating_ID = new Guid(),
                    Experience_Star_Rating = exRating.Experience_Star_Rating,
                    Customer_ID = exRating.Customer_ID,
                    Experience_Rating_Comments = exRating.Experience_Rating_Comments
                };
                _IPKPRepository.Add(newRating);

                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = " Experience Rating Added To Database." });
        }

        //delete
        [HttpDelete]
        [Route("DeleteExeperienceRating/{experience_Rating_ID}")]
        public async Task<IActionResult> DeleteExeperienceRating(Guid experience_Rating_ID)
        {
            try
            {
                var existingRating = await _IPKPRepository.GetExperienceRatingAsync(experience_Rating_ID);

                if (existingRating == null) 
                { 
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Rating" + experience_Rating_ID });
                }
                else
                {
                    _IPKPRepository.Delete(existingRating);

                    if (await _IPKPRepository.SaveChangesAsync())
                    {
                        return Ok(new Response { Status = "Success", Message = "Rating Removed Successfully" });
                    }
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Rating Removed From Database." });
        }
    }
}
