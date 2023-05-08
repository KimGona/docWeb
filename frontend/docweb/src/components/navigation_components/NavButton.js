import React from "react";

function buttonStyle(color) {
  switch(color) {
      case "pink": 
          return "bg-pink-400 hover:bg-pink-500 active:bg-pink-600 py-2 px-6 rounded-md text-white font-semibold text-lg transition duration-150 ease-in-out";
      case "green": 
          return "bg-greenPrimary hover:bg-greenSecondary active:bg-greenSecondary py-2 px-6 rounded-md text-white font-semibold text-lg transition duration-150 ease-in-out";
  };
}

const NavButton = ({path, text, color="pink"}) => {
    const style = buttonStyle(color)
    
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