import React from 'react'

const TodoList = ({ text, isCompleted, id, update, deleteList }) => {
    return (
        <>
            <div className='flex justify-between items-center gap-2 my-2 mx-2'>
                <label className={`hover:bg-slate-300 flex-1 rounded cursor-pointer select-none ${isCompleted ? "line-through text-slate-600" : ""}`} onClick={() => {
                    update(id)
                }}>{text}</label>
                <div className=''>
                    <div className='size-[26px] hover:bg-red-100  rounded-md  ' onClick={() =>
                        deleteList(id)
                    }>
                        <svg className='hover:fill-red-700' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TodoList