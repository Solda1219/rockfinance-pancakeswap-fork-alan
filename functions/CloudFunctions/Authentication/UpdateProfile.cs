using System.Threading.Tasks;
using CloudFunctions.Utils;
using EntityLayer;
using Google.Cloud.Functions.Framework;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace CloudFunctions.Authentication {
    public class UpdateProfile : CloudFunction<UpdateProfile>, IHttpFunction {
        public UpdateProfile(ILogger<UpdateProfile> aLogger)
            : base(aLogger) { }

        public async Task HandleAsync(HttpContext aContext) {
            HandleHeaders(aContext);
            var body = await ParseBody(aContext);
            Logger.LogInformation("body - " + body);
            await HandleAsync(body);
            await aContext.Response.WriteAsync(null);
        }

        public async Task HandleAsync(string someJson) {
            var user = someJson.DeserializeObjectFromString<Profile>();
            await Services.Authentication.UpdateProfile(user);
        }
    }
}