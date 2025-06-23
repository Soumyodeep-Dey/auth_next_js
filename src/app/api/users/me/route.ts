import getDataFromToken from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/db/dbConfig";

connect();

export async function GET(req: NextRequest) {
    try {
        // Extract token from cookies
        const token = req.cookies.get("token")?.value || "";
        const userId = getDataFromToken(token);
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const user = await User.findById(userId).select("-password");

        return NextResponse.json({
            message: "User data retrieved successfully",
            user: user,
            status: 200
        });

    } catch (error: unknown) {
        let message = 'An unknown error occurred';
        if (error instanceof Error) {
            message = error.message;
        }
        return NextResponse.json({ message: message }, { status: 500 });
    }
};