import { useRouteError, Link } from "react-router-dom";

function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);
  return (
    <div className="bg-gradient-to-br from-slate-200 to-slate-400">
      <div className="flex min-h-screen flex-col">
        <main className="flex flex-1 items-center overflow-auto">
          <div className="w-full max-w-4xl p-4">
            <h1 className="mb-1 text-xl font-bold text-emerald-700">404</h1>
            <p className="mb-3 text-5xl font-bold text-slate-800 dark:text-slate-200">
              Page not found
            </p>
            <p className="mb-6 text-slate-600">
              Sorry, we couldn't find the page you're looking for.
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
            {/* <p>
              <i>{error.statusText || error.message}</i>
            </p> */}
          </div>
        </main>
        <footer className="footer footer-center p-4 text-base-content shadow">
          <div className="flex w-full justify-between">
            <p className="font-lato text-slate-500">
              &copy; 2024 Baini. All rights reserved.
            </p>

            <div className="flex gap-4 text-slate-500">
              <a href="mailto:victorkimani77@gmail.com">
                <svg
                  className="size-6 fill-slate-500 hover:fill-slate-700"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title />
                  <g
                    data-name="mail email e-mail letter"
                    id="mail_email_e-mail_letter"
                  >
                    <path d="M28,13a1,1,0,0,0-1,1v8a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V14a1,1,0,0,0-2,0v8a3,3,0,0,0,.88,2.12A3,3,0,0,0,6,25H26a3,3,0,0,0,2.12-.88A3,3,0,0,0,29,22V14A1,1,0,0,0,28,13Z" />
                    <path d="M15.4,18.8a1,1,0,0,0,1.2,0L28.41,9.94a1,1,0,0,0,.3-1.23,3.06,3.06,0,0,0-.59-.83A3,3,0,0,0,26,7H6a3,3,0,0,0-2.12.88,3.06,3.06,0,0,0-.59.83,1,1,0,0,0,.3,1.23ZM6,9H26a.9.9,0,0,1,.28,0L16,16.75,5.72,9A.9.9,0,0,1,6,9Z" />
                  </g>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/victorkimani77/">
                <svg
                  className="size-6 fill-slate-500 hover:fill-slate-700"
                  style={{
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 2,
                  }}
                  version="1.1"
                  viewBox="0 0 512 512"
                  width="100%"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <path d="M256,0c141.29,0 256,114.71 256,256c0,141.29 -114.71,256 -256,256c-141.29,0 -256,-114.71 -256,-256c0,-141.29 114.71,-256 256,-256Zm-80.037,399.871l0,-199.921l-66.464,0l0,199.921l66.464,0Zm239.62,0l0,-114.646c0,-61.409 -32.787,-89.976 -76.509,-89.976c-35.255,0 -51.047,19.389 -59.889,33.007l0,-28.306l-66.447,0c0.881,18.757 0,199.921 0,199.921l66.446,0l0,-111.65c0,-5.976 0.43,-11.95 2.191,-16.221c4.795,-11.935 15.737,-24.299 34.095,-24.299c24.034,0 33.663,18.34 33.663,45.204l0,106.966l66.45,0Zm-272.403,-296.321c-22.74,0 -37.597,14.95 -37.597,34.545c0,19.182 14.405,34.544 36.717,34.544l0.429,0c23.175,0 37.6,-15.362 37.6,-34.544c-0.43,-19.595 -14.424,-34.545 -37.149,-34.545Z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ErrorPage;
