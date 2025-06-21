import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/db/dbConfig";

connect();
export async function GET(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req);
        const user = await User.findById(userId).select("-password");

        return NextResponse.json({
            message: "User data retrieved successfully",
            user: user,
            status: 200
        });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};