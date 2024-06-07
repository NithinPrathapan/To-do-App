import axios from "axios";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const ListContainer = ({ item }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm("Are you sure want to delete??");
    if (userConfirmed == true) {
      try {
        console.log(item._id);
        const response = await axios.delete(
          `http://localhost:5000/api/${item._id}`
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };
  return (
    <div className="bg-black  border-b  flex  py-4  justify-between uppercase font-semibold text-teal-300">
      <h2 className="">{item.text}</h2>
      <div className="flex gap-2 items-center justify-center">
        <FaRegEdit
          size={24}
          className="cursor-pointer hover:scale-110 transition-all duration-300"
        />
        <MdDeleteOutline
          onClick={handleDelete}
          size={24}
          className="cursor-pointer hover:scale-110 transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default ListContainer;
