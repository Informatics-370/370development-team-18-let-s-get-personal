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
  public class StockItemController : ControllerBase
  {
    private readonly IIPKPRepository _IPKPRepository;
    public StockItemController(IIPKPRepository iPKPRepository)
    {
      _IPKPRepository = iPKPRepository;
    }
    [HttpGet]
    [Route("GetAllStockItems")]

    public async Task<IActionResult> GetAllStockItemsAsync()
    {
      try
      {
        var results = await _IPKPRepository.GetAllStockItemsAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }
    }

    [HttpPost]
    [Route("AddStockItem")]
    public async Task<IActionResult> AddStockItemAsync(StockItemViewModel sivm)
    {
      var stockItem = new Stock_Item
      {
        Stock_Item_ID = sivm.Stock_Item_ID,
        Stock_Item_Name = sivm.Stock_Item_Name,
        Stock_Type_Name = sivm.Stock_Type_Name,
        Stock_Image = sivm.Stock_Image_ID,
        Stock_Item_Colour = sivm.Stock_Item_Colour
      };
      try
      {
        _IPKPRepository.Add(stockItem);
        await _IPKPRepository.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("Invalid Transaction");
      }
      return Ok("Stock Item Added To Database.");
    }

    [HttpPut]
    [Route("UpdateStockItem")]
    public async Task<IActionResult> UpdateStockItemAsync(Guid stock_Item_ID, StockItemViewModel sivm)
    {
      try
      {
        var existingStockItem = await _IPKPRepository.GetStockItemDetailsAsync(stock_Item_ID);

        if (existingStockItem == null) return NotFound("Could Not Find Stock Item" + stock_Item_ID);

        existingStockItem.Stock_Item_Name = sivm.Stock_Item_Name;
        existingStockItem.Stock_Type_Name = sivm.Stock_Type_Name;
        existingStockItem.Stock_Image = sivm.Stock_Image_ID;
        existingStockItem.Stock_Item_Colour = sivm.Stock_Item_Colour;

        if (await _IPKPRepository.SaveChangesAsync())
        {
          return Ok("Stock Item Updated Successfully");
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid Transaction");
      }
      return Ok("Stock Item Saved To Database.");
    }

    [HttpDelete]
    [Route("DeleteStockItem")]
    public async Task<IActionResult> DeleteStockItemAsync(Guid stock_Item_ID)
    {
      try
      {
        var existingStockItem = await _IPKPRepository.GetStockItemDetailsAsync(stock_Item_ID);

        if (existingStockItem == null) return NotFound("Could Not Find Stock Item" + stock_Item_ID);

        _IPKPRepository.Delete(existingStockItem);

        if (await _IPKPRepository.SaveChangesAsync())
        {
          return Ok("Stock Item Removed Successfully");
        }
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }
      return Ok("Stock Item Removed From Database.");
    }
  }
}
