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
    setTodoList([newTodo, ...App]);
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
      <div>
        <h1>TODO app</h1>
        <div></div>
      </div>
    </>
  );
}

export default App;
