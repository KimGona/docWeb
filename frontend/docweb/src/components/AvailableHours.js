
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

function Hour({time, hour, isSelected, setSelectedHour}) {
    return (
        <div key={time} className={getColor(isSelected)} onClick={() => setSelectedHour(hour)}>
            <p className={getTextStyle(isSelected)}>{time}</p>
        </div>
    );
}

export default function AvailableHours({hours, selectedHour, setSelectedHour}) {
    if (hours.length > 0) {
        return (
            <div className="grid grid-cols-3 gap-8">
                {hours.map( hour =>
                    <Hour time={`${hour}:00`} hour={hour} isSelected={hour === selectedHour} setSelectedHour={setSelectedHour}/>
                )}
            </div>
        );
    } else {
        return (
            <div>
                There are no available hours for the selected day.
            </div>
        );
    }
}