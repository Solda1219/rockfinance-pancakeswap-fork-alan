using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EntityLayer;
using Google.Cloud.Firestore;

namespace DataAccessLayer {
    public class UserDao : BaseDao<UserDao> {
        private Profile User { get; }

        private UserDao(Profile aUser) => User = aUser;

        public static async Task<UserDao> New(Profile aUser, bool isAuthenticated, bool isSetAffiliate = false) {
            aUser.Password = Encrypt(aUser.Password);
            aUser.Email = aUser.Email.ToLower();
            aUser.IsAuthenticated = isAuthenticated;
            if (isSetAffiliate) aUser.AffiliateId = Guid.NewGuid().ToString();
            var userDao = new UserDao(aUser);
            await userDao.Init();
            return userDao;
        }

        public async Task<bool> ExistsFromEmail() {
            try {
                var profile = await GetByEmail();
                return profile != null;
            } catch {
                return false;
            }
        }

        public async Task<Profile> GetByEmail() {
            try {
                var emailSnapshot = await EmailSnapshot();
                return emailSnapshot.Documents.Count == 0 ? null : emailSnapshot.Documents[0].ConvertTo<Profile>();
            } catch {
                return null;
            }
        }

        private async Task<QuerySnapshot> EmailSnapshot() {
            var emailQuery = FsDb.Collection(UserTo.TABLE_NAME).WhereEqualTo(UserTo.EMAIL, User.Email.ToLower());
            var emailSnapshot = await emailQuery.GetSnapshotAsync();
            return emailSnapshot;
        }

        public async Task<bool> Create() {
            try {
                await FsDb.Collection(UserTo.TABLE_NAME).AddAsync(User);
                return true;
            } catch (Exception ex) {
                return false;
            }
        }

        public async Task Update() {
            var emailSnapShot = await EmailSnapshot();
            if (emailSnapShot.Documents.Count == 0) return;
            await FsDb.Collection(UserTo.TABLE_NAME).Document(emailSnapShot.Documents[0].Id).SetAsync(User);
        }

        public async Task LogInOut(bool isAuthenticated) {
            var emailSnapShot = await EmailSnapshot();
            if (emailSnapShot.Documents.Count == 0) return;
            await FsDb.Collection(UserTo.TABLE_NAME).Document(emailSnapShot.Documents[0].Id).UpdateAsync(new Dictionary<string, object> {{UserTo.IS_AUTHENTICATED, isAuthenticated}});
        }
    }
}