using Google.Cloud.Firestore;

namespace EntityLayer {
    [FirestoreData]
    public class Profile {
        [FirestoreProperty]
        public string Email { get; set; }
        [FirestoreProperty]
        public string WalletId { get; set; }
        [FirestoreProperty]
        public string Password { get; set; }
        [FirestoreProperty]
        public string FirstName { get; set; }
        [FirestoreProperty]
        public string LastName { get; set; }
        [FirestoreProperty]
        public bool IsAuthenticated { get; set; }
        [FirestoreProperty]
        public string AffiliateId { get; set; }
        [FirestoreProperty]
        public string ReferralId { get; set; }
        [FirestoreProperty]
        public string ErrorMessage { get; set; }
    }
}