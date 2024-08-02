import { ActionData } from "../types/types";
import { sourceInformation } from "../utils/utils";

function ProfileCreatedAction({ data }: { data: ActionData }) {
  return (
    <div className="my-4">
      <h4 className="scroll-m-20 text-xl font-semibold">Actions</h4>
      {data.actions.map(
        (actionObj, index) =>
          actionObj.action === "c2pa.created" && (
            <div key={index}>
              {actionObj.softwareAgent && (
                <p>
                  <span className="font-semibold">Asset created by: </span>
                  {actionObj.softwareAgent}
                </p>
              )}

              {actionObj.digitalSourceType && (
                <p>
                  <span className="font-semibold">Digital Source Type: </span>
                  {sourceInformation(actionObj.digitalSourceType)[0]}
                </p>
              )}
              {!actionObj.softwareAgent && !actionObj.digitalSourceType && (
                <p>No actions</p>
              )}
            </div>
          ),
      )}
    </div>
  );
}

export default ProfileCreatedAction;
