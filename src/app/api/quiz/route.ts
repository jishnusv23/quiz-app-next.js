import { QuizModel } from "@/lib/models/quiz";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const payload = await QuizModel.find();
    return NextResponse.json({ payload });
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const deleteQuery = await QuizModel.findByIdAndDelete(id);
    return NextResponse.json("succesfully deleted");
  } catch (error: any) {
     return NextResponse.json(
       { error: "Internal Server Error" },
       { status: 500 }
     );
    throw new Error(error?.message);
  }
}
