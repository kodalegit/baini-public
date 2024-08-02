import path from "path";
import {
  Asset,
  createC2pa,
  createTestSigner,
  ManifestBuilder,
} from "c2pa-node";
import crypto from "crypto";

type MimeType = "image/jpeg" | "image/png";

export async function signInMemory(
  buffer: Buffer,
  mimeType: MimeType,
  manifest: ManifestBuilder
) {
  const asset: Asset = { buffer, mimeType: mimeType };
  const signer = await createTestSigner();
  const c2pa = createC2pa({
    signer,
  });
  const { signedAsset } = await c2pa.sign({
    asset,
    manifest,
  });
  return signedAsset;
}

export async function signFromPath(
  uploadedImage: string,
  manifest: ManifestBuilder
) {
  const imagesDir = process.cwd() + "/uploads/";
  const asset = {
    path: path.join(imagesDir, uploadedImage),
  };
  const signedImage = "signed_" + uploadedImage;
  const outputPath = path.join(imagesDir, signedImage);
  const signer = await createTestSigner();
  const c2pa = createC2pa({
    signer,
  });

  const { signedAsset, signedManifest } = await c2pa.sign({
    manifest,
    asset,
    options: {
      outputPath,
    },
  });

  return signedAsset.path;
}

export function generateUniqueFileName(
  originalFileName: string,
  bytes = 32
): string {
  const randomString = crypto.randomBytes(bytes).toString("hex");
  const fileExtension = originalFileName.split(".").pop();
  return `${randomString}.${fileExtension}`;
}

export function generateDownloadToken(): string {
  const token = crypto.randomBytes(16).toString("hex");
  return token;
}
