import { connect } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

connect()

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token);

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}

// /api/users/forgotpassword
export async function POST_forgotpassword(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }
        // Generate token
        const token = crypto.randomBytes(32).toString("hex");
        user.forgotPasswordToken = token;
        user.forgotPasswordTokenExpiry = Date.now() + 3600000; // 1 hour
        await user.save();
        // Send email
        await sendEmail({
            email,
            emailType: "RESET",
            userId: user._id,
            token,
        });
        return NextResponse.json({ message: "Reset email sent", success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// /api/users/resetpassword
export async function POST_resetpassword(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, password } = reqBody;
        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }
        // Hash new password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({ message: "Password reset successful", success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}