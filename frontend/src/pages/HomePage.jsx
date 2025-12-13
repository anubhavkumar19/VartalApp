import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import EmailVerificationAlert from "../components/EmailVerificationAlert";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  return (
    <div className="h-screen bg-base-200 ">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          {/* Email Verification Alert for unverified users */}
          {authUser && !authUser.isEmailVerified && (
            <div className="p-4 border-b border-base-300">
              <EmailVerificationAlert />
            </div>
          )}
          
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;