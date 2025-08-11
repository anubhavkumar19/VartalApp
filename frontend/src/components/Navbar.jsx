import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessagesSquare, Settings, CircleUserRound } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100 border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
      style={{ backgroundColor: "#F0A04B", color: "black" }}>
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessagesSquare className="w-10 h-10" style={{ color: "#FADA7A" }} />
              </div>
              <h1 className="text-lg font-bold" >VartalApp</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              `}
              style={{ backgroundColor: "#f8df83", border: "2px #f9b062", color: "black" }}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}
                  style={{ backgroundColor: "#f8df83", border: "2px #f9b062", color: "black" }}> {/*Style*/}

                  <CircleUserRound className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center btn btn-sm" onClick={logout}
                  style={{ backgroundColor: "#f8df83", border: "2px #f9b062", color: "black" }}> {/*Style*/}
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
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