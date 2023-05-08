import InputField from "./InputField";

function InputScheduleItem({day}) {
    return (
        <>
            <p className="font-medium">{day}</p>
            <InputField type="number" width="w-[70px]" />
            <InputField type="number" width="w-[70px]" />
        </>
    );
};

function InputScheduleTitle({text}) {
    return (
        <p className="text-sm text-gray-400">{text}</p>
    );
};

export default function InputSchedule({}) {
    return (
        <div className="grid grid-cols-3 gap-4 items-center">
            <InputScheduleTitle text="Day" />
            <InputScheduleTitle text="Start time" />
            <InputScheduleTitle text="End time" />
            
            <InputScheduleItem day="Monday" />
            <InputScheduleItem day="Tuesday" />
            <InputScheduleItem day="Wednesday" />
            <InputScheduleItem day="Thursday" />
            <InputScheduleItem day="Friday" />

        </div>
    );
};