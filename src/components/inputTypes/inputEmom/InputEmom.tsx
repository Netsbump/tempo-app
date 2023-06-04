import React, { useState, useEffect } from 'react';
import { CustomInput } from '../../customInput/CustomInput';

type EmomState = {
    time: number;
};

interface InputEmomProps {
    onStateChange: (newState: EmomState) => void;
}

export const InputEmom : React.FC<InputEmomProps> = ({ onStateChange }) => {

    return (

        <div>
            Custom Imput Emom
        </div>
    )

}