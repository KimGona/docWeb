import React from 'react';
import ImageFilled from "../resources/radio_button_filled.png";
import ImageEmpty from "../resources/radio_button_empty.png";

function getIcon(id, chosenId) {
    if (id == chosenId) {
        return ImageFilled;
    } else {
        return ImageEmpty;
    }
}

export default function RadioButton({
    chosenButtonId,
    onButtonChosen
}) {
    return (
        // TODO: make into dynamic list
        <div className='flex flex-col space-y-4'>
            <div 
                className='border border-2 border-lime-500 rounded-md py-4 px-8  w-full flex flex-row space-x-4 items-center'
                onClick={onButtonChosen} >
                <img src={getIcon(1, chosenButtonId)} alt="radio button" />
                <p className='font-semibold text-lg'>Doctor</p>
            </div>
            <div 
                className='border border-2 border-lime-500 rounded-md py-4 px-8  w-full flex flex-row space-x-4 items-center'
                onClick={onButtonChosen} >
                <img src={getIcon(2, chosenButtonId)} alt="radio button" />
                <p className='font-semibold text-lg'>Doctor 2</p>
            </div>
        </div>
    );
};