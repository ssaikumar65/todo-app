import { KeyboardEvent, useState } from "react";
import "./index.css";

type TodoProps = {
  id: number;
  desc: string;
  done: boolean;
};
const Todo = () => {
  const [todoArr, setTodoArr] = useState<TodoProps[]>([]);
  const [value, setValue] = useState("");

  function createList() {
    if (value.length === 0) {
      return;
    }
    let n = {
      id: Math.floor(Math.random() * 1000) + 4,
      desc: value,
      done: false,
    };
    setTodoArr((prev) => [n, ...prev]);
    setValue("");
  }

  const checkClick = (v: TodoProps) => {
    var i = todoArr.findIndex((x) => x.id === v.id);
    var g = todoArr[i];
    g["done"] = !v.done;
    setTodoArr((prev) => [...prev.slice(0, i), g, ...prev.slice(i + 1)]);
    console.log(todoArr);
  };

  const deleteList = (item: TodoProps) => {
    var i = todoArr.findIndex((x) => x.id === item.id);
    setTodoArr((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)]);
    console.log(todoArr);
  };

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      createList();
    }
  }

  return (
    <div className="todo">
      <div className="todoBar">
        <div className="textbox">
          <input
            onKeyDown={handleKeyDown}
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Create a task..."
            type="text"
          />
        </div>
        <div className="icon2">
          <button onClick={() => createList()} className="next">
            &#10148;
          </button>
        </div>
      </div>
      {todoArr.map((item) => {
        return (
          <div
            key={item.id}
            style={
              item.done
                ? {
                    borderColor: "crimson",
                    boxShadow: "none",
                    color: "crimson",
                  }
                : {}
            }
            className="todoBar"
          >
            <div className="icon1">
              <div
                onClick={() => checkClick(item)}
                className={`checkbox ${!item.done ? "" : "box"}`}
              >
                {!item.done ? "" : <span>&#10004;</span>}
              </div>
            </div>
            <div className="text">{item.desc}</div>
            <div className="icon2">
              <button
                onClick={() => deleteList(item)}
                className={!item.done ? "del" : "del done"}
              >
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Todo;
