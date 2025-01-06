import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        // console.log("token: " + token);

        const user =await User.findOne({verifyToken: token,
            VerifyTokenExpiry:{$gt: Date.now()}
        })
        // console.log("user: " + user);

        if(!user){
            return NextResponse.json({error: "Invalid token"},{status:400})
        }


        user.isVaerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        
        return NextResponse.json({
            message:"Email verified successfully",
            success: true,
        });


    } catch (error:any) {
        return NextResponse.json({
            error: error.message
        },{status:500})
    }
}