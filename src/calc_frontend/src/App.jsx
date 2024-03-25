import { useState } from 'react';
import { calc_backend } from 'declarations/calc_backend';

function App() {
  const [result, setResult] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const performOperation = async (operation) => {
    const value = parseInt(inputValue, 10);
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }

    try {
      const newResult = await calc_backend[operation](value);
      setResult(newResult.toString());
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  const handleAdd = () => performOperation('add');
  const handleSubtract = () => performOperation('sub');
  const handleMultiply = () => performOperation('mul');
  const handleDivide = () => performOperation('div');
  const handleClear = async () => {
    await calc_backend.clearall();
    setResult('');
    setInputValue('');
  };

  return (
    <main>
      <h1>Calculator</h1>
      <input 
        type="number" 
        value={inputValue} 
        onChange={handleInputChange} 
        placeholder="Enter a number" 
      />
      <div>
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleSubtract}>Subtract</button>
        <button onClick={handleMultiply}>Multiply</button>
        <button onClick={handleDivide}>Divide</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      <section id="result">Result: {result}</section>
    </main>
  );
}

export default App;
