import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern.jsx";

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuthStore();
  
  const [verificationStatus, setVerificationStatus] = useState("verifying"); // verifying, success, error
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setVerificationStatus("error");
        return;
      }

      try {
        const result = await verifyEmail(token);
        setVerificationStatus(result.success ? "success" : "error");
        
        // Redirect to login after successful verification
        if (result.success) {
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } catch (error) {
        setVerificationStatus("error");
      }
    };

    verifyToken();
  }, [token, verifyEmail, navigate]);

  const handleResendEmail = async () => {
    setIsResending(true);
    // You might want to get the email from somewhere (localStorage, query params, etc.)
    // For now, we'll just show a message to sign up again
    setIsResending(false);
    navigate("/signup");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <AuthImagePattern
        title="Verify Your Email"
        subtitle="Securely verify your email address to access your account"
      />

      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 text-center">
          {verificationStatus === "verifying" && (
            <>
              <div className="flex justify-center">
                <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Loader2 className="size-10 text-primary animate-spin" />
                </div>
              </div>
              <h1 className="text-2xl font-bold">Verifying Your Email</h1>
              <p className="text-base-content/70">
                Please wait while we verify your email address...
              </p>
            </>
          )}

          {verificationStatus === "success" && (
            <>
              <div className="flex justify-center">
                <div className="size-20 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle className="size-10 text-success" />
                </div>
              </div>
              <h1 className="text-2xl font-bold">Email Verified!</h1>
              <p className="text-base-content/70">
                Your email has been successfully verified. You will be redirected to the login page shortly.
              </p>
              <div className="pt-4">
                <Link to="/login" className="btn btn-primary w-full">
                  Go to Login Now
                </Link>
              </div>
            </>
          )}

          {verificationStatus === "error" && (
            <>
              <div className="flex justify-center">
                <div className="size-20 rounded-full bg-error/10 flex items-center justify-center">
                  <XCircle className="size-10 text-error" />
                </div>
              </div>
              <h1 className="text-2xl font-bold">Verification Failed</h1>
              <p className="text-base-content/70">
                The verification link is invalid or has expired.
              </p>
              
              <div className="bg-base-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-base-content/60 mb-2">
                  <strong>Need a new verification email?</strong>
                </p>
                <button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="btn btn-outline btn-sm w-full"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="size-4" />
                      Sign Up Again
                    </>
                  )}
                </button>
              </div>

              <div className="pt-4 space-y-2">
                <Link to="/signup" className="btn btn-primary w-full">
                  Create New Account
                </Link>
                <Link to="/login" className="btn btn-outline w-full">
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;