import { CreativeWorkData } from "../types/types";

function ProfileCreativeWork({ data }: { data: CreativeWorkData }) {
  return (
    <div className="my-4">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Creative Work
      </h4>
      <p>
        <span className="font-semibold">Author:</span>{" "}
        {data.author.map((person, index) => (
          <span key={index}>
            {person.name}
            {index < data.author.length - 1 && ", "}
          </span>
        ))}
      </p>
      {data.datePublished && (
        <p>
          <span className="font-semibold">Date Published: </span>{" "}
          {data.datePublished}
        </p>
      )}
    </div>
  );
}

export default ProfileCreativeWork;
