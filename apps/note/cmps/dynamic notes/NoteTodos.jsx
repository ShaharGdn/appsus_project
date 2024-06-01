const { useState, useEffect } = React

export function NoteTodos({ note, onChange, isEditable }) {
    const todosStarter = isEditable ? note.info.todos : []
    const [todos, setTodos] = useState(todosStarter)

    useEffect(() => {
        console.log('todos', todos)
        onChange({ target: { name: 'info.todos', value: todos } })
    }, [todos])

    function addTodoInput({ target }) {
        setTodos(prevTodos => [...prevTodos, { txt: target.value, doneAt: null }])
        target.value = ''
    }

    function handleTodoChange(ev, idx) {
        const updatedTodos = [...todos]
        updatedTodos[idx] = { txt: ev.target.value, doneAt: null }
        setTodos(updatedTodos)
    }
    // { txt: ev.target.value, doneAt: null }

    return <section>
        {todos.map((todo, idx) => {
            return <section className="todo-input" key={idx}>
                <label htmlFor={idx}>+</label>
                <input autoFocus id={idx} type="text" onChange={(ev) => handleTodoChange(ev, idx)}
                    name="info.todos" value={todo.txt} />
            </section>
        })}

         <section className="todo-input">
            <label htmlFor="list-item">+</label>
            <input id="list-item" autoFocus type="text" placeholder=" List item" onInput={addTodoInput} />
        </section>
    </section>
}

