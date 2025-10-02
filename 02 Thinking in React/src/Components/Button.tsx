import {memo} from "react";

const MyButton = ({onClick}) => {
    console.log('MyButton re-rendered!');
    return <button onClick={onClick}>Click Me</button>;
};

export default memo(MyButton);