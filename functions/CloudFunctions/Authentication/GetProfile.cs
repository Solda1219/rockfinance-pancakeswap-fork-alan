using System.Threading.Tasks;
using CloudFunctions.Utils;
using EntityLayer;
using Google.Cloud.Functions.Framework;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace CloudFunctions.Authentication {
    public class GetProfile : CloudFunction<GetProfile>, IHttpFunction {
        public GetProfile(ILogger<GetProfile> aLogger)
            : base(aLogger) { }

        public async Task HandleAsync(HttpContext aContext) {
            HandleHeaders(aContext);
            var body = await ParseBody(aContext);
            Logger.LogInformation("body - " + body);
            var response = await HandleAsync(body);
            await aContext.Response.WriteAsync(response);
        }

        public async Task<string> HandleAsync(string someJson) {
            var user = someJson.DeserializeObjectFromString<Profile>();
            var profile = await Services.Authentication.GetProfile(user);
            return profile.ToJson();
        }
    }
}