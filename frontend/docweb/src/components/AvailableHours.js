
function getColor(isSelected) {
    if (isSelected)
        return "border border-2 border-sky-400 bg-sky-400 px-4 py-2 rounded-md flex items-center justify-center w-[100px]";
    else
        return "border border-2 border-sky-400 bg-white px-4 py-2 rounded-md flex items-center justify-center w-[100px]";
};

function getTextStyle(isSelected) {
    if (isSelected)
        return "font-semibold text-lg text-white";
    else
        return "font-semibold text-lg text-sky-400";
}

function Hour({time, isSelected, setSelectedHour}) {
    return (
        <div key={time} className={getColor(isSelected)} onClick={() => setSelectedHour(time)}>
            <p className={getTextStyle(isSelected)}>{time}</p>
        </div>
    );
}

export default function AvailableHours({hours, selectedHour, setSelectedHour}) {
    return (
        <div className="grid grid-cols-3 gap-8">
            {hours.map( hour =>
                <Hour time={hour} isSelected={hour === selectedHour} setSelectedHour={setSelectedHour}/>
            )}
        </div>
    );
}