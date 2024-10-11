import React, { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

interface Option {
    label: string;
    value: string | boolean;
}

interface SelectInputProps {
    selectedValue?: string | null;
    placeholder?: string;
    options: Option[];
    onChange?: (value: string | null) => void;
}

function SelectInput({
    selectedValue = "",
    placeholder = "Filter by ",
    options = [],
    onChange
}: SelectInputProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function handleOptionClick(value: string | boolean) {
        const newValue = selectedValue === value.toString() ? "" : value.toString();
        setIsOpen(false);

        if (onChange) {
            onChange(newValue);
        }
    }

    function toggleDropdown() {
        setIsOpen(prev => !prev);
    }

    // Find the label for the selected value
    const selectedLabel = options.find(option => option.value.toString() === selectedValue)?.label;

    return (
        <div className="relative group min-w-28 h-full min-h-10 max-h-10 bg-white rounded-sm">
            <div
                className="relative flex items-center justify-between gap-1.5 px-3.5 py-2 cursor-pointer opacity-75"
                onClick={toggleDropdown}
            >
                <span>
                    {selectedLabel || placeholder} 
                </span>
                <HiOutlineChevronDown className={`${isOpen ? "rotate-180" : ""} transition-all duration-300`} />
            </div>

            {/* Custom Dropdown Menu */}
            {isOpen && (
                <div className="absolute mt-0.5 w-full bg-white border border-opacity-25 rounded-sm shadow z-10">
                    {options.map((option) => (
                        <div
                            key={option.value.toString()}
                            className={`px-3 py-2 hover:bg-primary-bg cursor-pointer ${selectedValue === option.value.toString() ? 'bg-primary-bg' : ''}`}
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectInput;
