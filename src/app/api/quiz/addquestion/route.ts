import { NextResponse, NextRequest } from "next/server";
import { QuestionModel } from "@/lib/models/question";
import { QuizModel } from "@/lib/models/quiz";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("🚀 ~ POST ~ body:", body);
  try {
    const { questions, quizId } = body;
    const newQuestion = await QuestionModel.insertMany(questions);
    const ids = newQuestion.map((item) => item._id);
    await QuizModel.findByIdAndUpdate(quizId, {
      $push: { questions: { $each: ids } },
    });
    return NextResponse.json({payload:newQuestion});
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
