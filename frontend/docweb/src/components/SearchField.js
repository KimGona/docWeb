import React from 'react';

export default function SearchField({
    text,
    onTextChange
}) {
    return (
        <input
            value={text}
            onChange={onTextChange}
            placeholder="Input name or specialty..."
            className="w-full border border-2 rounded-full border-zinc-700 focus:outline-pink-500 py-4 px-6 "
        />
    );
};
