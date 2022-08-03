using System;
using Google.Cloud.Firestore;

namespace EntityLayer {
    public class Base {
        [FirestoreProperty]
        public string ErrorMessage { get; set; }
        [FirestoreProperty]
        public string Id { get; set; }
        [FirestoreProperty]
        public DateTime CreatedDate { get; set; }
    }
}