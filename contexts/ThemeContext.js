import { createContext, useContext, useReducer } from "react";
import { darkTheme, lightTheme } from "../themes";

const ThemeContext = createContext()

const themeReducer = (state, action) => {
    return state === lightTheme ? darkTheme : lightTheme;
}

export const ThemeProvider = ({ children }) => {
    const [theme, dispatch] = useReducer(themeReducer, lightTheme);

    const toggleTheme = () => {
        dispatch();
    }


    const value = {
        theme, 
        toggleTheme
    }
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    return useContext(ThemeContext)
}