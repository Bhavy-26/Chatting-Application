import { create } from "zustand";

const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
}

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chat-theme") || "coffee",
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        applyTheme(theme);
        set({ theme });
    },
}));