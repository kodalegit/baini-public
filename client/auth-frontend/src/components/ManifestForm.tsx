import React, { useState } from "react";
import { useAuth } from "../auth/ContextProvider";
import {
  Action,
  TrainingMiningEntry,
  TrainingMiningEntries,
  CreativeWork,
  ManifestFormProps,
  miningLabels,
} from "../types/types";
import SignUpModal from "./SignUpModal";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "./DatePicker";

const ManifestForm: React.FC<ManifestFormProps> = ({
  setManifestData,
  setManifestFormVisible,
}) => {
  const [actions, setAction] = useState<Action>({
    action: "c2pa.created",
    digitalSourceType: "",
    softwareAgent: "",
  });

  const [trainingMiningEntries, setTrainingMiningEntries] =
    useState<TrainingMiningEntries>({
      "c2pa.ai_generative_training": { use: "notAllowed" },
      "c2pa.ai_inference": { use: "notAllowed" },
      "c2pa.ai_training": { use: "notAllowed" },
      "c2pa.data_mining": { use: "notAllowed" },
    });

  const [creativeWork, setCreativeWork] = useState<CreativeWork>({
    selected: false,
    author: "",
    datePublished: "",
  });

  const { currentUser } = useAuth();

  const handleActionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAction((prevAction) => ({
      ...prevAction,
      [name]: value,
    }));
  };

  const handleCreativeWorkChange = (
    field: keyof CreativeWork,
    value: string | boolean,
  ) => {
    setCreativeWork({ ...creativeWork, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setManifestFormVisible(false);
    // Construct manifest object
    const manifest: any = {
      assertions: [
        {
          label: "c2pa.actions",
          data: { actions: [actions] },
        },
        {
          label: "c2pa.training-mining",
          data: { entries: trainingMiningEntries },
        },
      ],
    };

    // Add CreativeWork if selected
    if (creativeWork.selected) {
      manifest.assertions.push({
        label: "stds.schema-org.CreativeWork",
        data: {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          author: [
            {
              "@type": "Person",
              name: creativeWork.author,
            },
          ],
          datePublished: creativeWork.datePublished,
        },
        kind: "Json",
      });
    }

    // Bind manifest to state then to Form Data containing image
    setManifestData(manifest);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 p-8 text-slate-800 shadow-md dark:text-slate-200"
    >
      <div>
        <fieldset>
          <legend className="my-4 font-bold">
            Specify how the image was created or modified
          </legend>
          <div className="mb-2 flex justify-center max-md:gap-1 md:gap-2">
            <div>
              <input
                type="radio"
                id="http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
                name="digitalSourceType"
                className="radio radio-sm mr-1 cursor-pointer border-slate-400 checked:border-slate-700"
                value="http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
                checked={
                  actions.digitalSourceType ===
                  "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
                }
                onChange={handleActionChange}
              />
              <label
                htmlFor="http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
                className="inline-block align-[4px] font-semibold"
              >
                Generative AI
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="digitalSourceType"
                id="http://cv.iptc.org/newscodes/digitalsourcetype/digitalArt"
                className="radio radio-sm ml-3 mr-1 cursor-pointer border-slate-400 checked:border-slate-700"
                value="http://cv.iptc.org/newscodes/digitalsourcetype/digitalArt"
                checked={
                  actions.digitalSourceType ===
                  "http://cv.iptc.org/newscodes/digitalsourcetype/digitalArt"
                }
                onChange={handleActionChange}
              />
              <label
                htmlFor="http://cv.iptc.org/newscodes/digitalsourcetype/digitalArt"
                className="inline-block align-[4px] font-semibold"
              >
                Digital Art
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="digitalSourceType"
                id="http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture"
                className="radio radio-sm ml-3 mr-1 cursor-pointer border-slate-400 checked:border-slate-700"
                value="http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture"
                checked={
                  actions.digitalSourceType ===
                  "http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture"
                }
                onChange={handleActionChange}
              />
              <label
                htmlFor="http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture"
                className="inline-block align-[4px] font-semibold"
              >
                Digital Capture
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="digitalSourceType"
                id="http://cv.iptc.org/newscodes/digitalsourcetype/dataDrivenMedia"
                className="radio radio-sm ml-3 mr-1 cursor-pointer border-slate-400 checked:border-slate-700"
                value="http://cv.iptc.org/newscodes/digitalsourcetype/dataDrivenMedia"
                checked={
                  actions.digitalSourceType ===
                  "http://cv.iptc.org/newscodes/digitalsourcetype/dataDrivenMedia"
                }
                onChange={handleActionChange}
              />
              <label
                htmlFor="http://cv.iptc.org/newscodes/digitalsourcetype/dataDrivenMedia"
                className="inline-block align-[4px] font-semibold"
              >
                Data
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="digitalSourceType"
                id="http://cv.iptc.org/newscodes/digitalsourcetype/compositeSynthetic"
                value="http://cv.iptc.org/newscodes/digitalsourcetype/compositeSynthetic"
                className="radio radio-sm ml-3 mr-1 cursor-pointer border-slate-400 checked:border-slate-700"
                checked={
                  actions.digitalSourceType ===
                  "http://cv.iptc.org/newscodes/digitalsourcetype/compositeSynthetic"
                }
                onChange={handleActionChange}
              />
              <label
                htmlFor="http://cv.iptc.org/newscodes/digitalsourcetype/compositeSynthetic"
                className="inline-block align-[4px] font-semibold"
              >
                Hybrid
              </label>
            </div>
          </div>
          <>
            {actions.digitalSourceType ===
              "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia" && (
              <div className="my-4 text-slate-600">
                Image was created by generative AI tools.
              </div>
            )}
            {actions.digitalSourceType ===
              "http://cv.iptc.org/newscodes/digitalsourcetype/digitalArt" && (
              <div className="my-4 text-slate-600">
                Image is created by a person using digital tools.
              </div>
            )}

            {actions.digitalSourceType ===
              "http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture" && (
              <div className="my-4 text-slate-600">
                Image is captured from real-life scenes using a digital camera
                or recorder.
              </div>
            )}

            {actions.digitalSourceType ===
              "http://cv.iptc.org/newscodes/digitalsourcetype/dataDrivenMedia" && (
              <div className="my-4 text-slate-600">
                Image showcases a representation of data.
              </div>
            )}
            {actions.digitalSourceType ===
              "http://cv.iptc.org/newscodes/digitalsourcetype/compositeSynthetic" && (
              <div className="my-4 text-slate-600">
                Image is a blend of various components, at least one that is
                digitally created.
              </div>
            )}
          </>
          <div className="text-left">
            <label
              htmlFor="softwareAgent"
              className="mb-2 block text-sm font-semibold"
            >
              Software Agent
            </label>

            <Input
              type="text"
              id="softwareAgent"
              name="softwareAgent"
              placeholder="Software/Hardware used to create/modify the image"
              className="w-full"
              maxLength={256}
              value={actions.softwareAgent}
              onChange={handleActionChange}
            />
          </div>
        </fieldset>
      </div>
      <div>
        <Separator className="my-4" />
        <fieldset>
          <legend className="my-4 font-bold">Do not train Assertion</legend>
          {Object.keys(trainingMiningEntries).map((field) => (
            <div
              className="space-y-2 text-left md:grid md:grid-cols-3 md:gap-2"
              key={field}
            >
              <label className="text-sm font-semibold">
                {miningLabels[field as keyof typeof miningLabels]}
              </label>
              <Select
                value={
                  trainingMiningEntries[field].use as TrainingMiningEntry["use"]
                }
                onValueChange={(value) => {
                  const useValue = value as TrainingMiningEntry["use"];
                  setTrainingMiningEntries((prevEntries) => ({
                    ...prevEntries,
                    [field]: {
                      ...prevEntries[field],
                      use: useValue,
                    },
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent id={field}>
                  <SelectItem value="allowed">Allowed</SelectItem>
                  <SelectItem value="notAllowed">Not Allowed</SelectItem>
                  <SelectItem value="constrained">Constrained</SelectItem>
                </SelectContent>
              </Select>
              {trainingMiningEntries[field]["use"] === "constrained" && (
                <Input
                  placeholder="Further info such as conditions, contacts etc."
                  required
                  id={trainingMiningEntries[field] + "_constraints"}
                  value={trainingMiningEntries[field].constraint_info || ""}
                  maxLength={256}
                  onChange={(e) => {
                    const value = e.target.value;
                    setTrainingMiningEntries((prevEntries) => ({
                      ...prevEntries,
                      [field]: {
                        ...prevEntries[field],
                        constraint_info: value,
                      },
                    }));
                  }}
                />
              )}
            </div>
          ))}
        </fieldset>
      </div>
      <Separator className="my-4" />
      <fieldset>
        <div className="mb-2 flex items-center justify-center">
          <input
            type="checkbox"
            id="creativeWork"
            className="checkbox checkbox-sm mr-2 border-slate-400"
            checked={creativeWork.selected}
            onChange={(e) =>
              handleCreativeWorkChange("selected", e.target.checked)
            }
          />
          <label className="font-semibold" htmlFor="creativeWork">
            Creative Work (Image is a product of creative effort)
          </label>
        </div>

        {creativeWork.selected && (
          <>
            <div className="mb-2 flex justify-center">
              <Input
                type="text"
                placeholder="Author"
                required
                name="author"
                className="w-[280px]"
                value={creativeWork.author}
                maxLength={256}
                onChange={(e) =>
                  handleCreativeWorkChange("author", e.target.value)
                }
              />
            </div>
            <div>
              <DatePicker handleChange={handleCreativeWorkChange} />
            </div>
          </>
        )}
      </fieldset>
      {currentUser ? (
        <Button
          type="submit"
          className="bg-teal-600 hover:bg-teal-600/90 dark:bg-teal-800 dark:hover:bg-teal-800/90"
        >
          Bind to Image
        </Button>
      ) : (
        <SignUpModal />
      )}

      <Button
        type="button"
        variant="destructive"
        className="ml-2"
        onClick={() => {
          setManifestFormVisible(false);
        }}
      >
        Cancel
      </Button>
      <p className="font-lato text-sm italic text-slate-500">
        Baini is currently in Beta and uses an official test certificate for
        signing.
      </p>
    </form>
  );
};

export default ManifestForm;
