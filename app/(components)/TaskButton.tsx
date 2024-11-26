"use client";

import { useRouter } from 'next/navigation';
// Formulario para agregar una nueva tarea (client-side)
import { useCallback, useEffect, useState } from "react";
import { useTaskContext } from './AppContext';

const TaskButton = () => {
  const {fetchAll} = useTaskContext()
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [important, setImportant] = useState<boolean>(false);
  const router = useRouter()

  const cancelSubmit=()=>{
    setIsAdding(false)
    setName('')
    setDescription('')
    setCompleted(false)
    setImportant(false)
  }

  const handleSubmit = useCallback(
    async () => {
      setIsAdding(false)
  
      const newTask = {
        name,
        description,
        date: new Date(), // La fecha actual
        important,
        completed,
      };
  
      try {
        const response = await fetch("/api/routers/set/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
  
        if (response.ok) {
          console.log("Task added successfully");
        } else {
          console.error("Failed to add task");
        }
      } catch (error) {
        console.error("Error:", error);
      }
  
      setName('')
      setDescription('')
      setCompleted(false)
      setImportant(false)
      fetchAll()
      router.refresh()
    },[completed,description, fetchAll, important, name, router]
  )

  // Use effect to handle key events
   useEffect(() => {
  if (isAdding) {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // Cancel editing on "Escape"
        cancelSubmit()
      } else if (event.key === "Enter") {
        // Sumbit task on "Enter"
        handleSubmit()
      }
    };

    // Add event listener when editing starts
    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when editing stops
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }
}, [isAdding, name, description, completed, handleSubmit]);
  
  return (
    <div className="taskSquare w-full h-full shadow-lg rounded-lg p-4 flex flex-col justify-center items-center">
  {isAdding ? (
    <form className="space-y-2 flex flex-col w-full">
      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setName(event.target.value)
        }
        required
        className="inputElement"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(event.target.value)
        }
        required
        className="inputElement"
      />
      <div className="flex justify-between">
      <label className="flex items-center space-x-2 text-sm text-white">
        <input
          type="checkbox"
          checked={completed}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCompleted(event.target.checked)
          }
          className="form-checkbox h-4 w-4"
        />
        <span>Completed</span>
      </label>
      <label className="flex items-center space-x-2 text-sm text-white">
        <input
          type="checkbox"
          checked={important}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setImportant(event.target.checked)
          }
          className="form-checkbox h-4 w-4"
        />
        <span>Important</span>
      </label>
      </div>
      <div className="flex space-x-2 justify-between">
        <button
          onClick={handleSubmit}
          className="inputButton"
        >
          Add Task
        </button>
        <button
          type="button"
          onClick={() => cancelSubmit()}
          className="inputButton"
        >
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <button
      onClick={() => {
        setIsAdding(true);
      }}
      className="w-full h-full bg-tertiary text-white font-bold py-1 px-2 rounded hover:bg-tertiaryHover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Add New Task
    </button>
  )}
</div>

  );
};

export default TaskButton;
