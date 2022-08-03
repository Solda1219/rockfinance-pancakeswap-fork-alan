using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Google.Cloud.Firestore;
using static Google.Cloud.Firestore.FirestoreDb;

namespace DataAccessLayer {
    public abstract class BaseDao<T> {
        private const string SECRET_HASH_KEY = "rock-finance";
        protected FirestoreDb FsDb { get; set; }

        protected async Task Init() {
            FsDb = await CreateAsync("rock-finance");
        }

        protected static string Encrypt(string aStringToEncrypt) {
            var data = Encoding.ASCII.GetBytes(SECRET_HASH_KEY);
            data = new SHA256Managed().ComputeHash(data);
            return Encoding.ASCII.GetString(data);
        }
    }
}