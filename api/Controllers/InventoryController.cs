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
       //METHODS: GetallInventory, AddToLineItem, AddToInventory write off, stock take

        private readonly IIPKPRepository _IPKPRepository;
        public InventoryController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

        //*************** Write off ***************\\
        //1. Add to write off table
        //2. Delete from inventory

        //*************** Stock Take ***************\\
        //1. Get current Stock Total
        //2. Get all old stock takes, get specific stock take
        //3. Get new stock amounts, add new stock take, update inventory
        //4. Update for foreign keys
        //5. 

        //enter current quanities

        //compare to system quantities 


    }
}
