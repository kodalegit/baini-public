import { Manifest } from "c2pa";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

// Manifest Types
export interface ValidationStatus {
  code: string;
  url?: string;
  explanation?: string;
}

export interface ManifestInfoProps {
  manifest: Manifest;
  failureCodes: ValidationStatus[] | undefined;
}

export interface Action {
  action: string;
  digitalSourceType:
    | "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
    | "http://cv.iptc.org/newscodes/digitalsourcetype/digitalArt"
    | "http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture"
    | "http://cv.iptc.org/newscodes/digitalsourcetype/compositeSynthetic"
    | "http://cv.iptc.org/newscodes/digitalsourcetype/dataDrivenMedia"
    | "";
  softwareAgent: string;
}

export interface TrainingMiningEntry {
  use: "allowed" | "notAllowed" | "constrained";
  constraint_info?: string;
}

export interface TrainingMiningEntries {
  [key: string]: TrainingMiningEntry;
}

export interface CreativeWork {
  selected: boolean;
  author: string;
  datePublished: string;
}

export interface ManifestFormProps {
  setManifestData: React.Dispatch<React.SetStateAction<any>>;
  setManifestFormVisible: React.Dispatch<React.SetStateAction<any>>;
}

export const miningLabels = {
  "c2pa.ai_generative_training": "AI Generative Training",
  "c2pa.ai_inference": "AI Inference",
  "c2pa.ai_training": "AI Non-Generative Training",
  "c2pa.data_mining": "Data Mining",
} as const;

// Auth Context Types

export interface ContextUser {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Firestore Types
export type FirestoreDocsArr = DocumentData[] | null;

// Rendering Types
export interface ActionData {
  actions: Action[];
}

export interface TrainingData {
  entries: { [key in keyof typeof miningLabels]: TrainingMiningEntry };
}

export interface CreativeWorkData {
  "@context": string;
  "@type": string;
  author: Author[];
  datePublished: string;
}

export interface Author {
  "@type": string;
  name: string;
}

export type Label =
  | "c2pa.actions"
  | "stds.schema-org.CreativeWork"
  | "c2pa.training-mining";

export interface Assertion {
  label: Label;
  data: any;
  kind?: string;
}

export interface Document {
  assertions: Assertion[];
  title: string;
  created_at: Timestamp;
  userID: string;
}

// UI types
export type handleCreativeWorkChange = (
  field: keyof CreativeWork,
  value: string | boolean,
) => void;

export interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const CACHE_KEY_PREFIX = "profile-docs-";
