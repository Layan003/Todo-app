import { useState } from "react";
import { useRef, useEffect } from "react";

function App() {
  const inputRef = useRef(null);
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [editTodoText, setEditTodoText] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [idCounter, setIdCounter] = useState(0);
  const [edited, setEdited] = useState(false);
  const [checkedTodoList, setCheckedTodoList] = useState([]);
  const [editTodo, setEditTodo] = useState(false);

  useEffect(() => {
    if (editTodo && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        editTodoText.length,
        editTodoText.length
      );
    }
  }, [editTodo]);

  function addTodo() {
    if (newTodo === "") {
      alert("Please enter valid todo...");
      return;
    }
    setTodoList([
      ...todoList,
      { id: idCounter, todo: newTodo, checked: false },
    ]);
    setNewTodo("");
    setIdCounter(idCounter + 1);
  }

  function handleChecked(i) {
    const checked = [];
    const unchecked = [];
    const completeTodoList = [...todoList, ...checkedTodoList];

    const updatedTodoList = completeTodoList.map((item) => {
      if (i === item.id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });

    updatedTodoList.forEach((item) => {
      if (item.checked) {
        checked.push(item);
      } else {
        unchecked.push(item);
      }
    });

    setCheckedTodoList([...checked]);
    setTodoList([...unchecked]);
  }

  function handleDelete(i) {
    const updatedTodoList = todoList.filter((item) => i !== item.id);
    const updatedCheckedTodoList = checkedTodoList.filter(
      (item) => i !== item.id
    );
    setTodoList(updatedTodoList);
    setCheckedTodoList(updatedCheckedTodoList);
    setDeleted(true);
  }

  function handleEditMode(todo) {
    setEditTodoText(todo.todo);
    setEditTodoId(todo.id);
    setEditTodo(true);
  }
  function handleEdit(i) {
    const updatedTodoList = todoList.map((item) => {
      if (item.id === i) {
        return { ...item, todo: editTodoText };
      }
      return item;
    });
    const updatedCheckedTodoList = checkedTodoList.map((item) => {
      if (item.id === i) {
        return { ...item, todo: editTodoText };
      }
      return item;
    });
    setCheckedTodoList(updatedCheckedTodoList);
    setTodoList(updatedTodoList);
    setEditTodo(false);
    setEditTodoId(null);
    setEditTodoText("");
    setEdited(true);
  }

  return (
    <>
      <h1>Let's Get Things Done!</h1>
      <p className="intro">
        A minimalistic app to keep track of your daily tasks. Add, edit, and
        manage your to-dos easily.
      </p>
      <div className="todo-container">
        <input
          className="todo-input"
          type="text"
          placeholder="Create a To-Do..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {deleted && (
        <div
          class="deleted-alert alert alert-warning alert-dismissible fade show custom-alert"
          role="alert"
        >
          Todo deleted successfully!
          <button
            onClick={() => setDeleted(false)}
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      {edited && (
        <div
          class="deleted-alert alert alert-warning alert-dismissible fade show custom-alert"
          role="alert"
        >
          Todo edited successfully!
          <button
            onClick={() => setEdited(false)}
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      {todoList.length > 0 && (
        <div>
          <p className="container-title">Current To-dos:</p>
          <div className="todoList-container">
            {todoList.map((item) =>
              editTodoId === item.id ? (
                <div className="todo-row" key={item.id}>
                  <div
                    className="item checked"
                    onClick={() => handleChecked(item.id)}
                  >
                    {item.checked ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#2d3b00"
                      >
                        <path d="m429-336 238-237-51-51-187 186-85-84-51 51 136 135Zm51 240q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#2d3b00"
                      >
                        <path d="M480.28-96Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
                      </svg>
                    )}
                  </div>
                  <div className="item todo">
                    <input
                      className="edit-todo-input"
                      ref={inputRef}
                      type="text"
                      value={editTodoText}
                      onChange={(e) => setEditTodoText(e.target.value)}
                    />
                  </div>
                  <div
                    className="item item-edit"
                    onClick={() => handleEdit(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#2d3b00"
                    >
                      <path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z" />
                    </svg>
                  </div>
                  <div
                    className="item item-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#2d3b00"
                    >
                      <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="todo-row" key={item.id}>
                  <div
                    className="item checked"
                    onClick={() => handleChecked(item.id)}
                  >
                    {item.checked ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#2d3b00"
                      >
                        <path d="m429-336 238-237-51-51-187 186-85-84-51 51 136 135Zm51 240q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#2d3b00"
                      >
                        <path d="M480.28-96Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
                      </svg>
                    )}
                  </div>
                  <div className="item todo">
                    <p
                      style={{
                        textDecoration: item.checked ? "line-through" : "none",
                      }}
                    >
                      {item.todo}
                    </p>
                  </div>
                  <div
                    className="item item-edit"
                    onClick={() => handleEditMode(item)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#2d3b00"
                    >
                      <path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z" />
                    </svg>
                  </div>
                  <div
                    className="item item-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#2d3b00"
                    >
                      <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
                    </svg>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* checked to-dos */}
      {checkedTodoList.length > 0 && (
        <div>
          <p className="container-title">Checked To-dos:</p>
          <div className="todoList-container">
            {checkedTodoList.map((item) =>
              editTodoId === item.id ? (
                <div className="todo-row" key={item.id}>
                  <div
                    className="item checked"
                    onClick={() => handleChecked(item.id)}
                  >
                    {item.checked ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#2d3b00"
                      >
                        <path d="m429-336 238-237-51-51-187 186-85-84-51 51 136 135Zm51 240q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#2d3b00"
                      >
                        <path d="M480.28-96Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
                      </svg>
                    )}
                  </div>
                  <div className="item todo">
                    <input
                      className="edit-todo-input"
                      ref={inputRef}
                      type="text"
                      value={editTodoText}
                      onChange={(e) => setEditTodoText(e.target.value)}
                    />
                  </div>
                  <div
                    className="item item-edit"
                    onClick={() => handleEdit(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#2d3b00"
                    >
                      <path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z" />
                    </svg>
                  </div>
                  <div
                    className="item item-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#2d3b00"
                    >
                      <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="todo-row" key={item.id}>
                  <div
                    className="item checked"
                    onClick={() => handleChecked(item.id)}
                  >
                    {item.checked ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#2d3b00"
                      >
                        <path d="m429-336 238-237-51-51-187 186-85-84-51 51 136 135Zm51 240q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#2d3b00"
                      >
                        <path d="M480.28-96Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
                      </svg>
                    )}
                  </div>
                  <div className="item todo">
                    <p
                      style={{
                        textDecoration: item.checked ? "line-through" : "none",
                      }}
                    >
                      {item.todo}
                    </p>
                  </div>
                  <div
                    className="item item-edit"
                    onClick={() => handleEditMode(item)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#2d3b00"
                    >
                      <path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z" />
                    </svg>
                  </div>
                  <div
                    className="item item-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#2d3b00"
                    >
                      <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
                    </svg>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
