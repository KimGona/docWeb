import ColoredText from "./ColoredText";
import InputField from "./InputField";

export default function DoctorScheduleInput({schedule, setSchedule}) {

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
        <div className="pt-4 w-full grid grid-cols-2 gap-x-60 justify-items-start">
                <div className="flex flex-row gap-4">
                    {schedule.map((day, index) => (
                    <div className="flex flex-col gap-2 sm:p-4 bg-gray-50 even:bg-gray-100">
                        <p className="text-sm font-bold">{day.dayName}</p>

                        <div className="flex-wrap w-auto flex-shrink-0"><ColoredText text="Start" bgColor="bg-blue-500" /></div>
                        <InputField type="number" width="w-[70px]" value={day.start} onValueChange={(value) => onValueChange(value, day.dayName, "start")}/>

                        <ColoredText text="End" bgColor="bg-blue-500" />
                        <InputField type="number" width="w-[70px]" value={day.end} onValueChange={(value) => onValueChange(value, day.dayName, "end")}/>
                        </div>
                    ))}
                </div>
            </div>
    );
};