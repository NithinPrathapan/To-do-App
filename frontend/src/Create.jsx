import React, { useState } from "react";
import axios from "axios";

const Create = () => {
  const [todo, setTodo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todo.length === 0) {
      return alert("Please enter the text");
    }
    try {
      const response = await axios.post("http://localhost:5000/api/create", {
        todo,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center gap-6 border-2 p-12 rounded-md w-full">
      <input
        placeholder="Type todo..."
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        type="text"
        className="p-4 rounded-md outline-none border-2 bg-gray-200 placeholder:tracking-widest"
      />
      <button
        onClick={handleSubmit}
        className="hover:border-black bg-teal-300 border-transparent  transition-all duration-300 border-2 px-6 rounded-md  font-semibold  text-xl tracking-widest"
      >
        Add
      </button>
    </div>
  );
};

export default Create;
