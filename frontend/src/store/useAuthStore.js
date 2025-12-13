import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            
            // Don't set authUser or connect socket for unverified users
            // The success message will be shown in the SignUpPage component
            return { success: true, data: res.data };
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong during signup");
            }
            return { success: false, error: error.response?.data };
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            
            // Check if email is not verified
            if (res.data.requiresVerification) {
                toast.error("Please verify your email before logging in.");
                return { success: false, requiresVerification: true };
            }
            
            set({ authUser: res.data });
            toast.success("Logged in successfully");
            get().connectSocket();
            return { success: true };
        } catch (error) {
            if (error.response?.data?.message) {
                // Handle email verification error specifically
                if (error.response.data.requiresVerification) {
                    toast.error("Please verify your email before logging in.");
                    return { success: false, requiresVerification: true };
                }
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong during login");
            }
            return { success: false };
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response?.data?.message || "Profile update failed");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    verifyEmail: async (token) => {
        try {
            const res = await axiosInstance.get(`/auth/verify-email/${token}`);
            toast.success(res.data.message || "Email verified successfully!");
            return { success: true };
        } catch (error) {
            toast.error(error.response?.data?.message || "Email verification failed");
            return { success: false };
        }
    },

    resendVerificationEmail: async (email) => {
        try {
            const res = await axiosInstance.post("/auth/resend-verification", { email });
            toast.success(res.data.message || "Verification email sent successfully!");
            return { success: true };
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to resend verification email");
            return { success: false };
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });
        socket.connect();

        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },
    
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    }
}));