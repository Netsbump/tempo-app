import styles from './FinishedMessage.module.css'
interface FinishedMessageProps {
    rounds : number
}
export const FinishedMessage : React.FC<FinishedMessageProps> = ({rounds}) => {

    return (

        <div className={styles.completed}>
            {`${rounds} ROUNDS COMPLETED`}
        </div>
    )
}