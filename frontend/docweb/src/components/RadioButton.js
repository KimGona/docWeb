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

export default function RadioButtonList({
    list,
    chosenButtonId,
    onButtonChosen
}) {
    return (
        <div className='flex flex-col space-y-4'>
            {list.map( item =>
            <div
                key={item.id}
                className='border border-2 border-lime-500 rounded-md py-4 px-8  w-full flex flex-row space-x-4 items-center  transition duration-150 ease-in-out active:bg-neutral-200'
                onClick={() => onButtonChosen(item.id)} >
                <img src={getIcon(item.id, chosenButtonId)} alt="radio button" />
                <p className='font-semibold text-lg'>{item.name}</p>
            </div>
            ) }
        </div>
    );
};