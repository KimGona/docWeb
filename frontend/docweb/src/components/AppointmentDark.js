export default function AppointmentDark({date, hour, personName, visitType}) {
    return (
        <div
            className={`relative text-left w-[644px] h-[150px]`}
        >
            <div className="inset-0 absolute bg-white w-[644px] rounded-[10px] [box-shadow:0px_0px_0px_3px_rgba(76,_89,_55,_1)_inset] [box-shadow-width:3px]" />
            <div className="inset-x-0 top-0 absolute rounded-tl-[10px] rounded-tr-[10px] w-[644px] bottom-[69.33%] bg-[rgba(76,89,55,1)]" />
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
            <p className="absolute text-base font-normal text-black inline m-0 h-[27px] w-[237px] left-[2.33%] right-[60.87%] top-[66%] bottom-[16%] leading-[normal]">
                Visit type: {visitType}
            </p>
        </div>
    );
}