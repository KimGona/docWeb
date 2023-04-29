import React from "react";

export default function HorizontalLineWithText() {
    return (
        <div class="inline-flex items-center justify-center w-full">
            <hr class="w-64 h-px bg-gray-400 border-0 dark:bg-gray-700" />
            <span class="absolute px-3 font-medium text-gray-400 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">or</span>
        </div>
    );
}