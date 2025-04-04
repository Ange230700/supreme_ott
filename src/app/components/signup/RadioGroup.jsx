// src\app\components\signup\RadioGroup.jsx

"use client";
import React from "react";
import PropTypes from 'prop-types';

export default function RadioGroup({
    name,
    options = [],
    selectedValue,
    onChange,
    containerClassName = "input-container-2",
    labelClassName = "radio-label",
}) {
    return (
        <div className={containerClassName}>
            {options.map((option) => (
                <label key={option} className={labelClassName}>
                    <input
                        type="radio"
                        name={name}
                        value={option}
                        checked={selectedValue === option}
                        onChange={onChange}
                    />
                    {option}
                </label>
            ))}
        </div>
    );
}

RadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    containerClassName: PropTypes.string,
    labelClassName: PropTypes.string,
}
