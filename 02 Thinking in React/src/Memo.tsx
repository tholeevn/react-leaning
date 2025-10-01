import {useState, useMemo} from 'react';

// Một hàm tính toán rất nặng, cố tình làm chậm
function fibonacci(n) {
    if (n <= 1) {
        return 1;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function App() {
    const [number, setNumber] = useState(4);
    const [theme, setTheme] = useState('light');

    // Phép tính này sẽ chạy lại mỗi khi component render
    console.log('App render');
    // const fib = fibonacci(number);
    const fib = useMemo(() => {
        console.log('fib render');
        return fibonacci(number);
    }, [number]);

    const themeStyles = {
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white',
        padding: '2rem',
        minHeight: '100vh'
    };

    return (
        <div style={themeStyles}>
            <h2>useMemo example</h2>

            <input
                type="number"
                value={number}
                onChange={e => setNumber(parseInt(e.target.value))}
            />
            <h3>Fibonacci of {number} is: {fib}</h3>

            <hr/>

            <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
                Toggle Theme
            </button>
        </div>
    );
}

export default App;