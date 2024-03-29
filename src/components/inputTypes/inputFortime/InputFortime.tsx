import React, { useState, useEffect } from 'react';
import { CustomInput } from '../../customInput/CustomInput';

type FortimeState = {
    time: number;
};

interface InputFortimeProps {
    onStateChange: (newState: FortimeState) => void;
}

export const InputFortime : React.FC<InputFortimeProps> = ({ onStateChange }) => {

    return (

        <div>
            "For Time Timer" is currently under development. Stay tuned!"
        </div>
    )

}