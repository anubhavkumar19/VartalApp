import { AlertCircle, CheckCircle, Mail } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

const EmailVerificationAlert = () => {
  const { authUser, resendVerificationEmail } = useAuthStore();

  // Don't show if user is not logged in or email is already verified
  if (!authUser || authUser.isEmailVerified) {
    return null;
  }

  const handleResend = async () => {
    await resendVerificationEmail(authUser.email);
  };

  return (
    <div className="alert alert-warning mb-4">
      <AlertCircle className="w-5 h-5" />
      <div className="flex flex-col gap-1 flex-1">
        <span className="font-medium">Verify Your Email</span>
        <span className="text-sm">
          Please check your email ({authUser.email}) for the verification link to access all features.
        </span>
        <button
          onClick={handleResend}
          className="btn btn-outline btn-sm mt-2 w-fit"
        >
          <Mail className="w-4 h-4" />
          Resend Verification Email
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationAlert;