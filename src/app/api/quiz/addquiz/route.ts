import { dbConnect } from "@/lib/db/connection";
import { QuizModel } from "@/lib/models/quiz";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    await dbConnect()
  const body = await request.json();
  console.log("🚀 ~ POST ~ body:", body)
  
  const newQuiz = new QuizModel(body);
  await newQuiz.save()
  console.log("🚀 ~ POST ~ newQuiz:", newQuiz)
    return NextResponse.json({ payload: newQuiz });
}
