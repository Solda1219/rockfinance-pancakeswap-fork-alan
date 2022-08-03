using System;
using System.Threading.Tasks;
using CloudFunctions.Utils;
using EntityLayer;
using Google.Cloud.Functions.Framework;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace CloudFunctions.Authentication {
    public class Logout : CloudFunction<Logout>, IHttpFunction {
        public Logout(ILogger<Logout> aLogger)
            : base(aLogger) { }

        public async Task HandleAsync(HttpContext aContext) {
            try {
                HandleHeaders(aContext);
                var body = await ParseBody(aContext);
                await HandleAsync(body);
                await aContext.Response.WriteAsync(null);
            } catch (Exception ex) {
                Logger.LogInformation("Exception error  - " + ex.Message);
            }
        }

        public async Task HandleAsync(string someJson) {
            var user = someJson.DeserializeObjectFromString<Profile>();
            await Services.Authentication.Logout(user);
        }
    }
}