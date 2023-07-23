﻿using IPKP___API.Controllers.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using IPKP___API.Controllers.Models.Entities;
using System.Collections.Generic;
using System.Linq;

namespace IPKP___API.Controllers
{
    //1. Get current Stock Total
    //2. Get all old stock takes, get specific stock take
    //3. Get new stock amounts, add new stock take, update inventory
    //4. Update for foreign keys
    //5. 
    [Route("api/[controller]")]
    [ApiController]
    public class StockTakeController : ControllerBase
    {
        private readonly IIPKPRepository _IPKPRepository;
        public StockTakeController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

         
        [HttpGet]
        [Route("GetInventoryById")]
        public async Task<IActionResult> GetInventoryByIDAsync(Guid id)
        {
            try
            {
                var results = await _IPKPRepository.GetAllStockItemsAsync();
                
                List<Stock_Item> dbInventory = results.ToList();
                List<Inventory> InventoryList = new List<Inventory>();

                foreach (var c in dbInventory)
                {
                    Inventory oInventory = new Inventory();

                    if (id == c.Stock_Item_ID)
                    {
                        oInventory.Inventory_ID = c.Stock_Item_ID;
                        InventoryList.Add(oInventory);
                    }
                    else
                    {
                        return StatusCode(StatusCodes.Status404NotFound , "No stock items in inventory");
                    }
                }
                return Ok(InventoryList);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        //enter current quanities

        //compare to system quantities 


    }
}