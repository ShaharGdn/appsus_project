import { eventBusService } from "../services/event-bus.service.js"
const { useState, useEffect, useRef } = React

export function UserMsg() {

  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
      console.log('Got msg', msg)
      setMsg(msg)
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
    })
    return unsubscribe
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return (
    <section className={`user-msg ${msg.type}`}>
      <span>{msg.txt}</span>
      {/* <button onClick={closeMsg}>x</button> */}
      <button onClick={closeMsg}>
        <i className="fa-sharp fa-solid fa-circle-xmark"></i>
        </button>
    </section>
  )
}

