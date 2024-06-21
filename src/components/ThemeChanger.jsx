import React, { useEffect, useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import Tooltip from "./Tooltip";
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
    <Tooltip title={"Change theme"}>
      <label className="swap swap-rotate btn btn-primary btn-sm font-extrabold">
        <input
          type="checkbox"
          value={theme}
          checked={theme === "dark"}
          onChange={(e) => changeTheme(e.target?.value)}
          className="toggle toggle-primary hidden"
        />
        <IoMoonOutline className="swap-on" size={25} />
        <IoSunnyOutline className="swap-off" size={25} />
      </label>
    </Tooltip>
  );
};

export default ThemeChanger;
