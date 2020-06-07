using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Open.Client.Angular.Model
{
    public class ClientOptions
    {
        public Oidc Oidc { get; set; }
        public Api Api { get; set; }
    }

    public class Api
    {
        public string Url { get; set; }
    }

    public class Oidc
    {
        public string Authority { get; set; }
        public string ClientId { get; set; }
        public string RedirectUri { get; set; }
        public string PostLogoutRedirectUri { get; set; }
        public string ResponseType { get; set; }
        public string Scope { get; set; }
    }
}
