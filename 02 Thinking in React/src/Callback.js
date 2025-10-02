import Button from './Components/Button';
import {useCallback, useState} from "react";
import Products  from "./Product";

function App() {
    const [count, setCount] = useState(0);
    // Handle click with callback
    const handleClick = useCallback(() => {
        console.log('Button was clicked');
        setCount(count + 1);
    },[]);

    // Handle Click without use callback
    // const handleClick =  ()=> {
    //     console.log("clicked");
    //     setCount(count + 1);
    // }

    return (<div>
            <h1>Example without callback</h1>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Increment Count: {count}
            </button>
            <Button onClick={handleClick}>Click me</Button>
            <Products />
        </div>);
}

export default App;