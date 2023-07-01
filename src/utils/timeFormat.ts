export const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    const seconds = time - (hours * 3600) - (minutes * 60);

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    if (hours === 0) {
        if (minutes === 0) {
            return formattedSeconds;
        }
        return `${formattedMinutes}:${formattedSeconds}`;
    }
    
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}