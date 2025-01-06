import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hased token
    const hasedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hasedToken,
        VerifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hasedToken,
        forgotPasswordTokenExpiry: Date.now() + 360000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b04f327b2cf869",
        pass: "e0830b78f107d8",
        //TODO: add these credentials to .env file
      },
    });

    const mailOptions = {
        from:"rks829421@gmail.com",
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/${emailType=== "VERIFY" ? "verifyemail" : "resetPassword"}?token=${hasedToken}">here</a>to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
    }

    const mailresponse = await transport.sendMail(mailOptions);
    
    return mailresponse;

  } catch (error: any) {
    throw new Error(error.message);
  }
};
