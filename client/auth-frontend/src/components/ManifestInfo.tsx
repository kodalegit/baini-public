import { useThumbnailUrl } from "@contentauth/react";
import { selectProducer } from "c2pa";
import ActionComponent from "./ActionComponent";
import { ManifestInfoProps } from "../types/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const ManifestInfo = ({ manifest, failureCodes }: ManifestInfoProps) => {
  const errorCodes: Record<string, string> = {
    "assertion.hashedURI.mismatch":
      "An assertion shows evidence of tampering. Some changes occured that couldn't be or weren't recorded.",
    "assertion.dataHash.mismatch":
      "The image shows evidence of tampering. Some changes occured that couldn't be or weren't recorded.",
    "assertion.boxesHash.mismatch":
      "An assertion shows evidence of tampering. Some changes occured that couldn't be or weren't recorded.",
    "signingCredential.untrusted":
      "Credential used to sign the image is untrusted.",
    "signingCredential.invalid":
      "Credential used to sign the image is invalid.",
    "signingCredential.revoked":
      "Credential used to sign the image has been revoked.",
    "signingCredential.expired":
      "Credential used to sign the image has expired.",
  };

  const errors: string[] = [];
  if (failureCodes) {
    failureCodes.forEach((status) => {
      if (status.code in errorCodes) {
        errors.push(errorCodes[status.code]);
      }
    });
  }
  const hasError = errors.length > 0;

  const thumbnailUrl = useThumbnailUrl(manifest.thumbnail ?? undefined);
  const producer = manifest ? selectProducer(manifest) : null;

  return (
    <div
      className={`group relative h-full w-full overflow-hidden rounded shadow-md ${hasError ? "border-2 border-red-500 shadow-red-500" : ""}`}
    >
      {thumbnailUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-55 transition-all duration-300 group-hover:scale-105 group-hover:opacity-25"
          style={{
            backgroundImage: `url(${thumbnailUrl})`,
          }}
        ></div>
      )}
      <div className="relative bg-white bg-opacity-75 p-6 text-left">
        <div>
          {errors.map((message, index) => (
            <p key={index} className="font-semibold text-red-600">
              {message}
            </p>
          ))}
        </div>
        {producer && (
          <section className="my-4">
            <h4 className="scroll-m-20 text-xl font-semibold">Creative Work</h4>
            <p>This asset is the product of creative effort.</p>
            <p className="scroll-m-20 text-lg font-semibold">Produced by</p>
            <p>{producer.name}</p>
          </section>
        )}

        <ActionComponent manifest={manifest} />
        <section className="mb-4">
          <div>
            <div className="flex">
              <p className="scroll-m-20 text-lg font-semibold">
                Number of ingredients
              </p>
              <HoverCard>
                <HoverCardTrigger>
                  <div className="cursor-help">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                      />
                    </svg>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent>
                  <p className="text-sm">
                    Constituent assets used to create this image.
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
          <p>{manifest.ingredients?.length}</p>
        </section>
        <section className="my-4">
          <h4 className="scroll-m-20 text-xl font-semibold">
            About this Content Credential
          </h4>
          <div>
            <p className="scroll-m-20 text-lg font-semibold">
              Credentials generator
            </p>
            <p>
              {manifest.claimGenerator
                ? manifest.claimGenerator.replace(
                    /\sc2pa-node\/\S+|\sc2pa-rs\/\S+/g,
                    "",
                  )
                : null}
            </p>
            <div>
              <p className="scroll-m-20 text-lg font-semibold">Signed by</p>
              <p> {manifest.signatureInfo?.issuer}</p>
            </div>
          </div>
          <div>
            <p className="scroll-m-20 text-lg font-semibold">Signed on</p>
            <p>
              {manifest.signatureInfo?.time
                ? new Date(manifest.signatureInfo.time).toLocaleString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: true,
                      timeZoneName: "short",
                    },
                  )
                : null}
            </p>
          </div>
        </section>
        <section>
          <p className="text-sm italic text-slate-600">
            You can inspect the image further{" "}
            <a
              href="https://contentcredentials.org/verify"
              className="font-bold italic underline decoration-emerald-300 underline-offset-2 transition-all hover:underline hover:decoration-emerald-600 hover:decoration-2"
              target="_blank"
            >
              here
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default ManifestInfo;
