import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";


connect();

export async function POST(request: NextRequest){

    const reqBody = await request.json();
    const {email} = reqBody;

    const user = await User.findOne({email: email});

    if(!user){
        return NextResponse.json({
            error: "User not found"
        },{status:400});
    }

    await sendEmail({email,emailType: "RESET",userId:user._id});

}