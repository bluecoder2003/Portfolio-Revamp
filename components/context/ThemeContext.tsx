"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Theme = "white" | "blue";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("white");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as Theme | null;
    if (saved === "white" || saved === "blue") {
      setTheme(saved);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "white" ? "blue" : "white";
      localStorage.setItem("portfolio-theme", next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
