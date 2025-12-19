import { useState } from "react";
import SingleTodo from "./SingleTodo";

const Todo = () => {
  const [title, setTitle] = useState("");

  const API_URL = import.meta.VITE_SERVER_API;

  const handleSubmit = async () => {
    console.log("Added todo");

    const data = {
      title,
    };
    console.log("data:", data);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("response:", response.data);
  };

  return (
    <>
      <section className="m-10 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-3">
          <h2 className="text-3xl font-bold">Daily Goals</h2>

          <div className="mt-5 mb-3 flex items-center gap-5">
            <input
              className="w-50 p-1 border rounded border-gray-700 focus:border-pink-600 ..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              className="p-1 px-2  rounded text-white bg-green-700 cursor-pointer"
            >
              Add list
            </button>
          </div>

          <div>
            <h2 className="py-2 underline text-gray-600">List:</h2>
            <SingleTodo />
          </div>
        </div>
      </section>
    </>
  );
};

export default Todo;
