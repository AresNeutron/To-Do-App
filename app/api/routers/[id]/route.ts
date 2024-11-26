import { NextResponse } from "next/server";
import TaskModel from "../../models/TaskModel";
import connectToDB from "../..";

interface RouteParams {
  params: { id: string };
}

export const DELETE = async (req: Request, context: RouteParams) => {
  try {
    console.log("Delete function running");
    const id: string = context.params.id;

    if (!id) {
      console.log("No ID in the server");
      return NextResponse.json({ message: "ID not provided" }, { status: 400 });
    }

    await connectToDB();
    const deletedTask = await TaskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task Deleted", deletedTask }, { status: 200 });
  } catch (err) {
    console.error("Delete Failed:", err);
    return NextResponse.json({ message: "Delete Failed", err }, { status: 500 });
  }
};
  
