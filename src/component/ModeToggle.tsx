import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      type="button"
      onClick={() => setDarkMode((prev) => !prev)}
      className="bg-background text-white border-2 border-white text-base lg:text-xl px-4 py-1 rounded-full"
    >
      {darkMode ? (
        <SunIcon className="text-black text-2xl cursor-pointer" />
      ) : (
        <MoonIcon className="text-white text-2xl cursor-pointer" />
      )}
    </button>
  );
}
