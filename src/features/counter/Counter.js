import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset, incremetByAmount } from './counterSlice'

const Counter = () => {
  const [incrementAmount, setIncrementAmount] = useState();
  const addValue = Number(incrementAmount) || 0;
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <p className="text-4xl font-bold text-blue-600 mb-4">{count}</p>
      
      <input
        type="text"
        value={incrementAmount}
        onChange={(e) => setIncrementAmount(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-lg text-center"
        placeholder="Enter amount"
      />
      
      <div className="space-x-4">
        <button
          onClick={() => dispatch(increment())}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          +
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
        >
          -
        </button>
        <button
          onClick={() => dispatch(reset())}
          className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
        >
          Reset
        </button>
        <button
          onClick={() => dispatch(incremetByAmount(addValue))}
          className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
        >
          Add Amount
        </button>
      </div>
      
      <button
        onClick={resetAll}
        className="mt-4 bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600"
      >
        Reset All
      </button>
    </section>
  )
}

export default Counter;

