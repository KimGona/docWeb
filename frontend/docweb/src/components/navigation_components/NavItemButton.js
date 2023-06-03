import React from "react";

const NavItemButton = ({path, text, onClick}) => {
    const current_nav = "font-normal text-white font-semibold text-lg pr-4 pl-4 pt-6 pb-2 bg-greenPrimary hover:bg-greenSecondary hover:cursor-pointer"
    const default_nav = "font-normal text-black font-semibold text-lg pr-4 pl-4 pt-6 pb-2 bg-white hover:text-gray-500 hover:cursor-pointer"
    return (
      <div className={window.location.pathname === path ? current_nav : default_nav} onClick={onClick}>
        {text}
      </div>
    );
  };

export default NavItemButton;