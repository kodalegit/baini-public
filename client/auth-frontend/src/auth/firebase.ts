// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  updateProfile,
  signOut,
  deleteUser,
  signInWithPopup,
  reauthenticateWithCredential,
  OAuthCredential,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  where,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

const COLLECTION = "user-assertions";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "etc",
  authDomain: "etc",
  projectId: "etc",
  storageBucket: "etc",
  messagingSenderId: "etc",
  appId: "etc",
  measurementId: "etc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Save manifest documents in firestore
export const firestoreSaveManifest = async (manifest: any) => {
  try {
    await addDoc(collection(db, COLLECTION), manifest);
    console.log("Document created successfully.");
  } catch (error) {
    console.error("Error saving manifest in Firestore: ", error);
  }
};

// Loader function to retrieve user manifests from firestore
export async function loadFromFirestore(userId: string) {
  const q = query(
    collection(db, COLLECTION),
    where("userID", "==", `${userId}`),
    orderBy("created_at", "desc"),
    limit(24),
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data());
}

export const provider = new GoogleAuthProvider();

export const logOut = () => {
  return signOut(auth);
};

// Update display name
export function updateDisplayName(name: string) {
  if (auth.currentUser) {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  } else {
    return Promise.reject(new Error("No current user"));
  }
}

// Delete user
export function deleteAccount() {
  if (auth.currentUser) {
    return deleteUser(auth.currentUser);
  } else {
    return Promise.reject(new Error("No current user"));
  }
}

// Perform re-auth in case of delete user signed in too long ago
export function freshSignIn() {
  return signInWithPopup(auth, provider).then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    return credential;
  });
}

// Revalidate user
export function revalidateUser(credential: OAuthCredential) {
  if (auth.currentUser) {
    return reauthenticateWithCredential(auth.currentUser, credential);
  }
  return Promise.reject(new Error("No current user"));
}
