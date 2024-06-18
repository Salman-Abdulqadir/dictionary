import React, { useEffect, useState } from "react";
import { FaRegMoon } from "react-icons/fa";

const ThemeChanger = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const changeTheme = (theme) => {
    const currentTheme = theme === "light" ? "dark" : "light";
    const html = document.querySelector("html");
    html.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
    setTheme(currentTheme);
  };
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
  }, []);
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        value={theme}
        checked={theme === "dark"}
        onChange={(e) => changeTheme(e.target?.value)}
        className="toggle toggle-primary"
      />
      <FaRegMoon size={20} />
    </div>
  );
};

export default ThemeChanger;
