import {connect} from "@/db/dbConfig";
import { NextRequest , NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
 

connect();

export async function POST(request: NextRequest) {
    try {

        // Parse the request body
        const reqBody = await request.json();

        // getting the data from the request body
        const { username, email, password } = reqBody;
        console.log("Received data:", reqBody);

        console.log(reqBody);
        
        // Validate input
        if (!username || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if user already exists
        const user = await User.findOne({ email: email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        console.log("User created:", savedUser);

        // Send verification email
        await sendEmail({
            email,
            emailType: "VERIFY",
            userId: savedUser._id
        });

        // Respond with success

        return NextResponse.json({ 
            message: "User created successfully",
            success : true,
            status: 201,
            savedUser
        });

        
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}