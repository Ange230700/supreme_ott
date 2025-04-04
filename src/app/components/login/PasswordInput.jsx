// src\app\components\login\PasswordInput.jsx

"use client";
import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { InputText } from "primereact/inputtext";
import PropTypes from 'prop-types';

export default function PasswordInput({ name, value, onChange, placeholder, className, ...props }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="input-container p-inputgroup">
            <InputText
                type={showPassword ? "text" : "password"}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={className}
                {...props}
            />
            <button
                type="button"
                className="show p-inputgroup-addon"
                onClick={() => setShowPassword(prev => !prev)}
            >
                {showPassword ? <EyeOff /> : <Eye />}
            </button>
        </div>
    );
}

PasswordInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    ...PropTypes.any
}

