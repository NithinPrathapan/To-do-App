import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Home = () => {
  const [todoList, setTodoList] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [todo, setTodo] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (todo.length === 0) {
      return alert("Please enter the text");
    }
    try {
      await axios.post("http://localhost:5000/api/create", {
        todo,
      });
      fetchTodos();
      setTodo("");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api");
      const data = response.data;
      setTodoList(data.todos);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    const userConfirmed = window.confirm("Are you sure want to delete??");
    if (userConfirmed == true) {
      try {
        console.log(id);
        await axios.delete(`http://localhost:5000/api/${id}`);
        fetchTodos();
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };
  const handleUpdate = async () => {
    console.log(todo);
    try {
      setUpdating(true);
      await axios.put(`http://localhost:5000/api/${id}`, {
        text: todo,
      });

      fetchTodos();
      setUpdating(false);
      setTodo("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 mx-auto justify-center items-center mt-[10%] ">
      <h1 className="text-center text-4xl text-teal-400 font-semibold mb-4">
        Todo List
      </h1>
      <div className="flex justify-center gap-6  border-2 shadow-md p-12 rounded-md w-[80%] ">
        <input
          placeholder="Type todo..."
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          type="text"
          id="input"
          className="p-4 rounded-md ring-2 ring-black outline-none border-2 bg-gray-100 placeholder:tracking-widest w-full"
        />
        {updating ? (
          <button
            onClick={() => {
              handleUpdate(todo._id);
            }}
            className="hover:border-black  bg-teal-300 border-transparent  transition-all duration-300 border-2 px-6 rounded-md  font-semibold  text-xl tracking-widest"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleAddTodo}
            className="hover:border-black bg-teal-300 border-transparent  transition-all duration-300 border-2 px-6 rounded-md  font-semibold  text-xl tracking-widest"
          >
            Add
          </button>
        )}
      </div>
      {todoList && todoList.length > 0 && (
        <div className="bg-black flex flex-col gap-4 justify-center p-12  w-[80%] rounded-md drop-shadow-md">
          {todoList.map((todo) => (
            <div
              key={todo._id}
              className="bg-black  border-b  flex  py-4  justify-between uppercase font-semibold text-teal-300"
            >
              <h2 className="">{todo.text}</h2>
              <div className="flex gap-2 items-center justify-center">
                <FaRegEdit
                  onClick={() => {
                    setUpdating(true);
                    setTodo(todo.text);
                    setId(todo._id);
                  }}
                  size={24}
                  className="cursor-pointer hover:scale-110 transition-all duration-300"
                />
                <MdDeleteOutline
                  onClick={() => {
                    handleDelete(todo._id);
                  }}
                  size={24}
                  className="cursor-pointer hover:scale-110 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
