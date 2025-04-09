import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const todos = [
    {
      id: 1,
      text: "react 공부하기",
      completed: true,
    },
    {
      id: 2,
      text: "놀기",
      completed: false,
    },
    {
      id: 3,
      text: "잠자기",
      completed: false,
    },
  ];

  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([...todos]);

  useEffect(() => {
    const store = localStorage.getItem("todo");
    if (store) {
      setTodoList(JSON.parse(store));
    }
    console.log("useEffect1");
  });

  useEffect(() => {
    console.log("todoList변화");
    localStorage.setItem("todo", JSON.stringify(todoList));
  }, [todoList]);

  function deleteTodo(id) {
    setTodoList(
      todoList.filter((item) => {
        return item.id !== id;
      })
    );
  }

  function addTodo() {
    if (input.trim() === "") {
      alert("자료를 입력하세요");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    console.log(newTodo);
    setTodoList([newTodo, ...todoList]);
    setInput("");
  }

  function toggleTodo(id) {
    alert("Toggle :" + id);
    setTodoList(
      todoList.map((item) => {
        return item.id === id ? { ...item, completed: true } : item;
      })
    );
  }

  return (
    <>
      <div className="p-4 border w-[500px] m-auto mt-12">
        <h1 className="text-2xl font-bold mb-4 text-center">TODO app</h1>
        <div className="flex gap-2">
          <input
            type="text"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
            placeholder="할 일을 입력하세요"
            className="flex-1 border p-1 rounded border-gray-300 focus:outline-none "
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            추가
          </button>
        </div>
        <ul className="py-2">
          {todoList.map((item, i) => {
            return (
              <>
                <TodoItem
                  item={todoList[i]}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                ></TodoItem>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
