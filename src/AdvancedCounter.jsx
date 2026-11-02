import { useState, useEffect } from 'react';

export default function AdvancedCounter() {
   const [count, setCount] = useState(() => {
        const saved = localStorage.getItem("count");
        return saved !== null ? Number(saved) : 0;
    });

    const [history, setHistory] = useState([]);

    const changeCount = (amount) => {
        const newCount = count + amount;
        setCount(newCount);
        setHistory([...history, newCount]);
    };

    const reset = () => {
        setCount(0);
        setHistory([]);
    };

    useEffect(() => {
        localStorage.setItem("count", String(count));
    }, [count])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowUp") changeCount(1);
            if (event.key === "ArrowDown") changeCount(-1);
            if (event.key === "r") reset();
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [count, history]);

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => changeCount(-1)}>-</button>
            <button onClick={()=> changeCount(1)}>+</button>
            <button onClick={reset}>Reset</button>

            <h2>History</h2>
            <ul>
                {history.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
        </div>
    );
}