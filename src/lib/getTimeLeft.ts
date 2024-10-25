export let getTimeLeft = (dueDate: Date = new Date()) => {
	const today = new Date();

	// Get day difference between two dates
	const diff_millis = dueDate.getTime() - today.getTime();
	const diff_days = Math.floor(diff_millis / (1000 * 60 * 60 * 24));
};
