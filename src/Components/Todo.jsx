import React, { useEffect, useRef, useState } from 'react'
import TodoList from './TodoList'

const Todo = () => {
  const [todos, setTodos] = useState(localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : [])
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
  return (
    <>
      <div className='w-[30-rem]'>
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
      <div className='w-[30-rem] bg-white py-6 px-4 rounded-lg'>
        <fieldset className='space-y-3'>
          <legend className='text-pink-500 font-medium'>List Of Task</legend>

          {todos.length === 0 ? (
            <p className='text-sm text-gray-500'>No Task found</p>
          ) : (
            todos.map((todo, index) => {
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