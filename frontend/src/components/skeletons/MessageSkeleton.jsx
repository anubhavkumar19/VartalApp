const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages (3 sent, 3 received)
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white hover:scrollbar-thumb-gray-400">
      {skeletonMessages.map((_, idx) => {
        const isSent = idx % 2 !== 0; // Odd indexes are sent messages
        
        return (
          <div key={idx} className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-xs lg:max-w-md ${isSent ? "flex-row-reverse" : "flex-row"}`}>
              {/* Avatar skeleton */}
              <div className={`flex-shrink-0 ${isSent ? "ml-2" : "mr-2"}`}>
                <div className={`w-8 h-8 rounded-full animate-pulse ${
                  isSent ? "bg-primary/20" : "bg-gray-300"
                }`}></div>
              </div>
              
              {/* Message content */}
              <div className="flex flex-col">
                {/* Message bubble skeleton */}
                <div className={`
                  rounded-2xl p-3 shadow-sm
                  ${isSent 
                    ? "bg-primary/10 rounded-br-none" // Primary color for sent messages
                    : "bg-gray-100 rounded-bl-none" // Light gray for received messages
                  } animate-pulse`}
                >
                  <div className="space-y-2">
                    <div className={`h-3 rounded ${
                      isSent ? "bg-primary/30 w-32" : "bg-gray-300/70 w-28"
                    }`}></div>
                    <div className={`h-3 rounded ${
                      isSent ? "bg-primary/30 w-28" : "bg-gray-300/70 w-24"
                    }`}></div>
                    {idx % 3 === 0 && ( // Sometimes show third line
                      <div className={`h-3 rounded ${
                        isSent ? "bg-primary/30 w-24" : "bg-gray-300/70 w-20"
                      }`}></div>
                    )}
                  </div>
                </div>
                
                {/* Timestamp skeleton */}
                <div className={`mt-1.5 ${isSent ? "text-right" : "text-left"}`}>
                  <div className="h-2 w-12 bg-gray-300 rounded animate-pulse inline-block"></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;