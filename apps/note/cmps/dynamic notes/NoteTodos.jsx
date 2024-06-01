import { utilService } from "../../../../services/util.service.js"

const { useState, useEffect } = React

export function NoteTodos({ note, onChange, isEditable }) {
    const todosStarter = isEditable ? note.info.todos : []
    const [todos, setTodos] = useState(todosStarter)

    useEffect(() => {
        onChange({ target: { name: 'info.todos', value: todos } })
    }, [todos])

    function addTodoInput({ target }) {
        setTodos(prevTodos => [...prevTodos, { txt: target.value, doneAt: null }])
        target.value = ''
    }

    function handleTodoChange({ target }, idx) {
        const { name, value, type } = target
        let val = value

        if (type === 'checkbox') {
            val = (todos[idx].doneAt) ? null : utilService.getCurrentDateTime()
        }
        const updatedTodos = [...todos]
        updatedTodos[idx] = { ...updatedTodos[idx], [name]: val }
        setTodos(updatedTodos)
    }

    return <section className="todos-container">
        {todos.map((todo, idx) => {
            return <section className="todo-input" key={idx}>
                <input
                    className="checkbox-input"
                    type="checkbox"
                    name="doneAt"
                    id={`checkbox${idx}`}
                    onChange={(ev) => handleTodoChange(ev, idx)}
                    checked={todo.doneAt} />
                <label className="checkbox-label" htmlFor={`checkbox${idx}`}>
                    {(todo.doneAt ?
                        <i className="fa-regular fa-square-check"></i>
                        : <i className="fa-regular fa-square"></i>)}
                    <input
                        className="content-input"
                        autoFocus
                        id={idx}
                        type="text"
                        name="txt" onChange={(ev) => handleTodoChange(ev, idx)} value={todo.txt}
                        style={{ textDecoration: todo.doneAt ? 'line-through' : 'none' }} />
                </label>
                <span>{`${todo.doneAt ? `Done: ${todo.doneAt}` : ''}`}</span>
            </section>
        })}

        <section className="todo-input">
            <label htmlFor="list-item">+</label>
            <input
                id="list-item"
                autoFocus
                type="text"
                placeholder=" List item"
                onInput={addTodoInput} />
        </section>
    </section>
}

