export const isDay2 = () => {
	// September 4th 2024 in local time
	const date_check_start = new Date(2025, 0, 0);
	const now = new Date();

	let list_of_holidays = [
		new Date(2024, 9, 11).toDateString(), // PA Day (11th of October)
		new Date(2024, 9, 14).toDateString(), // Thanksgiving (14th of October)
		new Date(2024, 10, 1).toDateString(), // Random no day-switch day (1st of November)
	];

	let isDay2 = false;

	// Iterate through the days until we reach today with console logging
	for (let i = date_check_start; i < now; i.setDate(i.getDate() + 1)) {
		// Convert current date to string for comparison
		let currentDateStr = i.toDateString();

		// If the day is a holiday then we skip it
		if (list_of_holidays.includes(currentDateStr)) {
			//console.log(`Skipping holiday: ${currentDateStr}`);
			continue;
		}
		// If the day is a weekend then we skip it
		if (i.getDay() === 0 || i.getDay() === 6) {
			//console.log(`Skipping weekend: ${currentDateStr}`);
			continue;
		}
		// If the day is a weekday then we increment the day counter
		//console.log(`Counting day: ${currentDateStr}, isDay2: ${isDay2}`);
		isDay2 = !isDay2;
	}
	return isDay2;
};
