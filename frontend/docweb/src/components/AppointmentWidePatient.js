
function getStyle1(isDark) {
    if (isDark)
        return "w-full border border-[3px] border-greenSecondary rounded-xl"
    else 
     return "w-full border border-[3px] border-greenPrimary rounded-xl"
}

function getStyle2(isDark) {
    if (isDark)
        return "w-full h-[50px] border border-[3px] border-greenSecondary bg-greenSecondary rounded-t-md flex flex-row space-x-6 items-center"
    else 
     return "w-full h-[50px] border border-[3px] border-greenPrimary bg-greenPrimary rounded-t-md flex flex-row space-x-6 items-center"
}

function getEdit(isDark, onClick) {
    if (!isDark) {
        return <p className="underline hover:text-pink-500" onClick={onClick}>edit appointment</p>
    } else 
        return <div className="p-2"></div>
}


export default function AppointmentWidePatient({date, hour, name, visitType, id, isDark=false, onClick}) {
    return (
        <div className={getStyle1(isDark)}>
            <div className={getStyle2(isDark)}>
                <p className="pl-6 text-xl text-white font-bold">Appointment</p>
                <p className="pl-6 text-xl text-white font-normal">date: {date}</p>
                <p className="pl-6 text-xl text-white font-normal">hour: {hour}</p>
            </div>

            <div className="flex flex-col space-y-2 pt-6 pl-6">
                <p className="text-lg">{name}</p>
                <p className="text-lg font-medium ">Visit type: {visitType}</p>
            </div>
            <div className="w-full grid justify-items-end pr-4 pb-2">
                {getEdit(isDark, onClick)}
            </div>
        </div>
    );
};