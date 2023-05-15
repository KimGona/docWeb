import React from 'react';
import ImageFilled from "../resources/radio_button_filled.png";
import ImageEmpty from "../resources/radio_button_empty.png";

function getIcon(value, chosenValue) {
    if (value == chosenValue) {
        return ImageFilled;
    } else {
        return ImageEmpty;
    }
}

function getStyle(value, chosenValue) {
    if (value == chosenValue) {
        return 'border border-[2px] border-pink-500 rounded-md py-[5px] px-2 w-full transition duration-150 ease-in-out active:bg-neutral-200';
    } else {
        return 'border border-[2px] border-zinc-500 rounded-md py-[5px] px-2 w-full transition duration-150 ease-in-out active:bg-neutral-200';
    }
}

function RadioItem({id, value, chosenValue, onButtonChosen}) {
    return (
        <div
            key={id} 
            className={getStyle(value, chosenValue)}
            onClick={() => onButtonChosen(value)} 
        >
            <div className=' flex flex-row space-x-4 items-center'>
                <img src={getIcon(value, chosenValue)} alt="radio button" width={20} />
                <div>
                    <p className='font-normal text-lg '>{value}</p>
                </div>
            </div>
        </div>
    );
}

export default function RadioButtonGenderList({chosenValue, onButtonChosen}) {
    return (
        <div className='flex flex-row space-x-4'>
            <RadioItem id={1} value="female" chosenValue={chosenValue} onButtonChosen={onButtonChosen} />
            <RadioItem id={2} value="male" chosenValue={chosenValue} onButtonChosen={onButtonChosen} />
        </div>
    )
}