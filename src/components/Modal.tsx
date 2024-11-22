import { FormEvent, useState } from "react";
import Input from "./Input";

type TODO = {
  title: string;
  completed: boolean;
};

interface Props {
  setShow: (show: boolean) => void;
  handleFunction: (todo: TODO) => void;
}

const Modal = ({ setShow, handleFunction }: Props) => {
  const [title, setTitle] = useState("");
  const handleTitleChange = (e: FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo = {
      title,
      completed: false,
    };
    handleFunction(todo);
    setShow(false);
  };
  return (
    <div className="flex justify-center items-center bg-[#333] w-screen h-screen absolute z-10 top-0 left-0 bg-opacity-70 !m-0">
      <div className="bg-white w-[80%] md:w-[50%] lg:w-[30%] flex flex-col p-4 rounded">
        <span
          className="border border-gray-700 self-end px-1.5 cursor-pointer"
          onClick={() => setShow(false)}
        >
          X
        </span>
        <form className="space-y-2" onSubmit={handleFormSubmit}>
          <Input
            type="text"
            label="Title"
            name="title"
            value={title}
            handleInput={handleTitleChange}
            placeholder="Enter Title"
          />
          <button
            type="submit"
            disabled={title.length < 1}
            className="bg-blue-500 text-white rounded py-1 px-2"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
