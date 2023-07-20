using IPKP___API.Controllers.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using IPKP___API.Controllers.Models.Entities;
using System.Collections.Generic;
using System.Linq;

namespace IPKP___API.Controllers
{
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
                        //oInventory.QuantityOnHand = c.QuantityOnHand;
                        //oInventory.LastUpdated = c.LastUpdated;

                        InventoryList.Add(oInventory);
                    }
                    else
                    {

                    }
                }
                return Ok(InventoryList);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }
    }
}
