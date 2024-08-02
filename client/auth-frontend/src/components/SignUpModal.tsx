import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GoogleSignInBtn from "./GoogleSignInBtn";
import { Button } from "@/components/ui/button";

function SignUpModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent className="text-slate-800 dark:text-slate-100">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Continue with Google to start signing images.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <GoogleSignInBtn />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SignUpModal;
