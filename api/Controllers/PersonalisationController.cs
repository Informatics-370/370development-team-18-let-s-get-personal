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
  public class PersonalisationController : ControllerBase
  {
        // image upload, adding to design line item, adding image 
        // image amd text price management, design image and design text
        private readonly IIPKPRepository _IPKPRepository;
        public PersonalisationController(IIPKPRepository iPKPRepository)
        {
          _IPKPRepository = iPKPRepository;
        }

        //upload design image 
        [HttpPost]
        [Route("UploadDesignImage")]
        public async Task<IActionResult> UploadDesignImageAsync(Design_Image di)
        {
            try
            {
                var designimage = new Design_Image
                {
                    Design_Image_ID = new Guid(),
                    Image_File = di.Image_File,
                };
                _IPKPRepository.Add(designimage);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Text Price Added To Database." });
        }

        //add image to design line item
        [HttpPost]
        [Route("AddToDesignImage")]
        public async Task<IActionResult> AddToDesignImageAync(Design_Image_Line_Item dilt)
        {
            try
            {
                var designimagelineitem = new Design_Image_Line_Item
                {
                    Design_Image_Line_Item_ID = new Guid(),
                    Design_Image_ID = dilt.Design_Image_ID,
                    Image_Price_ID = dilt.Image_Price_ID,
                };
                _IPKPRepository.Add(designimagelineitem);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Text Price Added To Database." });
        }

        //add text 
        [HttpPost]
        [Route("UploadDesignText")]
        public async Task<IActionResult> UploadDesignTextAsync(Design_Text dt)
        {
            try
            {
                var designtext = new Design_Text
                {
                    Design_Text_ID = new Guid(),
                    Text_Price_ID = dt.Text_Price_ID,
                    Design_Text_Description = dt.Design_Text_Description,
                };
                _IPKPRepository.Add(designtext);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Text Price Added To Database." });
        }

        // add personalisation 

        [HttpPost]
        [Route("AddPersonalisation")]
        public async Task<IActionResult> AddPersonalisationAsync(PersonalisationDesignViewModel pdvm)
        {           
            try
            {
                var personalisationDesign = new Personalisation_Design
                {
                    Personalisation_Design_ID = new Guid(),
                    Personalisation_Design_Price = pdvm.Personalisation_Design_Price,
                    Stock_Item_ID = pdvm.Stock_Item_ID,
                    Design_Text_ID = pdvm.Design_Text_ID,
                    Design_Image_Line_Item_ID = pdvm.Design_Image_Line_Item_ID,
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

        //[HttpGet]
        //[Route("GetPersonalisation/{personalisation_ID}")]
        //public async Task<IActionResult> GetPersonalisationAsync(Guid personalisation_ID)
        //{
        //    try
        //    {
        //        var results = await _IPKPRepository.GetPersonalisationAsync(personalisation_ID);
        //        if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Personalisation Design" + personalisation_ID });

        //        return Ok(results);
        //    }
        //    catch (Exception)
        //    {
        //        return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
        //    }
        //}

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

        //[HttpDelete]
        //[Route("DeletePersonalisation/{personalisation_ID}")]
        //public async Task<IActionResult> DeletePersonalisationAsync(Guid personalisation_ID)
        //{
        //    try
        //    {
        //        var existingPersonalisationDesign = await _IPKPRepository.GetPersonalisationAsync(personalisation_ID);

        //        //if (existingPersonalisationDesign == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Personalisation Design" + personalisation_ID });

        //        _IPKPRepository.Delete(existingPersonalisationDesign);

        //        if (await _IPKPRepository.SaveChangesAsync())
        //        {
        //          return Ok(new Response { Status = "Success", Message = "Personalisation Design Removed Successfully" });
        //        }
        //    }
        //    catch (Exception)
        //    {
        //        return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
        //    }
        //    return Ok(new Response { Status = "Success", Message = "Stock Item Removed From Database." });
        //}

        //add text price
        [HttpPost]
        [Route("AddTextPrice")]
        public async Task<IActionResult> AddTextPriceAsync(Text_Price tp)
        {
            try
            {
                var textprice = new Text_Price
                {
                    Text_Price_ID = new Guid(),
                    Text_Price_Amount = tp.Text_Price_Amount
                };
                _IPKPRepository.Add(textprice);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Text Price Added To Database." });
        }

        //update text price
        [HttpPut]
        [Route("UpdateTextPrice/{text_Price_ID}")]
        public async Task<IActionResult> UpdateStockTypeAsync(Guid text_Price_ID, Text_Price tp)
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
                    existingTextPrice.Text_Price_Amount = tp.Text_Price_Amount;

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

        //add image price 
        [HttpPost]
        [Route("AddImagePrice")]
        public async Task<IActionResult> AddImagePriceAsync(Image_Price ip)
        {
            try
            {
                var imageprice = new Image_Price
                {
                    Image_Price_ID = new Guid(),
                    Image_Price_Amount = ip.Image_Price_Amount,
                };
                _IPKPRepository.Add(imageprice);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Image Price Added To Database." });
        }

        //update image price
        [HttpPut]
        [Route("UpdateImagePrice/{image_Price_ID}")]
        public async Task<IActionResult> UpdateImagePriceAsync(Guid image_Price_ID, Image_Price ip)
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
                    existingImagePrice.Image_Price_Amount = ip.Image_Price_Amount;

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
