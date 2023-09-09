using IPKP___API.Controllers.Models.Repository;
using IPKP___API.Controllers.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using IPKP___API.Controllers.Models.Entities;
using System.Linq;
using System.IO;
using static System.Net.Mime.MediaTypeNames;

namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockImageController : ControllerBase
    {
        private readonly IIPKPRepository _IPKPRepository;
        public StockImageController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

        [HttpGet]
        [Route("GetAllStockImages")]
        public async Task<IActionResult> GetAllStockImages()
        {
            try
            {
                var results = await _IPKPRepository.GetAllStockItmagesAsync();
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Stock Images" });

                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpGet]
        [Route("GetStockImage/{stock_Image_ID}")]
        public async Task<IActionResult> GetStockImage (Guid stock_Image_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetStockImageByID(stock_Image_ID);
                if (results == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Stock Item Image" + stock_Image_ID });
                }

                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpPost]
        [Route("AddStockImage")]
        public async Task<IActionResult> AddStockImageAsync([FromForm] IFormCollection formData)
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                if (file.Length > 0)
                {
                    using (var ms = new MemoryStream())
                    {
                        file.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        string base64 = Convert.ToBase64String(fileBytes);

                        var image = new Stock_Image
                        {
                            Stock_Image_ID = new Guid(),
                            Stock_Image_File = base64,
                            Stock_Image_Name = formData["name"]
                        };

                        _IPKPRepository.Add(image);
                        await _IPKPRepository.SaveChangesAsync();
                        return Ok(image);
                    }
                    
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "No image found." });
                }

            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            //return Ok(new Response { Status = "Success", Message = "Stock Image Added To Database." });
        }

        [HttpPut]
        [Route("UpdateStockImage/{stock_Image_ID}")]
        public async Task<IActionResult> UpdateStockImageAsync(Guid stock_Image_ID, [FromForm] IFormCollection formData)
        {
            try
            {
                var existingStockImage = await _IPKPRepository.GetStockImageByID(stock_Image_ID);

                if (existingStockImage == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Stock Image" + stock_Image_ID });
                }
                else
                {
                    var formCollection = await Request.ReadFormAsync();
                    var file = formCollection.Files.First();
                    if (file.Length > 0)
                    {
                        using (var ms = new MemoryStream())
                        {
                            file.CopyTo(ms);
                            var fileBytes = ms.ToArray();
                            string base64 = Convert.ToBase64String(fileBytes);

                            existingStockImage.Stock_Image_File = base64;
                            existingStockImage.Stock_Image_File = formData["name"];
                        }                        
                    }
                    else
                    {
                        existingStockImage.Stock_Image_File = formData["name"];
                    }
                }
                
                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(new Response { Status = "Success", Message = "Stock Image Updated Successfully" });
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Stock Image Saved To Database." });
        }


        [HttpDelete]
        [Route("DeleteImage/{stock_Image_ID}")]
        public async Task<IActionResult> DeleteImageAsync(Guid stock_Image_ID)
        {
            try
            {
                var existingStockItemColour = await _IPKPRepository.GetStockImageByID(stock_Image_ID);

                if (existingStockItemColour == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Stock Image" + stock_Image_ID });

                }

                _IPKPRepository.Delete(existingStockItemColour);

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(new Response { Status = "Success", Message = "Stock Image Removed Successfully" });
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Stock Image Removed From Database." });
        }
    }
}
