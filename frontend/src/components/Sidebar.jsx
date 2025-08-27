import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users ,Search, Radio} from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = (showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users
  ).filter(user => 
    user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 bg-white flex flex-col border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 hidden lg:flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="hidden lg:block">Contacts</span>
          </h2>
          <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
            {onlineUsers.length - 1} online
          </span>
        </div>

        {/* Search bar - hidden on small screens */}
        <div className="relative mb-3 hidden lg:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Online toggle - hidden on small screens */}
        <label className="hidden lg:flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <div className="relative inline-flex items-center">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-9 h-5 rounded-full ${showOnlineOnly ? 'bg-primary' : 'bg-gray-300'} transition-colors`}></div>
            <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${showOnlineOnly ? 'transform translate-x-4' : ''}`}></div>
          </div>
          <span>Show online only</span>
        </label>
      </div>

      {/* Users list */}
      <div className="flex-1 overflow-y-auto py-2 px-2">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center p-3 rounded-xl cursor-pointer transition-all mb-1
              ${selectedUser?._id === user._id 
                ? "bg-primary/10 border border-primary/20" 
                : "hover:bg-gray-50"
              }`}
          >
            <div className="relative flex-shrink-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>

            <div className="ml-3 min-w-0 flex-1 hidden lg:block">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {user.fullname}
                </h3>
              </div>
              <div className="flex items-center">
                {onlineUsers.includes(user._id) ? (
                  <>
                    <p className="text-xs text-gray-500">Online</p>
                  </>
                ) : (
                  <p className="text-xs text-gray-500">Offline</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 hidden lg:block">
            <Radio className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">
              {searchQuery ? "No contacts found" : "No online users"}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;