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

export default function RadioButtonVisitTypeList({
    list,
    chosenButtonId,
    onButtonChosen
}) {
    return (
        <div className='flex flex-col space-y-10'>
            {list.map( item =>
            <div
                key={item.id} 
                className='border border-[3px] border-greenPrimary rounded-md py-6 px-8 w-full transition duration-150 ease-in-out active:bg-neutral-200'
                onClick={() => onButtonChosen(item.id)} 
            >
                <div className=' flex flex-row space-x-4 items-center'>
                    <img src={getIcon(item.id, chosenButtonId)} alt="radio button" />
                    <div>
                        <p className='font-medium text-2xl pb-2 pl-4'>{item.description}</p>
                    </div>
                </div>
            </div>
            ) }
        </div>
    );
};