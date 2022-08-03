using Newtonsoft.Json;

namespace CloudFunctions.Utils {
    public static class ObjectUtil {
        public static string ToJson(this object anObject) => JsonConvert.SerializeObject(anObject);
    }
}