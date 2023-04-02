export default function Appointment({isDoctor=false, date, hour, personName, visitType, onCancelClick, onEditClick}) {
    return (
        <div
            className={`relative text-left w-[644px] h-[150px]`}
        >
            <div className="inset-0 absolute bg-white w-[644px] rounded-[10px] [box-shadow:0px_0px_0px_3px_rgba(170,_193,_132,_1)_inset] [box-shadow-width:3px]" />
            <div className="inset-x-0 top-0 absolute rounded-tl-[10px] rounded-tr-[10px] w-[644px] bottom-[69.33%] bg-[rgba(170,193,132,1)]" />
            <p className="absolute text-xl font-bold text-white inline m-0 h-[27px] w-[136px] left-[3.26%] right-[75.62%] top-[8%] bottom-[74%] leading-[normal]">
                Appointment
            </p>
            <p className="absolute text-xl font-normal text-white inline m-0 h-[27px] w-[136px] left-[26.86%] right-[52.02%] top-[8%] bottom-[74%] leading-[normal]">
                {date}
            </p>
            <div className="absolute leading-none inline-block text-white h-[27px] w-[136px] left-[50.78%] right-[28.11%] top-[8%] bottom-[74%]">
                <p className="text-xl font-light inline m-0 leading-[normal]">
                    {"hour: "}
                </p>
                <p className="text-xl font-bold inline m-0 leading-[normal]">{hour}</p>
            </div>
            <p className="absolute text-base font-light text-black inline m-0 h-[27px] w-[182px] left-[2.33%] right-[69.41%] top-[46%] bottom-[36%] leading-[normal]">
                {personName}
            </p>
            <p onCLick={onLinkClick(isDoctor, onCancelClick, onEditClick)} className="underline hover:text-pink-500 right-0 absolute text-sm font-light text-black inline m-0 h-[27px] w-[123px] left-[80.9%] top-[76.67%] bottom-[5.33%] leading-[normal]">
                {cancelOrEditText(isDoctor)}
            </p>
            <p className="absolute text-base font-normal text-black inline m-0 h-[27px] w-[237px] left-[2.33%] right-[60.87%] top-[66%] bottom-[16%] leading-[normal]">
                Visit type: {visitType}
            </p>
            {cancelButton(isDoctor, onCancelClick)}
        </div>
    );
}

function onLinkClick(isDoctor, onCancelClick, onEditClick) {
    if (isDoctor)
        return onCancelClick
    else
        return onEditClick
}

function cancelOrEditText(isDoctor) {
    if (isDoctor)
        return "cancel appointment"
    else
        return "edit appointment"
}

function cancelButton(isDoctor, onCancelClick) {
    if (!isDoctor)
        return <div onClick={onCancelClick} className="w-5 absolute left-[93.79%] right-[3.11%] top-[8%] bottom-[78.67%] [background:url(https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/a1547176849379cd5d6ffbf2c49c6896753941a0.webp)_center_/_cover]" />
}