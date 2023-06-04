import React, { useState, useEffect } from 'react';
import { CustomInput } from '../../customInput/CustomInput';

type AmrapState = {
    time: number;
};

interface InputAmrapProps {
    onStateChange: (newState: AmrapState) => void;
}

export const InputAmrap : React.FC<InputAmrapProps> = ({ onStateChange }) => {

    return (

        <div>
            Custom Imput Amrap
        </div>
    )

}