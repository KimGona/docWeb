import IconX from "../resources/x-icon.svg";

export default function TextField({text, onClick}) {
    return (
        <div className="bg-transparent w-[300px] border border-2 border-greenPrimary py-2 px-4 rounded-md text-lg font-semibold flex flex-row justify-between align-center">
            <p className="text-base font-normal text-black">{text}</p>
            <img src={IconX} onClick={onClick} className="w-[15px]" />
        </div>
    );
};