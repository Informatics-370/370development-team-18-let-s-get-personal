using IPKP___API.Controllers.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using IPKP___API.Controllers.Models.ViewModels;
using System.Linq;

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
                var results = await _IPKPRepository.GetAllStockItemsAsync();
                if (results == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Inventory" });
                }
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        //getting by stock type -- 

        //[HttpGet]
        //[Route("GetWaterbottles")]
        //public async Task<IActionResult> GetWaterbottlesAsync()
        //{
        //    try
        //    {
        //        var results = await _IPKPRepository.GetAllStockItemsAsync();
        //        return Ok(results);
        //    }
        //    catch (Exception)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
        //    }
        //}

        //[HttpGet]
        //[Route("GetAdultClothing")]
        //public async Task<IActionResult> GetAdultClothingAsync()
        //{

        //}

        //[HttpGet]
        //[Route("GetFlasks")]
        //public async Task<IActionResult>GetFlasksAsync()
        //{

        //}

        //[HttpGet]
        //[Route("GetKidsClothing")]
        //public async Task<IActionResult>GetKidsClothingAsync()
        //{

        //}

        //[HttpGet]
        //[Route("GetMugs")]
        //public async Task<IActionResult>GetMugsAsync()
        //{

        //}

        //[HttpGet]
        //[Route("GetNoteBooks")]
        //public async Task<IActionResult>GetNoteBooksAsync()
        //{

        //}


        //[HttpGet]
        //[Route("GetWaterBottles")]
        //public async Task<IActionResult>GetWaterBottlesAsync()
        //{

        //}
    }
}
