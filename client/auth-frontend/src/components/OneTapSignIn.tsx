import React, { useEffect } from "react";
import { auth } from "../auth/firebase";
import { useAuth } from "../auth/ContextProvider";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

declare global {
  interface Window {
    google: any;
  }
}

const OneTapSignIn: React.FC = () => {
  const { currentUser, setCurrentUser } = useAuth();
  useEffect(() => {
    if (currentUser) return;
    const handleCredentialResponse = (response: any) => {
      const credential = GoogleAuthProvider.credential(response.credential);
      signInWithCredential(auth, credential)
        .then((result) => {
          console.log("User signed in successfully.");
          setCurrentUser(result.user);
        })
        .catch((error) => {
          console.error("Error signing in:", error);
        });
    };

    const initializeGoogleSignIn = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id:
            "333479689357-ch87g7m3nitdjbt8m6f9sr7v34ackgtu.apps.googleusercontent.com",
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.prompt();
      } else {
        console.error("Google Identity Services SDK not loaded");
      }
    };

    // Check if the Google Identity Services SDK is loaded
    if (window.google && window.google.accounts) {
      initializeGoogleSignIn();
    } else {
      // Wait for the script to load
      const scriptLoadListener = () => {
        initializeGoogleSignIn();
      };

      window.addEventListener("google-loaded", scriptLoadListener);

      return () => {
        window.removeEventListener("google-loaded", scriptLoadListener);
      };
    }
  }, []);

  return <></>;
};

export default OneTapSignIn;
