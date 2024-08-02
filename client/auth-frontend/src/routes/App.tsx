import UploadForm from "../components/UploadForm";
import OneTapSignIn from "../components/OneTapSignIn";
import { useAuth } from "../auth/ContextProvider";

function App() {
  const { currentUser } = useAuth();
  return (
    <div className="text-center">
      <h1 className="scroll-m-20 font-raleway text-4xl font-extrabold text-emerald-800 dark:text-emerald-600 max-sm:text-2xl md:text-5xl">
        Securely sign images with unique credentials and verify provenace
        information
      </h1>
      <p className="font-lato mb-4 mt-6 text-slate-600 dark:text-slate-300 max-md:text-sm">
        Sign or verify images against{" "}
        <a
          className="font-bold underline decoration-emerald-300 underline-offset-4 transition-all hover:underline hover:decoration-emerald-600 hover:decoration-2"
          href="https://contentauthenticity.org/how-it-works"
          target="_blank"
        >
          open standards
        </a>{" "}
        that provide tamper-evident signatures on images. As a creator, you can
        ensure your images remain unaltered and you provide as much or as little
        information on the provenance of your image. Any alterations to your
        content will change the signature and can be easily flagged as altered.
      </p>
      <UploadForm />
      {!currentUser && <OneTapSignIn />}
    </div>
  );
}

export default App;
