import { NextResponse } from "next/server";
import TaskModel from "../../../models/TaskModel";
import connectToDB from "../../..";

export const POST = async (req: Request) => {
  try {
    await connectToDB()
    const body = await req.json();
    await TaskModel.create(body); //Recuerda que esto funciona con promesas
    return NextResponse.json({message: "Task added", body}, {status: 200})
  } catch (err) {
    return NextResponse.json({message: "Insertion Failed", err}, {status: 500})
  }
};

export const PUT = async (req : Request, {params}: {params: { id: string }})=>{
  try {
    const id: string = params.id
    const body = await req.json();
    await connectToDB()
    const updatedTask = await TaskModel.findByIdAndUpdate(id, body, {new:true})
       
    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({message: "Task Updated", updatedTask}, {status: 200})
  } catch (err) {
    return NextResponse.json({message: "Update Failed", err}, {status: 500})
  }
}


