"use client";
import React, { useState, useEffect} from "react";
import { TaskInterface, useTaskContext } from "./AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faX } from "@fortawesome/free-solid-svg-icons";

function DisplayTask({ element }: { element: TaskInterface }) {
  const { deleteTask, updateTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);

  // Use effect to handle key events
  useEffect(() => {
    if (isEditing) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          // Cancel editing on "Escape"
          setDescription(element.description || "");
          setCompleted(element.completed || false);
          setIsEditing(false);
        } else if (event.key === "Enter") {
          // Update task on "Enter"
          updateTask(
            {
              ...element,
              description,
              completed,
            },
            element._id
          );
          setIsEditing(false);
        }
      };

      // Add event listener when editing starts
      document.addEventListener("keydown", handleKeyDown);

      // Clean up the event listener when editing stops
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isEditing, description, completed, element, updateTask]);

  return (
    <div className="taskSquare p-4 text-white flex flex-col justify-between">
      <div className="flex justify-between mb-2 h-1/5">
        <h2 className="text-2xl font-semibold">{element.name}</h2>
        <button
          onClick={() => {
            deleteTask(element._id);
          }}
          className="text-red-700 hover:text-red-500
       transition-colors duration-150"
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      <span className="flex flex-col justify-between h-3/5">
        {isEditing ? (
          <textarea
            className="inputElement text-black"
            placeholder="Enter new description..."
            value={description}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(event.target.value)
            }
          />
        ) : (
          <p className="mb-4">{element.description} </p>
        )}
        <div className=" text-sm mb-4">
          <span>
            <strong>Due:</strong> {new Date(element.date).toLocaleDateString()}
          </span>
        </div>
      </span>

      <div className="flex items-center justify-between h-1/5">
        {isEditing ? (
          <label className="flex items-center space-x-2 text-sm text-white">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4"
              checked={completed}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setCompleted(event.target.checked)
              }
            />
            <span>Completed?</span>
          </label>
        ) : (
          <span
            className={`text-sm font-medium px-3 py-2 rounded-full ${
              element.completed
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {element.completed ? "Done" : "Undone"}
          </span>
        )}

        {isEditing ? (
          <div className="flex w-3/5 gap-2">
            <button
              onClick={() => {
                updateTask(
                  {
                    ...element,
                    description: description,
                    completed: completed,
                  },
                  element._id
                );
                setIsEditing(false);
              }}
              className="inputButton"
            >
              Update
            </button>
            <button
              className="inputButton"
              onClick={() => {
                setDescription(element.description || "");
                setCompleted(element.completed || false);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setIsEditing(true);
            }}
            className="text-slate-200 hover:text-white transition-colors duration-150"
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        )}
      </div>
    </div>
  );
}

export default DisplayTask;
