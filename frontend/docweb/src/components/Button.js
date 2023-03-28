// colors: pink, pink outline, green outline, pink big

function buttonStyle(color) {
    switch(color) {
        case "pink": 
            return "bg-pink-400 hover:bg-pink-500 active:bg-pink-600 py-2 px-8 rounded-md text-white font-semibold text-base transition duration-150 ease-in-out";
        case "pink outline": 
            return "bg-transparent hover:bg-zinc-200 active:bg-zinc-300 border border-2 border-pink-400 py-2 px-8 rounded-md text-pink-400 text-base font-semibold transition duration-150 ease-in-out";
        case "green outline": 
            return "bg-transparent hover:bg-zinc-200 active:bg-zinc-300 border border-2 border-lime-500 py-2 px-8 rounded-md text-lime-500 text-base font-semibold transition duration-150 ease-in-out";
        case "pink big": 
            return "bg-pink-400 w-[200px] hover:bg-pink-500 active:bg-pink-600 py-2 px-8 rounded-md text-white font-semibold text-base transition duration-150 ease-in-out";
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