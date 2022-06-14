
	let wakeLock;
	const acquireWakeLock = async () => {
		if ('wakeLock' in navigator) {
			try {
				wakeLock = await navigator.wakeLock.request('screen');
				console.log('Wake lock is activated.');
			} catch (err) {
				console.log(err);
			}
		}
	};
	const releaseWakeLock = async () => {
		if ('wakeLock' in navigator) {
			try {
				wakeLock.release();
				console.log('Wake lock has been released.');
			} catch (err) {
				console.log(err);
			}
		}
	};

    export { acquireWakeLock, releaseWakeLock };
