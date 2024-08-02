import multer from "multer";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { ManifestBuilder } from "c2pa-node";
import { signInMemory } from "./utils/utils";

interface DownloadLinks {
  [token: string]: [string, string];
}

const app: Express = express();
const port = 3000;

const downloadLinks: DownloadLinks = {};
// <------------- OLD LOGIC FOR PATH SIGNING ---------->
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Destination folder for storing uploaded files
//   },
//   filename: (req, file, cb) => {
//     // Generate a unique filename
//     const uniqueFileName = generateUniqueFileName(file.originalname);
//     cb(null, uniqueFileName);
//   },
// });

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 },
});

// Define allowed origins based on environment
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "https://baini-images.web.app",
        "https://baini-images.firebaseapp.com",
        "https://client-yd7belpzxq-uc.a.run.app",
      ]
    : ["http://localhost:5173", "http://localhost"];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

app.use(cors(corsOptions));

app.post(
  "/api/sign",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image provided" });
      }

      const imageFile = req.file;
      if (
        imageFile.mimetype !== "image/jpeg" &&
        imageFile.mimetype !== "image/png"
      ) {
        return res.status(400).json({
          error: "Invalid image format. Only JPEG and PNG are supported.",
        });
      }

      const userManifestData = JSON.parse(req.body.manifest);
      // Build Manifest
      const manifest = new ManifestBuilder({
        claim_generator: "Baini/0.1.0",
        format: imageFile.mimetype,
        title: imageFile.originalname,
        assertions: userManifestData.assertions,
      });

      const signedAsset = await signInMemory(
        imageFile.buffer,
        imageFile.mimetype,
        manifest
      );
      res.set({
        "Content-Type": imageFile.mimetype,
        "Content-Disposition": `attachment; filename="signed_${imageFile.originalname}"`,
      });
      res.status(200).send(signedAsset.buffer);

      // <------------- OLD LOGIC FOR PATH SIGNING ---------->
      // const signedImagePath = await signFromPath(imageFile.fileName, manifest);
      // const downloadToken = generateDownloadToken();
      // downloadLinks[downloadToken] = [signedImagePath, imageFile.originalname];
      // setTimeout(() => {
      //   delete downloadLinks[downloadToken];
      // }, 10 * 60 * 1000);
      // res.json({ downloadToken });
    } catch (error) {
      console.error("Error signing image: ", error);
      res.status(500).json({ error: "Failed to sign image" });
    }
  }
);

app.get("/download/:token", (req: Request, res: Response) => {
  const token = req.params.token;
  const imagePath = downloadLinks[token][0];
  const originalname = downloadLinks[token][1];
  res.download(imagePath, `signed_${originalname}`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
