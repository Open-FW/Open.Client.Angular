using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Open.Client.Angular.Model;

namespace Open.Client.Angular.Controllers
{
    [Route("config")]
    [ApiController]
    public class ConfigurationController : ControllerBase
    {
        private readonly ClientOptions clientOptions;

        public ConfigurationController(IOptions<ClientOptions> optionsAccessor)
        {
            this.clientOptions = optionsAccessor?.Value ?? throw new ArgumentNullException(nameof(optionsAccessor));
        }

        [HttpGet]
        public ClientOptions Get()
        {
            return this.clientOptions;
        }
    }
}