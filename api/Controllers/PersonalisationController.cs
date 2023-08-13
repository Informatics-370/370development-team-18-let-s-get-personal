using IPKP___API.Controllers.Models.Entities;
using IPKP___API.Controllers.Models.Repository;
using IPKP___API.Controllers.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;

namespace IPKP___API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PersonalisationController : ControllerBase
  {
        // image upload, adding to design line item, adding image 
        // image amd text price management, design image and design text
        private readonly IIPKPRepository _IPKPRepository;
        public PersonalisationController(IIPKPRepository iPKPRepository)
        {
          _IPKPRepository = iPKPRepository;
        }
        [HttpGet]
        [Route("GetPersonalisation/{personalisation_ID}")]
        public async Task<IActionResult> GetPersonalisationAsync(Guid personalisation_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetPersonalisationAsync(personalisation_ID);
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Personalisation Design" + personalisation_ID });

                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        //upload design image 
        [HttpPost]
        [Route("UploadDesignImage")]
        public async Task<IActionResult> UploadDesignImageAsync([FromForm] IFormCollection formData)
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

                        var newdesignimage = new Design_Image
                        {
                            Design_Image_ID = new Guid(),
                            Image_File = base64,
                        };
                        _IPKPRepository.Add(newdesignimage);
                        await _IPKPRepository.SaveChangesAsync();
                        return Ok(newdesignimage);
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
            //return Ok(new Response { Status = "Success", Message = "Text Price Added To Database."  });
        }

        //add image to design line item
        [HttpPost]
        [Route("AddToDesignImageLineItem")]
        public async Task<IActionResult> AddToDesignImageAync(Design_Image_Line_Item designimagelineitem)
        {
            try
            {
                var newdesignimagelineitem = new Design_Image_Line_Item
                {
                    Design_Image_Line_Item_ID = new Guid(),
                    Design_Image_ID = designimagelineitem.Design_Image_ID,
                    Image_Price_ID = designimagelineitem.Image_Price_ID,
                };
                _IPKPRepository.Add(newdesignimagelineitem);
                await _IPKPRepository.SaveChangesAsync();
                return Ok(newdesignimagelineitem);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            //return Ok(new Response { Status = "Success", Message = "Text Price Added To Database." });
        }

        //add text 
        [HttpPost]
        [Route("UploadDesignText")]
        public async Task<IActionResult> UploadDesignTextAsync(Design_Text designtext)
        {
            try
            {
                var newdesigntext = new Design_Text
                {
                    Design_Text_ID = new Guid(),
                    Text_Price_ID = designtext.Text_Price_ID,
                    Design_Text_Description = designtext.Design_Text_Description,
                };
                _IPKPRepository.Add(newdesigntext);
                await _IPKPRepository.SaveChangesAsync();
                return Ok(newdesigntext);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            //return Ok( new Response { Status = "Success", Message = "Text Price Added To Database." });
        }

        // add personalisation 
        [HttpPost]
        [Route("AddPersonalisation")]
        public async Task<IActionResult> AddPersonalisationAsync(PersonalisationDesignViewModel personalisation)
        {           
            try
            {
                var personalisationDesign = new Personalisation_Design
                {
                    Personalisation_Design_ID = new Guid(),
                    Personalisation_Design_Price = personalisation.Personalisation_Design_Price,
                    Stock_Item_ID = personalisation.Stock_Item_ID,
                    Design_Text_ID = personalisation.Design_Text_ID,
                    Design_Image_Line_Item_ID = personalisation.Design_Image_Line_Item_ID,
                };
                _IPKPRepository.Add(personalisationDesign);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }

            return Ok(new Response { Status = "Success", Message = "Personalisation Design Added To Database." });
        }

        //Delete personalisation
        [HttpDelete]
        [Route("DeletePersonalisation/{personalisation_ID}")]
        public async Task<IActionResult> DeletePersonalisationAsync(Guid personalisation_ID)
        {
            try
            {
                var existingPersonalisationDesign = await _IPKPRepository.GetPersonalisationAsync(personalisation_ID);

                //if (existingPersonalisationDesign == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Personalisation Design" + personalisation_ID });

                _IPKPRepository.Delete(existingPersonalisationDesign);

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(new Response { Status = "Success", Message = "Personalisation Design Removed Successfully" });
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Stock Item Removed From Database." });
        }
        //************************** Text and Image Prices ****************************\\
        //get all text prices
        [HttpGet]
        [Route("GetAllTextPrices")]
        public async Task<IActionResult> GetAllTextPrices()
        {
            try
            {
                var results = await _IPKPRepository.GetAllTextPrices();
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find any Text Prices" });
                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        //add text price
        [HttpPost]
        [Route("AddTextPrice")]
        public async Task<IActionResult> AddTextPriceAsync(Text_Price textprice)
        {
            try
            {
                var newtextprice = new Text_Price
                {
                    Text_Price_ID = new Guid(),
                    Text_Price_Amount = textprice.Text_Price_Amount
                };
                _IPKPRepository.Add(newtextprice);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Text Price Added To Database." });
        }

        //get text price
        [HttpGet]
        [Route("GetTextPrice/{image_Price_ID}")]
        public async Task<IActionResult> GetTextPrice(Guid text_Price_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetTextPriceByID(text_Price_ID);
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find any Text Prices" });
                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        //update text price
        [HttpPut]
        [Route("UpdateTextPrice/{text_Price_ID}")]
        public async Task<ActionResult<Text_Price>> UpdateStockTypeAsync(Guid text_Price_ID, Text_Price textprice)
        {
            try
            {
                var existingTextPrice = await _IPKPRepository.GetTextPriceByID(text_Price_ID);

                if (existingTextPrice == null) 
                {
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Text Price" + text_Price_ID });

                }
                else
                {
                    existingTextPrice.Text_Price_Amount = textprice.Text_Price_Amount;

                    if (await _IPKPRepository.SaveChangesAsync())
                    {
                        return Ok(new Response { Status = "Success", Message = "Text Price Updated Successfully" });
                    }
                }
                
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Text Price Saved To Database." });
        }

        //get all image prices
        [HttpGet]
        [Route("GetAllImagePrices")]
        public async Task<IActionResult> GetAllImagePrices()
        {
            try
            {
                var results = await _IPKPRepository.GetAllImagePrices();
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find any Text Prices" });
                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        //add image price 
        [HttpPost]
        [Route("AddImagePrice")]
        public async Task<IActionResult> AddImagePriceAsync(Image_Price imageprice)
        {
            try
            {
                var newimageprice = new Image_Price
                {
                    Image_Price_ID = new Guid(),
                    Image_Price_Amount = imageprice.Image_Price_Amount,
                };
                _IPKPRepository.Add(newimageprice);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Image Price Added To Database." });
        }

        //get image price
        [HttpGet]
        [Route("GetImagePrice/{image_Price_ID}")]
        public async Task<IActionResult> GetImagePrice(Guid image_Price_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetImagePriceByID(image_Price_ID);
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find any Text Prices" });
                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        //update image price
        [HttpPut]
        [Route("UpdateImagePrice/{image_Price_ID}")]
        public async Task<ActionResult<Image_Price>> UpdateImagePriceAsync(Guid image_Price_ID, Image_Price imageprice)
        {
            try
            {
                var existingImagePrice = await _IPKPRepository.GetImagePriceByID(image_Price_ID);

                if (existingImagePrice == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Image Price" + image_Price_ID });

                }
                else
                {
                    existingImagePrice.Image_Price_Amount = imageprice.Image_Price_Amount;

                    if (await _IPKPRepository.SaveChangesAsync())
                    {
                        return Ok(new Response { Status = "Success", Message = "Image Price Updated Successfully" });
                    }
                }

            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Image Price Saved To Database." });
        }

    }
}


//[HttpPut]
//[Route("UpdatePersonalisation/{personalisation_ID}")]
//public async Task<IActionResult> UpdatePersonalisationAsync(Guid personalisation_ID, PersonalisationDesignViewModel pdvm)
//{
//    try
//    {
//        var existingPersonalisationDesign = await _IPKPRepository.GetPersonalisationAsync(personalisation_ID);

//        if (existingPersonalisationDesign == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Personalisation Design" + personalisation_ID });

//        //existingPersonalisationDesign.ItemColour = pdvm.ItemColour;
//        //existingPersonalisationDesign.DesignText = pdvm.DesignText;
//        //existingPersonalisationDesign.TextPosition = pdvm.TextPosition;
//        //existingPersonalisationDesign.TextColour = pdvm.TextColour;

//        if (await _IPKPRepository.SaveChangesAsync())
//        {
//          return Ok(new Response { Status = "Success", Message = "Personalisation Design Updated Successfully" });
//        }
//    }
//    catch (Exception)
//    {
//        return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
//    }
//    return Ok(new Response { Status = "Success", Message = "Personalisation Design Saved To Database." });
//}


