import InputField from "./InputField";

function InputScheduleItem({item, onValueChange}) {
    return (
        <>
            <p className="font-medium">{item.dayName}</p>
            <InputField type="number" width="w-[70px]" value={item.start} onValueChange={(value) => onValueChange(value, item.dayName, "start")}/>
            <InputField type="number" width="w-[70px]" value={item.end} onValueChange={(value) => onValueChange(value, item.dayName, "end")}/>
        </>
    );
};

function InputScheduleTitle({text}) {
    return (
        <p className="text-sm text-gray-400">{text}</p>
    );
};

export default function InputSchedule({schedule, setSchedule}) {

    const onValueChange = (value, dayName, type) => {
        let newSchedule = [...schedule]
        let index = newSchedule.findIndex( elem => elem.dayName == dayName)

        let newHour = parseInt(value.target.value, 10);

        if (type == "start") {
            newSchedule[index].start = newHour;
        } else if (type == "end") {
            newSchedule[index].end = newHour;
        }
        setSchedule(newSchedule)
    }

    return (
        <div className="grid grid-cols-3 gap-4 items-center">
            <InputScheduleTitle text="Day" />
            <InputScheduleTitle text="Start time" />
            <InputScheduleTitle text="End time" />
            
            {
                schedule.map ( item =>
                    <InputScheduleItem item={item} onValueChange={(v,d,t) => onValueChange(v,d,t)} />
                )
            }

        </div>
    );
};