import { useAuth } from "../auth/ContextProvider";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { updateDisplayName } from "@/auth/firebase";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { deleteAccount, freshSignIn, revalidateUser } from "@/auth/firebase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function UpdateProfile() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  let navigate = useNavigate();
  const [newName, setNewName] = useState(`${currentUser?.displayName}`);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateDisplayName(newName)
      .then(() => {
        toast({
          description: "Update successful.",
        });
        navigate(`/profile/${currentUser?.uid}`);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          description: "There was a problem with your request. Try again.",
        });
        console.error(error);
      });
  };

  const deleteUser = async () => {
    try {
      await deleteAccount();
      navigate("/");
    } catch {
      try {
        const credential = await freshSignIn();
        if (credential) {
          await revalidateUser(credential);
        }
      } catch (authErr) {
        console.error(authErr);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            "Error deleting account. For security reasons, make sure you've recently signed in and try again.",
        });
      }
    }
  };
  return (
    <>
      {currentUser ? (
        <div className="flex flex-col gap-4">
          <div>
            <Link
              to={`/profile/${currentUser.uid}`}
              className="flex items-center"
            >
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
              <span className="ml-1 font-semibold text-emerald-800">Back</span>
            </Link>
          </div>
          <div className="h-14 w-14 overflow-hidden rounded-full">
            <img alt="User Avatar" src={currentUser.photoURL ?? ""} />
          </div>
          <div>
            <p className="font-raleway text-2xl font-bold text-slate-800 dark:text-slate-200">
              {currentUser.displayName}
            </p>
            <p className="mt-1 text-slate-500">{currentUser.email}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <fieldset className="space-y-3">
              <label
                htmlFor="displayName"
                className="text-sm font-semibold text-slate-800 dark:text-slate-200"
              >
                Change Display Name
              </label>
              <Input
                type="text"
                placeholder="Display Name"
                name="displayName"
                className="w-3/4 text-slate-800"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <Button type="submit">Save changes</Button>
            </fieldset>
          </form>
          <Separator className="my-4" />
          <div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-slate-700">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={deleteUser}
                    className="bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}

export default UpdateProfile;
