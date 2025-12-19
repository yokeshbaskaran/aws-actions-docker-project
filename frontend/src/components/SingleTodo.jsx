import { useState } from "react";

const SingleTodo = ({ title }) => {
  const [todoChecked, setTodoChecked] = useState(false);

  const tickBox = (e) => {
    setTodoChecked(e.target.checked);
  };

  return (
    <>
      <div className="flex items-center gap-5">
        <input
          type="checkbox"
          className="size-5 cursor-pointer"
          checked={todoChecked}
          onChange={tickBox}
        />

        <p className={todoChecked ? `line-through text-gray-600` : ""}>
          {title}
        </p>

        <button className="p-1 px-2 rounded text-white bg-red-700 cursor-pointer">
          Delete
        </button>
      </div>
    </>
  );
};

export default SingleTodo;
