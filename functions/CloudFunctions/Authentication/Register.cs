using System;
using System.Threading.Tasks;
using CloudFunctions.Utils;
using EntityLayer;
using Google.Cloud.Functions.Framework;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace CloudFunctions.Authentication {
    public class Register : CloudFunction<Register>, IHttpFunction {
        public Register(ILogger<Register> aLogger)
            : base(aLogger) { }

        public async Task HandleAsync(HttpContext aContext) {
            try {
                HandleHeaders(aContext);
                var body = await ParseBody(aContext);
                var response = await HandleAsync(body);
                await aContext.Response.WriteAsync(response);
            } catch (Exception ex) {
                Logger.LogInformation("Exception error  - " + ex.Message);
            }
        }

        public async Task<string> HandleAsync(string someJson) {
            var user = someJson.DeserializeObjectFromString<Profile>();
            var registered = await Services.Authentication.Register(user);
            return registered.ToJson();
        }
    }
}