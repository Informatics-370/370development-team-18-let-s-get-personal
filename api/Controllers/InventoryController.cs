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
       //METHODS: Inevntory, write off, stock take

        private readonly IIPKPRepository _IPKPRepository;
        public InventoryController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

        //*************** Inventory ***************\\
        [HttpGet]
        [Route("GetAllProducts")]
        public async Task<IActionResult> GetAllProductsAsync()
        {
            try
            {
                var results = await _IPKPRepository.GetAllInventoryAsync();

                dynamic products = results.Select(p => new
                {
                    p.Inventory_Line_Item_ID,
                    p.Inventory_Line_Quantity,
                    p.Stock_Item_ID,
                    p.Inventory_ID,

                    //p.Stock_Item.StockTypeID,
                    //StockItemName = p.Stock_Item.Stock_Item_Name.Where(p.Stock_Item.Stock_Item_Name == ),
                    p.Stock_Item.Stock_Item_Colour.Stock_Item_Colour_Name,
                    p.Stock_Item.Stock_Price_History,
                    p.Stock_Item.Stock_Image.Stock_Image_File,
                    p.Stock_Item.Stock_Item_Size,
                    p.Inventory.Inventory_Date,
                    p.Inventory.Inventory_Comments,
                });
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

        //*************** Write off ***************\\


        //*************** Stock Take ***************\\
        //1. Get current Stock Total
        //2. Get all old stock takes, get specific stock take
        //3. Get new stock amounts, add new stock take, update inventory
        //4. Update for foreign keys
        //5. 
        [HttpGet]
        [Route("GetInventoryById/{inventory_Id}")]
        public async Task<IActionResult> GetInventoryByIDAsync(Guid inventory_Id)
        {
            try
            {
                var results = await _IPKPRepository.GetAllStockItemsAsync();

                List<Stock_Item> dbInventory = results.ToList();
                List<Inventory> InventoryList = new List<Inventory>();

                foreach (var c in dbInventory)
                {
                    Inventory oInventory = new Inventory();

                    if (inventory_Id == c.Stock_Item_ID)
                    {
                        oInventory.Inventory_ID = c.Stock_Item_ID;
                        InventoryList.Add(oInventory);
                    }
                    else
                    {
                        return NotFound(new Response { Status = "Error", Message = "No stock items in inventory" });
                    }
                }
                return Ok(InventoryList);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        //enter current quanities

        //compare to system quantities 


    }
}
