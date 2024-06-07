import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import ListContainer from "./ListContainer";

const Home = () => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api");
      const data = response.data;
      setTodoList(data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col  gap-4 justify-center w-[600px] items-center mx-auto h-screen">
      <Create />
      <div className="bg-black flex flex-col gap-4 justify-center p-12  w-full rounded-md drop-shadow-md">
        {todoList.map((todo) => (
          <ListContainer key={todo._id} item={todo} />
        ))}
      </div>
    </div>
  );
};

export default Home;
