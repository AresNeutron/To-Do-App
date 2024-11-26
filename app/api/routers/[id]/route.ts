import { NextResponse } from "next/server";
import TaskModel from "../../models/TaskModel";
import connectToDB from "../..";

// DELETE handler for removing tasks by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("Delete function running");

    // Extract ID from params
    const id = params.id;
    if (!id) {
      console.log("No ID provided");
      return NextResponse.json({ message: "ID not provided" }, { status: 400 });
    }

    // Connect to MongoDB
    await connectToDB();

    // Attempt to delete the task
    const deletedTask = await TaskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Task Deleted", deletedTask },
      { status: 200 }
    );
  } catch (err) {
    console.error("Delete Failed:", err);
    return NextResponse.json({ message: "Delete Failed", error: err }, { status: 500 });
  }
}
  
