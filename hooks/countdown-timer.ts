import { useEffect, useState } from 'react';

const useCountdownTimer = (duration: number) => {
	const [timeLeft, setTimeLeft] = useState(duration * 60);
	const [timeUp, setTimeUp] = useState(false);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimeLeft(prevTimeLeft => {
				if (prevTimeLeft <= 0) {
					clearInterval(intervalId);
					return 0;
				}

				return prevTimeLeft - 1;
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [timeLeft]);

	useEffect(() => {
		if (timeLeft === 0) setTimeUp(true);
	}, [timeLeft]);

	const restartTimer = () => {
		setTimeLeft(duration * 60);
		setTimeUp(false);
	};

	const formatTime = (time: number): string => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	};
	
	return {
		timeLeft: formatTime(timeLeft),
		restartTimer,
		timeUp
	};
};

export default useCountdownTimer;