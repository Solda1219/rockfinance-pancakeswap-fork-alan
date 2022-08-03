using System.Threading.Tasks;
using DataAccessLayer;
using EntityLayer;

namespace Services {
    public class Authentication {
        public static async Task<Profile> GetProfile(Profile aUser) {
            var userDao = await UserDao.New(aUser, false);
            var profile = await userDao.GetByEmail();
            return profile;
        }

        public static async Task<Profile> Register(Profile aUser) {
            var userDao = await UserDao.New(aUser, true, true);
            var exists = await userDao.ExistsFromEmail();
            if (exists) {
                aUser.ErrorMessage = Constants.PROFILE_ALREADY_EXISTS;
                return aUser;
            }
            var created = await userDao.Create();
            if (!created)
                aUser.ErrorMessage = Constants.FAILED_TO_CREATE_PROFILE;
            aUser.IsAuthenticated = true;
            return aUser;
        }

        public static async Task<Profile> Login(Profile aUser) {
            var userDao = await UserDao.New(aUser, true);
            await userDao.LogInOut(true);
            var profile = await userDao.GetByEmail();
            return profile;
        }

        public static async Task Logout(Profile aUser) {
            var userDao = await UserDao.New(aUser, false);
            await userDao.LogInOut(false);
        }

        public static async Task UpdateProfile(Profile aUser) {
            var userDao = await UserDao.New(aUser, false);
            await userDao.Update();
        }
    }
}