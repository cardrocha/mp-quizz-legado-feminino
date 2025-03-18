import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    // Tenta obter o tema salvo no localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      return true;
    }
    return false; // Retorna false se não houver tema salvo
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark"); // Salva o tema no localStorage
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light"); // Salva o tema no localStorage
    }
  }, [darkMode]);

  return (
    <button
      type="button"
      onClick={() => setDarkMode((prev) => !prev)}
      className="bg-background text-white border-2 border-foreground text-base lg:text-xl px-4 py-1 rounded-full"
    >
      {darkMode ? (
        <SunIcon className="text-black text-2xl cursor-pointer" />
      ) : (
        <MoonIcon className="text-white text-2xl cursor-pointer" />
      )}
    </button>
  );
}