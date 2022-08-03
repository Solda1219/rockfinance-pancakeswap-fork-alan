using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace CloudFunctions {
    public class CloudFunction<T> {
        protected readonly ILogger Logger;

        public CloudFunction(ILogger<T> aLogger) => Logger = aLogger;

        protected void HandleHeaders(HttpContext aContext) => aContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

        protected async Task<string> ParseBody(HttpContext aContext) {
            using var reader
                = new StreamReader(aContext.Request.Body, Encoding.UTF8, true, 1024, true);
            var body = await reader.ReadToEndAsync();
            return body;
        }
    }
}