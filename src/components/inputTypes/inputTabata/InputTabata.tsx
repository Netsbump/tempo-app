import React, { useState, useEffect } from 'react';
import { CustomInput } from '../../customInput/CustomInput';

type TabataState = {
    time: number;
};

interface InputTabataProps {
    onStateChange: (newState: TabataState) => void;
}

export const InputTabata : React.FC<InputTabataProps> = ({ onStateChange }) => {

    return (

        <div>
            Custom Imput Tabata
        </div>
    )

}