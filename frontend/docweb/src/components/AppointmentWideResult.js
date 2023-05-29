
export default function AppointmentWideDoctor({date, hour, name, visitType, onClick}) {
    return (
        <div className="w-full border border-[3px] border-greenPrimary rounded-xl">
            <div className="w-full h-[50px] border border-[3px] border-greenPrimary bg-greenPrimary rounded-t-md flex flex-row space-x-6 items-center">
                <p className="pl-6 text-xl text-white font-bold">Appointment</p>
                <p className="pl-6 text-xl text-white font-normal">date: {date}</p>
                <p className="pl-6 text-xl text-white font-normal">hour: {hour}</p>
            </div>

            <div className="flex flex-col space-y-2 pt-6 pl-6">
                <p className="text-lg">{name}</p>
                <p className="text-lg font-medium ">Visit type: {visitType}</p>
            </div>
            <div className="w-full grid justify-items-end pr-4 pb-2">
                <p className="underline hover:cursor-pointer hover:text-pink-400" onClick={onClick}>Write result</p>
            </div>
        </div>
    );
};