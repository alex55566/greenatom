import React, { useState } from 'react';
import { observer } from 'mobx-react-lite'
import classes from '../styles/components/Todo.module.css'
import { todo } from '../store/store.js'

export const TodoList = observer(() => {
    const [inputTodo, setInputTodo] = useState('');

    const [oddColor, setOddColor] = useState(false);

    const [evenColor, setEvenColor] = useState(false);

    function addTodo() {
        if (inputTodo) {
            todo.addTodo({ todo: inputTodo, done: false })
            setInputTodo('')
        }
    }

    function removeTodo(key) {
        todo.removeTodo(key)
    }

    function doneTodo(key) {
        todo.doneTodo(key)
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            addTodo()
        }
    }

    return (
        <div className="wrapper">
            <h1>My TodoList</h1>
            <div className={classes.wrapper}>
                <div className={classes.wrapperInner}>
                    <input onKeyPress={handleKeyPress} className="input" onChange={(e) => setInputTodo(e.target.value)} value={inputTodo} placeholder="Title..." />
                    <button className="btn" onClick={addTodo}>Add Todo</button>
                </div>
                <div className={classes.wrapperInnerBtn}>
                    <div>
                        <button className="btn" onClick={() => { todo.removeFirst() }}>del First Todo</button>
                        <button className="btn" onClick={() => { todo.removeLast() }}>del Last Todo</button>
                    </div>
                    <div>
                        <button className="btn" onClick={() => { setEvenColor(false); setOddColor(true) }}>color oddTodo</button>
                        <button className="btn" onClick={() => { setOddColor(false); setEvenColor(true) }}>color evenTodo</button>
                        <button className="btn" onClick={() => { setOddColor(false); setEvenColor(false) }}>color none</button>

                    </div>
                </div>
            </div>
            <h3>My todos</h3>
            <div className={classes.wrapperTodos}>
                {!todo.todos.length &&
                    <div className={classes.noTodos}>No todos</div>
                }
                {todo.todos.length !== 0 && todo.todos.map((todo, index) =>
                    <div key={index} className={(evenColor && (index + 1) % 2 === 0 ? classes.coloredEven : null) + ' ' + (oddColor && (index + 1) % 2 !== 0 ? classes.coloredOdd : null) + ' ' + (todo.done ? classes.isDone : classes.isActive) + ' ' + classes.wrapperTodo}>
                        <div>{todo.todo}</div>
                        <div className={classes.wrapperBtn}>
                            <button onClick={() => removeTodo(index)} className="btn">delete</button>
                            <button onClick={() => doneTodo(index)} className="btn">complete</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
})