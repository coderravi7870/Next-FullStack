import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect();


export const POST= async (request: NextRequest)=>{
    try {
        
        const reqBody =await request.json();

        const {newPassword,confirmPassword,token} = reqBody;

        const user = await User.findOne({forgotPasswordToken: token});
    
        if(!user){
            return NextResponse.json({
                error: "User not found"
            },{status:400});
        }

        if(newPassword !== confirmPassword){
            return NextResponse.json({
                message: "Not both equal"
            },{status:400});
            
        }
        // create hashed password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(confirmPassword, salt);

        user.password = hashedPassword;

        await user.save();
        return NextResponse.json({
            success: true,
            message: "Password successfully Reset",
        })
        
    } catch (error:any) {
        console.log(error.message);

        return NextResponse.json({
            error: error.message
        },{status:400});
        
    }
}