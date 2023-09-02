﻿using IPKP___API.Controllers.Models.Repository;
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
       //METHODS: GetallInventory, AddToLineItem, AddToInventory write off, stock take

        private readonly IIPKPRepository _IPKPRepository;
        public InventoryController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

        //*************** Stock Take ***************\\
        //update quantity
        [HttpPut]
        [Route("Stocktake/{stock_Item_ID}")]
        public async Task<IActionResult> UpdateStockItemAsync(Guid stock_Item_ID, StockItemViewModel sivm)
        {
            try
            {
                var stocktakeitem = await _IPKPRepository.GetStockItemDetailsAsync(stock_Item_ID);

                if (stocktakeitem == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Stock Item" + stock_Item_ID });
                }
                else
                {
                    stocktakeitem.Stock_Item_Quantity = sivm.Stock_Item_Quantity;

                    if (await _IPKPRepository.SaveChangesAsync())
                    {
                        return Ok(new Response { Status = "Success", Message = "Stock Item Updated Successfully" });
                    }
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Stock Item Saved To Database." });
        }

        //*************** Write off ***************\\       

        //1. Add to write off table
        [HttpPost]
        [Route("AddToWriteoff")]
        public async Task<IActionResult> AddToWriteoff(Write_Off wo) //[FromForm] IFormCollection formData
        {
            try
            {
                var writeoff = new Write_Off
                {
                    Write_Off_ID = new Guid(),
                    Write_Off_Date = DateTime.Now,
                };
                _IPKPRepository.Add(writeoff);
                await _IPKPRepository.SaveChangesAsync();
                return Ok(writeoff);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            //return Ok(new Response { Status = "Success", Message = "Stock Item Added To Database." });
        }

        //2. Add to write off table 
        [HttpPost]
        [Route("AddToWriteoffLine")]
        public async Task<IActionResult> AddToWriteoffLine(Write_Off_Line_Item wo) //[FromForm] IFormCollection formData
        {
            try
            {
                var writeoff = new Write_Off_Line_Item
                {
                    Write_Off_Line_Item_ID = new Guid(),
                    Stock_Item_ID = wo.Stock_Item_ID,
                    Write_Off_ID = wo.Write_Off_ID,
                    Write_Off_Reason = wo.Write_Off_Reason,
                    Write_Off_Quantity = wo.Write_Off_Quantity,

                };
                _IPKPRepository.Add(writeoff);
                await _IPKPRepository.SaveChangesAsync();

            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Stock Item Added To Database." });
        }

        //Get Written Off Items

        [HttpGet]
        [Route("GetWriteOffs")]
        public object GetWriteOffs()
        {
            try
            {
                var writeoffs = _IPKPRepository.GetWrittenOffItems();

                if (writeoffs == null)
                {
                    return NotFound(new Response { Status = "Success", Message = "No Stock Items were found." });
                }
                else
                {
                    return Ok(writeoffs);
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }



    }
}
