import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import crypto from "crypto";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }
        // Generate random token and hash it
        const token = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcryptjs.hash(token, 10);
        user.forgotPasswordToken = hashedToken;
        user.forgotPasswordTokenExpiry = Date.now() + 3600000; // 1 hour
        await user.save();
        // Send email with the plain token
        await sendEmail({
            email,
            emailType: "RESET",
            userId: user._id,
            token,
        });
        return NextResponse.json({ message: "Reset email sent", success: true });
    } catch (error: unknown) {
        let message = 'An unknown error occurred';
        if (error instanceof Error) {
            message = error.message;
        }
        return NextResponse.json({ error: message }, { status: 500 });
    }
} 