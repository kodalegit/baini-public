import { TrainingData, miningLabels } from "../types/types";

function ProfileTrainAssertions({ data }: { data: TrainingData }) {
  return (
    <div>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Do not train assertion
      </h4>
      {Object.entries(data.entries).map(([key, value]) => (
        <div key={key}>
          <p>
            <span className="font-semibold">
              {miningLabels[key as keyof typeof miningLabels]}:
            </span>{" "}
            {value.use === "allowed"
              ? "Allowed"
              : value.use === "notAllowed"
              ? "Not Allowed"
              : "Constrained"}
            {value.constraint_info && (
              <span className="italic"> - {value.constraint_info}</span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProfileTrainAssertions;
