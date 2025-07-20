import React from "react";
import ThemeSwitcher from "../Events/ThemeSwitcher";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center py-3 px-4 sm:py-4 sm:px-6 bg-gray-800 text-white shadow-md dark:bg-gray-900">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
        Event Scheduler
      </h1>
      <ThemeSwitcher />
    </header>
  );
};

export default Header;
