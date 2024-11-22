import { FormEvent, useState } from "react";
import Modal from "../components/Modal";
import { BiTrash } from "react-icons/bi";

type TODO = {
  title: string;
  completed: boolean;
};

function Home() {
  const [show, setShow] = useState(false);
  const [todos, setTodos] = useState<TODO[]>([]);
  const handleAddTodo = (todo: TODO) => {
    setTodos((prev) => [...prev, todo]);
  };
  const handleDelete = (ind: number) => {
    const filteredArray = todos.filter((_, index) => ind !== index);
    setTodos(filteredArray);
  };

  const handleCheckbox = (e: FormEvent<HTMLInputElement>, id: number) => {
    const updatedArray = todos.map((todo, index) =>
      index === id ? { ...todo, completed: e.currentTarget.checked } : todo
    );
    setTodos(updatedArray);
  };

  const getTodoItem = (todo: TODO, index: number) => (
    <li
      key={index}
      className={`flex items-center justify-between gap-1 bg-${
        todo.completed ? "green" : "orange"
      }-100 px-1 rounded`}
    >
      <div className="space-x-2">
        <input
          type="checkbox"
          checked={todo.completed}
          id={todo.title + index}
          onChange={(e) => handleCheckbox(e, index)}
        />
        <label
          htmlFor={todo.title + index}
          className={`text-xl ${todo.completed && "line-through"}`}
        >
          {todo.title}
        </label>
      </div>
      <BiTrash onClick={() => handleDelete(index)} />
    </li>
  );

  return (
    <main className="bg-[#f5f1ec] min-h-screen w-screen space-y-2 relative">
      <header className="px-4 md:px-16 py-2 bg-white flex justify-between">
        <h1 className="font-bold">
          <span className="border-2 border-black px-1">T.</span> TODO
        </h1>
        <button
          type="button"
          onClick={() => setShow(true)}
          className="bg-blue-500 rounded text-white px-2 py-1"
        >
          +Add
        </button>
      </header>
      {show && <Modal setShow={setShow} handleFunction={handleAddTodo} />}
      <section className="px-4 md:px-16">
        <div
          className={`bg-white p-2 rounded  min-h-[85vh] flex flex-col ${
            !todos.length && "justify-center items-center"
          }`}
        >
          {!todos.length ? (
            <p className="">Todos List is empty.please create todo</p>
          ) : (
            <div>
              <div className="flex flex-col md:flex-row w-full gap-10">
                <div className="w-full md:w-[50%] border shadow-md space-y-2 p-2">
                  <h2 className="text-2xl font-semibold">Todos</h2>
                  <ul className="space-y-2">
                    {todos.map((todo, index) => {
                      if (!todo.completed) return getTodoItem(todo, index);
                    })}
                  </ul>
                </div>
                <div className="w-full md:w-[50%] border shadow-md p-2 space-y-2">
                  <h2 className="text-2xl font-semibold">Completed</h2>
                  <ul className="space-y-2">
                    {todos?.map((todo, index) => {
                      if (todo.completed) return getTodoItem(todo, index);
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
