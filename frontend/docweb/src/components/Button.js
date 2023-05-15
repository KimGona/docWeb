// colors: pink, pink outline, green outline, pink big

function buttonStyle(color) {
    switch(color) {
        case "pink": 
            return "bg-pink-400 hover:border-pink-500 active:border-pink-600 hover:bg-pink-500 active:bg-pink-600 py-2 px-8 border border-2 border-pink-400 rounded-md text-white font-semibold text-base transition duration-150 ease-in-out";
        case "pink big": 
            return "bg-pink-400 hover:border-pink-500 active:border-pink-600 hover:bg-pink-500 active:bg-pink-600 py-[12px] px-12 border border-2 border-pink-400 rounded-md text-white font-semibold text-xl transition duration-150 ease-in-out";
        case "green": 
            return "bg-greenPrimary hover:border-greenSecondary active:border-greenSecondary hover:bg-greenSecondary active:bg-greenSecondary py-[15px] px-10 border border-2 border-greenPrimary rounded-md text-white font-semibold text-xl transition duration-150 ease-in-out";
        case "pink outline": 
            return "bg-transparent hover:bg-zinc-200 active:bg-zinc-300 border border-2 border-pink-400 py-2 px-8 rounded-md text-pink-400 text-base font-semibold transition duration-150 ease-in-out";
        case "green outline": 
            return "bg-transparent hover:bg-zinc-200 active:bg-zinc-300 border border-2 border-greenPrimary py-2 px-8 rounded-md text-greenPrimary text-base font-semibold transition duration-150 ease-in-out";
        case "green outline big": 
            return "bg-transparent hover:bg-zinc-200 active:bg-zinc-300 border border-[3px] border-greenPrimary py-[12px] px-8 rounded-md text-greenPrimary text-xl font-semibold transition duration-150 ease-in-out";
        case "pink big": 
            return "bg-pink-400 w-[200px] hover:bg-pink-500 active:bg-pink-600 py-2 px-8 rounded-md text-white font-semibold text-base transition duration-150 ease-in-out";
        case "pink xl": 
            return "bg-pink-400 w-[300px] hover:bg-pink-500 active:bg-pink-600 py-2 px-8 rounded-md text-white font-semibold text-lg transition duration-150 ease-in-out";
        case "green outline xl": 
            return "bg-transparent w-[300px] hover:bg-zinc-200 active:bg-zinc-300 border border-2 border-greenPrimary py-2 px-8 rounded-md text-greenPrimary text-xl font-semibold transition duration-150 ease-in-out";
        case "pink outline xl": 
            return "bg-transparent w-[300px] hover:bg-zinc-200 active:bg-zinc-300 border border-2 border-pink-400 py-2 px-8 rounded-md text-pink-400 text-xl font-semibold transition duration-150 ease-in-out";
        
    };
}

export default function Button({
    id=1,
    label,
    color="pink",
    type="button",
    value,
    onClick
}) {
    return (
        <div>
            <button
            id={id}
            value={value}
            type={type}
            onClick={onClick}
            className={buttonStyle(color)}>
                {label}
            </button>
        </div>
    );
}