import { Manifest } from "c2pa";
import { sourceInformation, actionInformation } from "../utils/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const ActionComponent = ({ manifest }: { manifest: Manifest }) => {
  const assertions = manifest.assertions;
  const actionsArray = assertions.get("c2pa.actions");

  return (
    <div className="my-4">
      {actionsArray && (
        <div>
          <div className="flex">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Actions
            </h4>
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
                  Actions provide information about creation, edits, and other
                  things that have occurred to an asset.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
          <ul>
            {actionsArray.map((assertionObject, index) => (
              <li className="flex gap-2" key={index}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                  />
                </svg>
                {assertionObject?.data.actions.map((actionV1, innerIndex) => (
                  <div key={innerIndex}>
                    {actionInformation(actionV1.action).map(
                      (actionInfo, index) => (
                        <div key={index}>
                          <p className="scroll-m-20 text-lg font-semibold tracking-tight">
                            {index === 0 ? actionInfo : null}
                          </p>
                          {index !== 0 && <p>{actionInfo}</p>}
                        </div>
                      ),
                    )}
                    <div>
                      {actionV1.digitalSourceType && (
                        <p className="scroll-m-20 text-lg font-semibold tracking-tight">
                          Content Summary
                        </p>
                      )}
                      {actionV1.digitalSourceType &&
                        sourceInformation(actionV1.digitalSourceType).map(
                          (sourceInfo, index) => (
                            <div key={index}>
                              <p>
                                <span className="font-semibold">
                                  {index === 0 ? sourceInfo : null}
                                </span>
                                {index !== 0 && <span>{sourceInfo}</span>}
                              </p>
                            </div>
                          ),
                        )}
                    </div>
                    <div>
                      {actionV1.softwareAgent && (
                        <div>
                          <p className="scroll-m-20 text-lg font-semibold tracking-tight">
                            Software/Hardware Used
                          </p>
                          <p>{actionV1.softwareAgent}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActionComponent;
