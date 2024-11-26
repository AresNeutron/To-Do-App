"use client"
import { useTaskContext } from "@/app/(components)/AppContext";
import DisplayTask from "@/app/(components)/DisplayTask";
import TaskButton from "@/app/(components)/TaskButton";
import { useEffect} from "react";

export default function ToDo() {
  const {taskList,fetchAll} = useTaskContext()

  useEffect(()=>{
    fetchAll()
  },[])

  return (
    <div className="w-full h-full mb-2">
      <div className="w-full" style={{ height: "5%", marginTop: "-10px" }}>
        <h1 className="text-center mt-4 mb-2">To Do</h1>
      </div>
      <div className="bigSquare">
        {taskList.map((element,index)=>{
          if(element.completed==false) return (<DisplayTask key={index} element={element}/>)
        })}
        <div className="taskSquare">
          <TaskButton />
        </div>
      </div>
    </div>
  );
}