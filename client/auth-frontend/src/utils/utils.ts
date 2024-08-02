export const actionInformation = (action: string) => {
  switch (action) {
    case "c2pa.color_adjustments":
      return [
        "Color adjustments",
        "Adjusted properties like tone, saturation, etc",
      ];
    case "c2pa.converted":
      return ["Format Conversion", "The format of the asset was changed"];
    case "c2pa.created":
      return ["Created", "Created a new file or content"];
    case "c2pa.cropped":
      return ["Cropped", "Areas of the asset’s content were cropped out"];
    case "c2pa.drawing":
      return [
        "Drawing",
        "Changes using drawing tools including brushes or eraser were made",
      ];
    case "c2pa.edited":
      return ["Edited", "Editorial transformations were made on the content"];
    case "c2pa.filtered":
      return [
        "Filtered",
        "Appearance of the content was changed using filters, styles, etc",
      ];
    case "c2pa.opened":
      return ["Opened", "Opened a pre-existing file"];
    case "c2pa.orientation":
      return ["Orientation", "Orientation was changed"];
    case "c2pa.placed":
      return ["Placed", "Added a file into the asset"];
    case "c2pa.published":
      return ["Published", "Asset was released to wider audience"];
    case "c2pa.redacted":
      return [
        "Redacted",
        "One or more assertions or W3C verifiable credentials were redacted",
      ];
    case "c2pa.removed":
      return ["Removed", "A file was removed"];
    case "c2pa.repackaged":
      return ["Repackaged", "Packaging format of file was changed"];
    case "c2pa.resized":
      return ["Resized", "File dimensions/size were changed"];
    case "c2pa.transcoded":
      return ["Transcoded", "File encoding was changed"];
    case "c2pa.unknown":
      return ["Unknown", "An unknown change occurred on the asset"];
    default:
      return ["", "No information available for this action."];
  }
};

export const sourceInformation = (
  digitalSourceType: string | undefined
): string[] => {
  if (!digitalSourceType) {
    return ["", ""];
  }

  const code = digitalSourceType.replace(
    "http://cv.iptc.org/newscodes/digitalsourcetype/",
    ""
  );
  switch (code) {
    case "algorithmicallyEnhanced":
      return [
        "Algorithmically Enhanced",
        "Minor augmentation or correction by algorithm",
      ];
    case "algorithmicMedia":
      return [
        "Algorithmic Media",
        "Media created purely by an algorithm not based on any sampled training data",
      ];
    case "compositeCapture":
      return [
        "Composite Capture",
        "Mix or composite of several elements that are all captures of real life",
      ];
    case "compositeSynthetic":
      return [
        "Composite Synthetic",
        "Mix or composite of several elements, at least one of which is synthetic",
      ];
    case "compositeWithTrainedAlgorithmicMedia":
      return [
        "Composite of one or more Generative AI elements",
        "Containes one or more elements that were created by generative AI tools",
      ];
    case "dataDrivenMedia":
      return [
        "Data Driven Media",
        "Digital media representation of data via human programming or creativity",
      ];
    case "digitalArt":
      return ["Digital Art", "Media created by a human using digital tools"];
    case "digitalCapture":
      return [
        "Digital Capture",
        "The digital media is captured from a real-life source using a digital recording device",
      ];
    case "minorHumanEdits":
      return [
        "Minor Human Edits",
        "Minor augmentation or correction by a human",
      ];
    case "negativeFilm":
      return [
        "Negative Film",
        "The digital image was digitized from a negative",
      ];
    case "positiveFilm":
      return [
        "Positive Film",
        "The digital image was digitized from a positive",
      ];
    case "print":
      return [
        "Print",
        "The digital image was digitized from an image printed on a non-transparent medium",
      ];
    case "softwareImage":
      return [
        "Positive Film",
        "The digital image was created by computer software",
      ];
    case "trainedAlgorithmicMedia":
      return [
        "Created Using Generative AI",
        "Asset was created using Generative AI tools",
      ];
    case "virtualRecording":
      return [
        "Virtual Recording",
        "Live recording of virtual event based on synthetic and optionally captured elements",
      ];

    default:
      return ["", "Information on asset source is unknown"];
  }
};
