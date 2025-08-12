
import { dbConnect } from "@/lib/db/connection";
import { UserModel } from "@/lib/models/user";
import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);


dbConnect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { credential } = body;

    if (!credential) {
      return NextResponse.json(
        { error: "Google credential is required" },
        { status: 400 }
      );
    }

   
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("🚀 ~ POST ~ payload:", payload)
    

    if (!payload || !payload.email) {
      return NextResponse.json(
        { error: "Invalid Google token" },
        { status: 400 }
      );
    }

    const { email, name, picture, sub: password } = payload;
    console.log("🚀 ~ POST ~ password:", password)

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
 
    

      const userResponse = existingUser.toObject();
      delete userResponse.password;

      return NextResponse.json(
        {
          payload: userResponse,
          message: "User logged in successfully",
        },
        { status: 200 }
      );
    }

    // Create new user
    const newUser = new UserModel({
      email,
      username: name || email.split("@")[0], 
      password,
      isVerified: "google",
      isAdmin:false
      // Don't set password for Google users
    });

    await newUser.save();
    const userResponse = newUser.toObject();
    delete userResponse.password;

    return NextResponse.json(
      {
        payload: userResponse,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Google auth error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
