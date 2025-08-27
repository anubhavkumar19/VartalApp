import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessagesSquare, Settings, CircleUserRound, House } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 fixed w-full top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo and Brand */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessagesSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">VartalApp</h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            <Link
              to={"/"}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
            >
              <House className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Home</span>
            </Link>

            {authUser && (
              <>
                <Link 
                  to={"/profile"} 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
                >
                  <CircleUserRound className="w-5 h-5" />
                  <span className="hidden sm:inline font-medium">Profile</span>
                </Link>

                <Link
                  to={"/settings"}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span className="hidden sm:inline font-medium">Themes</span>
                </Link>

                <button 
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline font-medium">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;