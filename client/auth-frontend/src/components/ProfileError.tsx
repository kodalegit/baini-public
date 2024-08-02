import { Link } from "react-router-dom";

function ProfileError() {
  return (
    <div className="flex h-2/3 items-center justify-center">
      <div>
        <h1 className="mb-1 text-xl font-bold text-emerald-700">404</h1>
        <p className="mb-3 text-5xl font-bold text-slate-800 dark:text-slate-200">
          Page not found
        </p>
        <p className="mb-6 text-slate-600">
          Error loading profile. Sign in and try again.
        </p>
        <div>
          <Link to={"/"} className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-3 stroke-emerald-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span className="ml-1 font-semibold text-emerald-800">
              Back to home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileError;
