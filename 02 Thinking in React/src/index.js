import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import App from './App';
import Counter from "./Counter";
import ThemeContext from "./Context";
import MemoApp from "./Memo";

const root = createRoot(document.getElementById('root'));
root.render(<StrictMode>
    <div className="MemoApp"><MemoApp/></div>
    <hr />
    <div className="Counter"><Counter/></div>
    <hr />
    <div className="ThemeContext"><ThemeContext /></div>
    <hr />
    <div className="App"><App/></div>
</StrictMode>)
