// src\app\components\CustomToast.jsx

import React, { forwardRef } from 'react';
import { Toast } from 'primereact/toast';
import "primeicons/primeicons.css";

const CustomToast = forwardRef((props, ref) => {
    const customContent = ({ message }) => {
        let bgColor = 'bg-black-alpha-90';
        let icon = 'pi pi-info-circle';

        if (message.severity === 'success') {
            bgColor = 'bg-green-500';
            icon = 'pi pi-check-circle';
        } else if (message.severity === 'error') {
            bgColor = 'bg-red-500';
            icon = 'pi pi-times-circle';
        }

        return (
            <section
                className={`flex p-3 gap-3 w-full ${bgColor} shadow-2 fadeindown`}
                style={{ borderRadius: '10px' }}
            >
                <i className={`${icon} text-white text-2xl`}></i>
                <div className="flex flex-column gap-3 w-full">
                    <p className="m-0 font-semibold text-base text-white">
                        {message.summary}
                    </p>
                    <p className="m-0 text-base text-white">
                        {message.detail}
                    </p>
                </div>
            </section>
        );
    };

    return <Toast ref={ref} content={customContent} {...props} />;
});

export default CustomToast;

