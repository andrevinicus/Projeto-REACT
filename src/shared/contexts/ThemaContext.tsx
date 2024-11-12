import { createContext, useCallback, useMemo, useState, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { LightTheme, DarkTheme } from './../themes';
import Box from '@mui/material/Box';

interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

interface AppThemeProviderProps {
    children: ReactNode;
}

export const useAppThemeContext = () => {
    
}

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback(() => {
        setThemeName((oldThemeName) => (oldThemeName === 'light' ? 'dark' : 'light'));
    }, []);

    const theme = useMemo(() => {
        return themeName === 'light' ? LightTheme : DarkTheme;
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
