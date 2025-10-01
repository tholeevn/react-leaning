import {useState} from "react";
import {useReducer} from "react";

interface StateCounter {
    count: number
}

type CounterAction = {
    type: "increase" | "decrease",
    value: StateCounter['count']
} | {
    type: "reset"
}


const initialState: StateCounter = {count: 0}


function countReducer(state: StateCounter, action: CounterAction): StateCounter {
    switch (action.type) {
        case 'increase':
            return {...state, count: state.count + action.value};
        case 'decrease':
            return {...state, count: state.count - action.value};
        case 'reset':
            return initialState;
        default:
            throw new Error('Unknown action');
    }
}

function ButtonReducer() {
    const [state, dispatch] = useReducer(countReducer, initialState);
    const addFive = () => dispatch({type: 'increase', value: 5});
    const reset = () => dispatch({type: 'reset'});
    const decrease = () => dispatch({type: 'decrease', value: 1});
    return (<>
        <h4>Counter with useReducer</h4>
        <p>Display text: {state.count} </p>
        <button onClick={addFive}> Add 5</button>
        <button onClick={decrease}>Decrease</button>
        <button onClick={reset}>Reset</button>
    </>);
}


// useState
function ButtonSate() {
    const [counter, setCounter] = useState<number>(0);

    return (<>
        <h4>Counter with useState</h4>
        <p>Display text: {counter} </p>
        <button onClick={(event) => {
            setCounter(counter + 5);
        }}>Add 5
        </button>
        <button onClick={(event) => {
            setCounter(0);
        }}>Reset
        </button>
    </>);
}

export default function Counter() {
    return (<>
        <h3>Welcome to my counter</h3>
        <ButtonSate/>
        <ButtonReducer/>
    </>);
}