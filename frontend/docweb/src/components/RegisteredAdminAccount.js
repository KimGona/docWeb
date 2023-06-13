import { useRadioGroup } from "@mui/material";

export default function RegisteredAdminAccount({user}) {
    return (
        <div className="w-full border border-[3px] border-greenPrimary rounded-xl">
            <div className="w-full h-[50px] border border-[3px] border-greenPrimary bg-greenPrimary rounded-t-md flex flex-row space-x-6 items-center">
                <p className="pl-6 text-xl text-white font-normal">{user.username}</p>
            </div>

            <div className="flex flex-col space-y-2 py-6 px-6">
                <p className="text-lg">Role: {user.role}</p>
            </div>
        </div>
    );
};