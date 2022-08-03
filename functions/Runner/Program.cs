using System;
using System.Threading.Tasks;
using CloudFunctions.Utils;
using EntityLayer;
using Services;

namespace Runner {
    internal class Program {
        private static async Task Main(string[] args) {
            try {
                //var json = "{\"Id\":\"\",\"CreatedDate\":\"2021-08-08T23:52:56.058Z\",\"Email\":\"33Infinity@gmail.com\",\"Password\":\"123456\",\"FirstName\":\"jeremy\",\"LastName\":\"krasin\",\"IsAuthenticated\":false} ";
                //var json = "{\"Email\":\"33infinity@gmail.com\",\"Password\":\"123456\"}";
                var json = "{\"Email\":\"kjjhlk\",\"Password\":\"hkjhkjh\"}";
                //var json = "{\"Id\":\"b4db33e6-d59d-4052-b968-bb955d9e11e4\",\"CreatedDate\":\"2021-08-15T00:53:13.261Z\",\"Email\":\"33infinity@gmail.com\",\"Password\":\"`???od?\\r\\u001f?I\\r????E3?\\u0003[?\\u001f?\\u0015\\u0012%!?{??\",\"FirstName\":\"jeremy\",\"LastName\":\"krasin\",\"IsAuthenticated\":true} ";
                var profile = json.DeserializeObjectFromString<Profile>();
                var loggedInProfile = await Authentication.Login(profile);
            } catch (Exception ex) {
                Console.Write(ex.Message);
            }
        }

        private static async void Login() {
            //var response = await CloudFunctions.Login.HandleLogin();
        }
    }
}