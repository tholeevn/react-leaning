import {createContext, useContext, useState} from "react";

type Theme = "light" | "dark" | "system";
const ThemeContext = createContext<Theme>("system");

const useGetTheme = () => useContext(ThemeContext);

function MyComponent() {
    const theme = useGetTheme();
    return <div>The current theme is {theme}</div>;
}
export default function App() {
    const [theme, setTheme] = useState<Theme>();
    return (
        <ThemeContext.Provider value={theme}>
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Toggle Theme</button>
            <MyComponent />
        </ThemeContext.Provider>
    );
}