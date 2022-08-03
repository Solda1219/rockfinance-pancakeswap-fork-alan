using System.IO;
using System.Xml.Serialization;
using Newtonsoft.Json;

namespace CloudFunctions.Utils {
    public static class StringUtil {
        public static T DeserializeObjectFromString<T>(this string aString) {
            if (aString.StartsWith("{"))
                return JsonConvert.DeserializeObject<T>(aString);
            var serializer = new XmlSerializer(typeof(T));
            return (T) serializer.Deserialize(new StringReader(aString));
        }
    }
}