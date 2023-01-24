import { useState, useEffect, SyntheticEvent } from "react";
import { useLocalStorage, useDarkMode } from "usehooks-ts";
import {
  Cross2Icon,
  MoonIcon,
  SunIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";

type TodoType = {
  id: string;
  task: string;
  done: boolean;
};

export default function App() {
  const [value, setValue] = useState("");
  const { isDarkMode, toggle, enable, disable } = useDarkMode();

  const [todo, setTodo] = useLocalStorage<TodoType[]>("todos", []);

  useEffect(() => {
    if (localStorage.getItem("todos") != null) {
      setTodo(JSON.parse(localStorage.getItem("todos") || "{}"));
    }
  }, []);

  const toggleTodo = (id: string) => {
    let copy = [...todo];

    copy.map((item) => {
      item.id === id ? (item.done = !item.done) : null;
    });
    setTodo([...copy]);
  };

  const deleteTodo = (id: string) => {
    let copy = [...todo];

    const index = copy.findIndex((item) => item.id === id);

    copy.splice(index, 1);

    setTodo([...copy]);
  };

  const addTodo = (e: SyntheticEvent) => {
    e.preventDefault();
    if (value.trim() != "") {
      setTodo([
        ...todo,
        {
          id: crypto.randomUUID(),
          task: value,
          done: false,
        },
      ]);
    }
    setValue(() => "");
  };
  return (
    <div className={`${isDarkMode ? "dark" : "light"}`}>
      <div className="h-screen flex flex-col dark:bg-black dark:text-neutral-500 text-lg">
        <div className="border-b dark:border-neutral-800 flex justify-end p-1">
          <button onClick={toggle} className="px-6 py-4">
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <div className="p-4 grow ">
          {todo.map((item) => {
            return (
              <div key={item.id} className="flex mb-4 dark:text-neutral-300">
                <div
                  className={`${
                    item.done
                      ? "line-through bg-blue-50 dark:bg-slate-950 text-slate-400 dark:text-slate-700"
                      : "hover:bg-blue-200  bg-blue-100 dark:bg-slate-900"
                  } hover:dark:bg-slate-800 grow rounded-l px-4 py-2 cursor-pointer	`}
                  onClick={() => toggleTodo(item.id)}
                >
                  {item.task}
                </div>
                <button
                  onClick={() => deleteTodo(item.id)}
                  className="hover:bg-blue-200 bg-blue-100 dark:bg-slate-900 rounded-r py-1 px-4"
                >
                  <Cross2Icon />
                </button>
              </div>
            );
          })}
        </div>
        <form onSubmit={(e) => addTodo(e)} className="flex">
          <input
            className="w-full focus:outline-none border-t dark:border-neutral-800 bg-transparent px-4 "
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-4">
            <PaperPlaneIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
