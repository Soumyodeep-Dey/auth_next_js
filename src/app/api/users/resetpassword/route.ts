import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";



export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, oldPassword, password } = reqBody;
        // Find all users with a non-expired forgotPasswordToken
        const users = await User.find({ forgotPasswordTokenExpiry: { $gt: Date.now() }, forgotPasswordToken: { $ne: null } });
        let user = null;
        for (const u of users) {
            if (await bcryptjs.compare(token, u.forgotPasswordToken)) {
                user = u;
                break;
            }
        }
        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }
        // Check if old password matches
        const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user.password);
        if (!isOldPasswordMatch) {
            return NextResponse.json({ error: "Old password is incorrect" }, { status: 400 });
        }
        // Hash new password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({ message: "Password reset successful", success: true });
    } catch (error: unknown) {
        let message = 'An unknown error occurred';
        if (error instanceof Error) {
            message = error.message;
        }
        return NextResponse.json({ error: message }, { status: 500 });
    }
} 