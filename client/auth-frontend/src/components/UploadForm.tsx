import React, { useState } from "react";
import ManifestForm from "./ManifestForm";
import VerifyDetails from "./VerifyDetails";
import wasmSrc from "c2pa/dist/assets/wasm/toolkit_bg.wasm?url";
import workerSrc from "c2pa/dist/c2pa.worker.js?url";
import { createC2pa, C2paReadResult } from "c2pa";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "../auth/ContextProvider";
import { firestoreSaveManifest } from "../auth/firebase";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import localforage from "localforage";
import { CACHE_KEY_PREFIX } from "@/types/types";

// Production URL
const URL = "https://server-yd7belpzxq-uc.a.run.app";

// Local Dev URL
// const URL = "http://localhost:3000";

const UploadForm: React.FC = () => {
  const { currentUser } = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [signed, setSigned] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [manifestFormVisible, setManifestFormVisible] = useState(false);
  const [manifestData, setManifestData] = useState<any>(null);
  const [provenance, setProvenace] = useState<C2paReadResult | undefined>(
    undefined,
  );
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
      // Clear any error message
      if (error) {
        setError("");
      }
      // Hide successful message when new image is uploaded
      if (signed) {
        setSigned(false);
      }
      // Invalidate any manifest stored from previous operation
      if (manifestData) {
        setManifestData(null);
      }
      // Invalidate provenance from previous verify function
      if (provenance) {
        setProvenace(undefined);
      }
      // Hide open manifest entry form if new file is uploaded
      if (manifestFormVisible) {
        setManifestFormVisible(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image.");
      console.error("No image selected");
      return;
    }
    if (signed) {
      setSigned(false);
    }
    if (error) {
      setError("");
    }
    const formData = new FormData();
    formData.append("image", image);

    if (manifestData) {
      formData.append("manifest", JSON.stringify(manifestData));
    }

    setLoading(true);

    try {
      const response = await fetch(`${URL}/api/sign`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Image signed successfully");
        const newManifestEntry = {
          ...manifestData,
          created_at: Timestamp.fromDate(new Date()),
          userID: currentUser?.uid,
          title: image.name,
        };

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `signed_${image.name}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        setSigned(true);
        toast({
          description: "Downloading signed image...",
        });

        // Save to Firestore
        await firestoreSaveManifest(newManifestEntry);

        // Invalidate cached documents
        await localforage.removeItem(`${CACHE_KEY_PREFIX}${currentUser?.uid}`);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        console.error("Failed to sign image: ", errorData.error);
      }
    } catch (error) {
      setError("Error signing image.");
      console.error("Error signing image: ", error);
    } finally {
      setLoading(false);
    }
  };

  const verifier = async () => {
    const c2pa = await createC2pa({
      wasmSrc,
      workerSrc,
    });
    if (!image) {
      console.error("No image selected");
      setError("Please select an image.");
      return;
    }

    setLoading(true);
    if (manifestFormVisible) {
      setManifestFormVisible(false);
    }
    try {
      const provenance = await c2pa.read(image);
      setProvenace(provenance);
    } catch (error) {
      setError("Error verifying image. Try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="my-4"
      >
        <div className="flex flex-col items-center justify-center md:flex-row">
          <input
            type="file"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            name="image"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={handleFileChange}
          />
          <div className="flex items-center">
            {!manifestData && (
              <Button
                type="button"
                className="m-2 bg-yellow-700 hover:bg-yellow-700/90 dark:bg-yellow-800 dark:hover:bg-yellow-800/90"
                disabled={!image}
                onClick={() => setManifestFormVisible(true)}
              >
                Sign
              </Button>
            )}
            {manifestData && (
              <Button
                type="submit"
                className="m-2 bg-yellow-700 hover:bg-yellow-700/90 dark:bg-yellow-800 dark:hover:bg-yellow-800/90"
              >
                Sign Image
              </Button>
            )}
            <Button
              className="bg-emerald-700 hover:bg-emerald-700/90 dark:bg-emerald-800 dark:hover:bg-emerald-800/90"
              type="button"
              disabled={manifestData}
              onClick={verifier}
            >
              Verify
            </Button>
          </div>
        </div>
      </form>
      {loading && (
        <p>
          <span className="loading loading-infinity loading-lg bg-black"></span>
        </p>
      )}
      {error && <p className="text-red-600">{error}</p>}
      {manifestFormVisible && (
        <div>
          <ManifestForm
            setManifestData={setManifestData}
            setManifestFormVisible={setManifestFormVisible}
          />
        </div>
      )}

      {signed && (
        <p className="font-lato font-semibold text-green-600">
          Image signed successfully.
        </p>
      )}
      {provenance && !manifestData && !manifestFormVisible && (
        <VerifyDetails provenance={provenance} />
      )}
    </div>
  );
};

export default UploadForm;
