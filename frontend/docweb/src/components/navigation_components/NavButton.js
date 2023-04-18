import React from "react";

const NavButton = ({path, text}) => {
    const style = "bg-pink-400 hover:bg-pink-500 active:bg-pink-600 py-2 px-6 rounded-md text-white font-semibold text-lg transition duration-150 ease-in-out"
    
    return (
      <div>
        <div className={style}>
            <a href={path}>
                {text}
            </a>
        </div>
      </div>
    );
  };

export default NavButton;