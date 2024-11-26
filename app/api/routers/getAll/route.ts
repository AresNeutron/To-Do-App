import { NextResponse } from "next/server";
import connectToDB from "../..";
import TaskModel from "../../models/TaskModel";

export const GET = async () => {
  try {
    await connectToDB();
    const tasks = await TaskModel.find();
    return NextResponse.json(
      tasks,
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Failure", error: err },
      { status: 500 }
    );
  }
};
