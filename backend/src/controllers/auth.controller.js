import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import { sendVerificationEmail, generateVerificationToken } from "../lib/emailService.js";

export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 chracters!" });
        }

        const user = await User.findOne({ email })

        if (user) return res.status(400).json({ message: "Email already exists!" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const verificationToken = generateVerificationToken();

        const newUser = User({
            fullname,
            email,
            password: hashedPassword,
            emailVerificationToken: verificationToken,
            isEmailVerified: false
        });

        if (newUser) {
            await newUser.save();
            
            // Send verification email
            await sendVerificationEmail(email, verificationToken);

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic,
                isEmailVerified: newUser.isEmailVerified,
                message: "Account created successfully! Please check your email to verify your account."
            });
        } else {
            return res.status(400).json({ message: "Invalid data!" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        
        const user = await User.findOne({ 
            emailVerificationToken: token,
            emailVerificationTokenExpires: { $gt: new Date() }
        });
        
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification token!" });
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationTokenExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Email verified successfully! You can now login." });
    } catch (error) {
        console.log("Error in verifyEmail controller", error.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

export const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({ message: "Email is already verified!" });
        }

        const verificationToken = generateVerificationToken();
        user.emailVerificationToken = verificationToken;
        await user.save();

        await sendVerificationEmail(email, verificationToken);

        res.status(200).json({ message: "Verification email sent successfully!" });
    } catch (error) {
        console.log("Error in resendVerificationEmail controller", error.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials!" });
        }

        if (!user.isEmailVerified) {
            return res.status(400).json({ 
                message: "Please verify your email before logging in.",
                requiresVerification: true 
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials!" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilePic: user.profilePic,
            isEmailVerified: user.isEmailVerified,
        });
    } catch (error) {
        console.log("Error in login controller! ", error.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
        console.log("Error in logout controller!");
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic required." });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in update profile", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller.", error.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};