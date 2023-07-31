using IPKP___API.Controllers.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using IPKP___API.Controllers.Models.ViewModels;
using System.Linq;
using System.IO;
using IPKP___API.Controllers.Models.Entities;

namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
       

        private readonly IIPKPRepository _IPKPRepository;
        public InventoryController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

        [HttpGet]
        [Route("GetAllProducts")]
        public async Task<IActionResult> GetAllProductsAsync()
        {
            try
            {
                var results = await _IPKPRepository.GetAllInventoryAsync();

                dynamic products = results.Select(p => new
                {
                    //p.Inventory_ID,
                    //p.QuantityOnHand,
                    //StockItemName = p.Stock_Item.Stock_Item_Name,
                    //StockTypeName = p.Stock_Type.Stock_Type_Name,
                });
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        //[HttpPost, DisableRequestSizeLimit]
        //[Route("AddProduct")]
        //public async Task<IActionResult> AddProduct([FromForm] IFormCollection formData)
        //{
        //    try
        //    {
        //        var formCollection = await Request.ReadFormAsync();

        //        var file = formCollection.Files.First();

        //        if (file.Length > 0)
        //        {

        //            using (var ms = new MemoryStream())
        //            {
        //                file.CopyTo(ms);
        //                var fileBytes = ms.ToArray();
        //                string base64 = Convert.ToBase64String(fileBytes);

        //                string price = formData["price"];
        //                decimal num = decimal.Parse(price.Replace(".", ","));

        //                var product = new Inventory
        //                {
        //                    Price = num
        //                    ,
        //                    Stock_Item_Name = formData["name"]
        //                    ,
        //                    Description = formData["description"]
        //                    ,
        //                    Stock_Item_ID = formData["brand"]
        //                    ,
        //                    ProductTypeId = Convert.ToInt32(formData["producttype"])
        //                    ,
        //                    Image = base64
        //                    ,
        //                    DateCreated = DateTime.Now
        //                };


        //                _IPKPRepository.Add(product);
        //                await _IPKPRepository.SaveChangesAsync();
        //            }

        //            return Ok();
        //        }
        //        else
        //        {
        //            return BadRequest();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal server error: {ex}");
        //    }
        //}



    }
}
