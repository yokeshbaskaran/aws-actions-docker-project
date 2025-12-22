import { useState, useEffect } from "react";
import SingleTodo from "./SingleTodo";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const API_URL = import.meta.env.VITE_SERVER_API;

  const getAllTodos = async () => {
    const response = await fetch(`${API_URL}/todos`);
    if (response.ok) {
      const data = await response.json();
      console.log("GET data", data);

      setTodos(data);
    }
  };

  const handleSubmit = async () => {
    if (!title) {
      alert("Enter goals to add!");
      return;
    }

    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (response.ok) {
      setTitle("");
      getAllTodos();
    }
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      console.log("Todo deleted!");
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <section className="m-10 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-3">
        <h2 className="text-3xl font-bold">Daily Goals</h2>

        <div className="mt-5 mb-3 flex items-center gap-5">
          <input
            className="w-75 p-2 border rounded border-gray-700 text-[14px] focus:border-pink-600"
            placeholder="eg: go to barber, buy flowers"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="p-1 px-2 rounded text-white bg-green-700 cursor-pointer"
          >
            Add list
          </button>
        </div>

        <div className="self-baseline">
          <h2 className="py-2 underline text-gray-600">List:</h2>
          {todos.length > 0 ? (
            todos.map((item) => (
              <SingleTodo
                key={item._id}
                id={item._id}
                title={item.title}
                deleteTodo={deleteTodo}
              />
            ))
          ) : (
            <div className="text-gray-600"> No Goals added yet! </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Todo;
