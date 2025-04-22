import { useDispatch, useSelector } from "react-redux"
import { decrement, increment, incrementByAmount } from "./features/counter/counter_slice"

function App() {
  
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  function handleIncreament(){
    dispatch(increment())
  }

  return (
    <>
      <div className="flex gap-2   justify-between flex-row w-11/12 mx-auto  ">
        <button onClick={handleIncreament}>increament </button>
        <div>{count}</div>
        <button onClick={()=>{dispatch(decrement())}}>decreament </button>
        <button onClick={()=>{dispatch(incrementByAmount(20))}}>increamentBy(20) </button>
      </div>
    </>
  )
}

export default App
