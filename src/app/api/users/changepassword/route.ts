import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { oldPassword, newPassword } = reqBody;
        // Get user ID from JWT in cookies
        const userId = getDataFromToken(request);
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        // Check if old password matches
        const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user.password);
        if (!isOldPasswordMatch) {
            return NextResponse.json({ error: "Old password is incorrect" }, { status: 400 });
        }
        // Hash new password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(newPassword, salt);
        await user.save();
        // Send notification email
        await sendEmail({
            email: user.email,
            emailType: "PASSWORD_CHANGED",
            userId: user._id
        });
        return NextResponse.json({ message: "Password changed successfully", success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
} 