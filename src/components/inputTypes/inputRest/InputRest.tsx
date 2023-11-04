type RestState = {
    time: number;
};

interface InputRestProps {
    onStateChange: (newState: RestState) => void;
}

export const InputRest : React.FC<InputRestProps> = ({ onStateChange }) => {

    return (

        <div>
            "Rest Timer" is currently under development. Stay tuned!"
        </div>
    )

}