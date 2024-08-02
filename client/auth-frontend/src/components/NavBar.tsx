import { useAuth } from "../auth/ContextProvider";
import { logOut } from "../auth/firebase";
import { useNavigate, Link } from "react-router-dom";
import SignUpModal from "./SignUpModal";

function NavBar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="navbar shadow-sm">
      <div className="flex-1">
        <Link to="/">
          <div className="flex items-center pl-2">
            <img src="apple-touch-icon.png" width={50} height={50} alt="Icon" />
            <p className="font-satisfy text-3xl font-extrabold text-slate-900 dark:text-slate-300">
              Baini
            </p>
          </div>
        </Link>
      </div>
      {currentUser ? (
        <div className="flex-none pr-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost"
            >
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={currentUser.photoURL ?? ""} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <Link
                  className="justify-between"
                  to={`/profile/${currentUser.uid}`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <a>
                  <button
                    className="bg-transparent"
                    onClick={() => {
                      logOut().then(() => {
                        navigate("/");
                      });
                    }}
                  >
                    Sign Out
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbar-end">
          <SignUpModal />
        </div>
      )}
    </div>
  );
}

export default NavBar;
