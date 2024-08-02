import { C2paReadResult } from "c2pa";
import ManifestInfo from "./ManifestInfo";

function VerifyDetails({ provenance }: { provenance: C2paReadResult }) {
  return (
    <div>
      <div className="text-slate-700 dark:text-slate-50">
        <h3 className="my-4 scroll-m-20 font-raleway text-2xl font-semibold dark:text-slate-50">
          Image Credentials
        </h3>
        {provenance.manifestStore ? (
          <ManifestInfo
            manifest={provenance.manifestStore.activeManifest}
            failureCodes={provenance.manifestStore.validationStatus}
          />
        ) : (
          <div>No content credential for this image.</div>
        )}
      </div>
    </div>
  );
}

export default VerifyDetails;
