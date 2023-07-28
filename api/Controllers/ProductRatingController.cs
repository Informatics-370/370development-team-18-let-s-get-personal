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
  public class ProductRatingController : ControllerBase
  {
        private readonly IIPKPRepository _IPKPRepository;
        public ProductRatingController(IIPKPRepository iPKPRepository)
        {
          _IPKPRepository = iPKPRepository;
        }

        [HttpGet]
        [Route("GetAllProductRatings")]

        public async Task<IActionResult> GetAllProductRatingsAsync()
        {
            try
            {
                var results = await _IPKPRepository.GetAllProductRatingsAsync();
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Product Rating"  });

                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpGet]
        [Route("GetProductRating/{product_Rating_ID}")]

        public async Task<IActionResult> GetProductRatingDetailsAsync(Guid product_Rating_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetProductRatingDetailsAsync(product_Rating_ID);
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Product Rating" + product_Rating_ID });

                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpPost]
        [Route("AddProductRating")]
        public async Task<IActionResult> AddProductRatingAsync(ProductRatingViewModel prvm)
        {
            var productRating = new Product_Rating
            {
                Product_Rating_ID = prvm.Product_Rating_ID,
                Customer = prvm.Customer_ID,
                //Stock_Item = prvm.St,
                Product_Star_Rating = prvm.Product_Star_Rating,
                Product_Rating_Comments = prvm.Product_Rating_Comments
            };
            try
            {
                _IPKPRepository.Add(productRating);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Product Rating Added To Database." });
        }

        [HttpPut]
        [Route("UpdateProductRating/{product_Rating_ID}")]
        public async Task<IActionResult> UpdateProductRatingAsync(Guid product_Rating_ID, ProductRatingViewModel prvm)
        {
            try
            {
              var existingProductRating = await _IPKPRepository.GetProductRatingDetailsAsync(product_Rating_ID);

              if (existingProductRating == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Product Rating" + product_Rating_ID });

              existingProductRating.Product_Star_Rating = prvm.Product_Star_Rating;
              existingProductRating.Product_Rating_Comments = prvm.Product_Rating_Comments;

                if (await _IPKPRepository.SaveChangesAsync())
                {
                  return Ok(new Response { Status = "Success", Message = "Product Rating Updated Successfully" });
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Product Rating Saved To Database." });
        }

        [HttpDelete]
        [Route("DeleteProductRating/{product_Rating_ID}")]
        public async Task<IActionResult> DeleteProductRatingAsync(Guid product_Rating_ID)
        {
            try
            {
                var existingProductRating = await _IPKPRepository.GetProductRatingDetailsAsync(product_Rating_ID);

                if (existingProductRating == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Product Rating" + product_Rating_ID });

                _IPKPRepository.Delete(existingProductRating);

                if (await _IPKPRepository.SaveChangesAsync())
                {
                  return Ok(new Response { Status = "Success", Message = "Product Rating Removed Successfully" });
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Product Rating Removed From Database." });
        }
      }
}
