import { MessagesSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex flex-col overflow-auto items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="text-center max-w-md mx-auto">
        {/* Animated icon container */}
        <div className="relative mb-8">
          <div className="absolute -inset-4 bg-primary/10 rounded-full blur-lg animate-pulse"></div>
          <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-primary/10">
            <MessagesSquare className="w-16 h-16 text-primary mx-auto" />
          </div>
        </div>

        {/* Text content */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Start a Conversation
        </h2>
        <p className="text-gray-600 mb-8">
          Select a chat from the sidebar or start a new conversation to begin messaging.
        </p>

        {/* Decorative elements */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;