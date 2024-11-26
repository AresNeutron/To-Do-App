"use client";
import React, { createContext, useContext, useState } from "react";

export interface TaskInterface extends Document {
  _id?: string;
  name: string;
  description: string;
  date: Date;
  important?: boolean;
  completed?: boolean;
}

interface ContextInterface {
  taskList: TaskInterface[];
  setTaskList: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
  fetchAll: () => Promise<void>;
  updateTask: (
    updatedTask: TaskInterface,
    id: string | undefined
  ) => Promise<void>;
  deleteTask: (id: string | undefined) => Promise<void>;
}

export const Context = createContext<ContextInterface | undefined>(undefined);

//COMPONENTE
function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [taskList, setTaskList] = useState<TaskInterface[]>([]);

  const fetchAll = async () => {
    try {
      const res = await fetch("/api/routers/getAll");
      if (!res.ok) {
        throw new Error("Error Fetching Data");
      }
      const data = await res.json();
      console.log("Response:", data);
      setTaskList(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async (
    updatedTask: TaskInterface,
    id: string | undefined
  ) => {
    try {
      const res = await fetch(`/api/routers/set/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (res.ok) {
        setTaskList((prev) =>
          prev.map((el) => {
            if (el._id === id) {
              return updatedTask;
            } else {
              return el;
            }
          })
        );
      } else {
        console.error("Failed to update task");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id: string | undefined) => {
    if (id) {
      console.log("Deleting task with ID:", id); // Debug log
    } else {
      console.log("No ID provided"); // Debug log
      return;
    }
    try {
      const res = await fetch(`/api/routers/${id}`, {
        method: "DELETE",
      });
      console.log(res)

      if (res.ok) {
        setTaskList((prev) => prev.filter((el) => el._id !== id));
      } else {
        console.log("Failed to delete task");
      }
    } catch (err) {
      console.error("Error deleting task", err)
    }
  };

  return (
    <Context.Provider
      value={{
        taskList,
        setTaskList,
        fetchAll,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </Context.Provider>
  );
}
//COMPONENTE

export default AppContextProvider;

export const useTaskContext = () => {
  const context = useContext<ContextInterface | undefined>(Context);
  if (!context) {
    throw new Error("DisplayTask must be used within a AppContext Provider");
  }
  return context;
};
