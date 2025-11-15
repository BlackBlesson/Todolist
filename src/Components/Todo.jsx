import React, { useEffect, useRef, useState } from 'react'
import TodoList from './TodoList'

const Todo = () => {
  const [todos, setTodos] = useState(localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : [])

  const [filter, setFilter] = useState("all")
  const inputRef = useRef()

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos))
  },
    [todos])

  const addTask = () => {
    const inputText = inputRef.current.value.trim()
    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isCompleted: false
    }
    setTodos((prev) => [...prev, newTodo])
    inputRef.current.value = ""

  }

  const updateList = (id) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (id === todo.id) {
          return { ...todo, isCompleted: !todo.isCompleted }
        }
        return todo;
      })
    })
  }

  const deleteList = (id) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id != id)
    })
  }
  const filteredList = todos.filter((todo) => {
    if (filter === "completed") return todo.isCompleted;
    if (filter === "pending") return !todo.isCompleted;
    return true;
  })
  return (
    <>
      <div className='w-full max-w-[30rem] mx-auto'>
        <h1 className='text-lg my-2 font-medium text-amber-500'>To-Do List</h1>

        <div className='flex gap-2'>
          <div className='flex-1'>
            <input ref={inputRef} type='text' className='py-2 px-4 w-full text-sm
            border focus:outline-none focus:border-amber-500 rounded-lg' placeholder='Enter your task' />
          </div>
          <button className='bg-blue-600 py-2 px-4 text-white
        hover:bg-blue-900 text-sm  font-medium rounded-md border-none' onClick={addTask}>Add Task</button>
        </div>
        <p className='text-sm text-zinc-500 my-3 px-1'>Fill Task Details</p>
      </div>
      <div className='w-full max-w-[25rem] my-3 flex gap-2 mx-auto px-0'>
        <button
          className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={`px-3 py-1 rounded ${filter === "completed" ? "bg-green-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>

        <button
          className={`px-3 py-1 rounded ${filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>
      <div className='w-full max-w-[30rem] bg-white py-6 px-4 rounded-lg mx-auto'>
        <fieldset className='space-y-3'>
          <legend className='text-pink-500 font-medium'>List Of Task</legend>

          {filteredList.length === 0 ? (
            <p className='text-sm text-gray-500'>No Task found</p>
          ) : (
            filteredList.map((todo, index) => {
              return <TodoList text={todo.text} key={index} isCompleted={todo.isCompleted} id={todo.id} update={updateList} deleteList={deleteList} />
            })
          )
          }

        </fieldset>
      </div>
    </>
  )
}

export default Todo