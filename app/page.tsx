"use client"
import { useEffect} from "react";
import { useTaskContext } from "./(components)/AppContext";
import DisplayTask from "./(components)/DisplayTask";
import TaskButton from "./(components)/TaskButton";

export default function Home() {
  const {taskList,fetchAll} = useTaskContext()

  useEffect(()=>{
    fetchAll()
  },[])

  return (
    <div className="w-full h-full mb-2">
      <div className="w-full" style={{ height: "5%", marginTop: "-10px" }}>
        <h1 className="text-center mt-4 mb-2">All Tasks</h1>
      </div>
      <div className="bigSquare">
        {taskList.map((element,index)=>{
          return (<DisplayTask key={index} element={element}/>)
        })}
        <div className="taskSquare">
          <TaskButton />
        </div>
      </div>
    </div>
  );
}
