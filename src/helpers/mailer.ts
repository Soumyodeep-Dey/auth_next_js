import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({ email, emailType, userId, token }: any) => {
    try {
        let hashedToken;
        if (emailType === "VERIFY") {
            hashedToken = await bcryptjs.hash(userId.toString(), 10);
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            hashedToken = token; // token is already hashed and saved in the API route
            // Don't update user here, already done in API
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_TRAP_USER?.toString(),
                pass: process.env.MAIL_TRAP_PASS?.toString()
            }
        } as any);

        const linkPath = emailType === "VERIFY" ? "/verifyemail" : "/resetpassword";
        const linkToken = emailType === "VERIFY" ? hashedToken : token;
        let mailOptions;
        if (emailType === "PASSWORD_CHANGED") {
            mailOptions = {
                from: 'next_js_admit@nextjs.com',
                to: email,
                subject: "Your password was changed",
                html: `<p>Your password was successfully changed. If you did not perform this action, please contact support immediately.</p>`
            };
        } else {
            mailOptions = {
                from: 'next_js_admit@nextjs.com',
                to: email,
                subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
                html: `<p>Click <a href="${process.env.DOMAIN}${linkPath}?token=${linkToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                or copy and paste the link below in your browser. 
                <br> ${process.env.DOMAIN}${linkPath}?token=${linkToken}
                </p>`
            }
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}