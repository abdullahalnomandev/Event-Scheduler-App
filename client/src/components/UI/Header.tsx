import React from "react";
import ThemeSwitcher from "../Events/ThemeSwitcher";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center py-3 px-4 sm:py-4 sm:px-6 text-gray-900 shadow-md bg-white dark:bg-gray-800 dark:text-gray-200">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Event Scheduler
      </h1>
      <ThemeSwitcher />
    </header>
  );
};

export default Header;
