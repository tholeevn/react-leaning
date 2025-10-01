import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import App from './App';
import Counter from "./Counter";

const root = createRoot(document.getElementById('root'));
root.render(<StrictMode>
    <div className="App"><App/></div>
    <div className="Counter"><Counter/></div>
</StrictMode>)