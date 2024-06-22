import { useState } from "react";
import { Link } from "react-router-dom";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    const newTodo = {
      id: todos.length + 1,
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleCompleted = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const startEditing = (id, text) => {
    setEditMode(id);
    setEditValue(text);
  };

  const cancelEditing = () => {
    setEditMode(null);
    setEditValue("");
  };

  const saveEdit = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editValue } : todo
    );
    setTodos(updatedTodos);
    setEditMode(null);
    setEditValue("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Todo List</h1>
        <div className="mb-4 flex">
          <input
            type="text"
            className="border-gray-300 border rounded-l-md p-2 w-full focus:ring-1 " 
            placeholder="Add new todo..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 mx-2 text-white font-bold py-2 px-4 rounded-md"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between border-b py-2"
            >
              {editMode === todo.id ? (
                <>
                  <input
                    type="text"
                    className="border-gray-300 border rounded p-2 w-full"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <div className="flex ">
                    <button
                      className="bg-green-500 hover:bg-green-600 ml-2 text-white font-bold py-1 px-2 rounded mr-2"
                      onClick={() => saveEdit(todo.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded"
                      onClick={cancelEditing}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span
                    className={`cursor-pointer ${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-black"
                    }`}
                    onClick={() => toggleCompleted(todo.id)}
                  >
                    {todo.text}
                  </span>
                  <div>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
                      onClick={() => startEditing(todo.id, todo.text)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t text-center">
        <Link
          to="/"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Todo;
