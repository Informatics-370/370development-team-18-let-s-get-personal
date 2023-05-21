using IPKP___API.Controllers.Models;
using IPKP___API.Controllers.Models.Entities;
using IPKP___API.Controllers.Models.Repository;
using Microsoft.AspNetCore.Authorization;
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
  [Authorize]
  public class UserRolePermissionsController : ControllerBase
  {
    //Add endpoints here;
  }
}
