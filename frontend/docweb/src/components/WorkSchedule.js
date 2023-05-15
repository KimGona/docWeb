import InputField from "./InputField";

function WorkScheduleItem({item}) {
    return (
        <>
            <p className="text-lg font-medium">{item.dayName}</p>
            <p className="text-lg  font-medium">{item.start}</p>
            <p className="text-lg  font-medium">{item.end}</p>
        </>
    );
};

function InputScheduleTitle({text}) {
    return (
        <p className="text-lg text-gray-400">{text}</p>
    );
};

export default function WorkSchedule({schedule}) {
    return (
        <div className="grid grid-cols-3 gap-4 items-center">
            <InputScheduleTitle text="Day" />
            <InputScheduleTitle text="Start time" />
            <InputScheduleTitle text="End time" />
            
            {
                schedule.map ( item =>
                    <WorkScheduleItem item={item} />
                )
            }
        </div>
    );
};