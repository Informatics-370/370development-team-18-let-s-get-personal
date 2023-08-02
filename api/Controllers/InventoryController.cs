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

                //dynamic products = results.Select(p => new
                //{
                //    p.Inventory_Line_Item_ID,
                //    p.Inventory_Line_Quantity,                    
                //    p.Stock_Item_ID,
                //    p.Inventory_ID,
                    
                //    //p.Stock_Item.Stock_Type_ID,
                //    //StockItemName = p.Stock_Item.Stock_Item_Name.Where(p.Stock_Item.Stock_Item_Name == ),
                //    //p.Stock_Item.Stock_Item_Colour.Stock_Item_Colour_Name,
                //    //p.Stock_Item.Stock_Price_History,
                //    //p.Stock_Item.Stock_Image.Stock_Image_File,
                //    //p.Stock_Item.Stock_Item_Size,
                //    //p.Inventory.Inventory_Date,
                //    //p.Inventory.Inventory_Comments,
                //});
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        [HttpPost]
        [Route("AddToInventoryLineItem")]
        public async Task<ActionResult> AddToInventoryLineItem(Inventory_Line_Item ivm)
        {
            var product = new Inventory_Line_Item
            {
                Stock_Item_ID = ivm.Stock_Item_ID,
                Inventory_ID = ivm.Inventory_ID,
                //Stock_Item = ivm.Stock_Item,

            };
            try
            {
                _IPKPRepository.Add(product);
                await _IPKPRepository.SaveChangesAsync();                
            }

            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Stock Item Added To Database." });
        }

        [HttpPost]
        [Route("AddToInventory")]
        public async Task<ActionResult> AddToInventory(Inventory ivm)
        {
            var product = new Inventory
            {
                Inventory_ID = new Guid(),
                Inventory_Date = new DateTime(),
                Inventory_Comments= ivm.Inventory_Comments,
            };
            try
            {
                _IPKPRepository.Add(product);
                await _IPKPRepository.SaveChangesAsync();
            }

            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Stock Item Added To Database." });
        }


     

    }
}
