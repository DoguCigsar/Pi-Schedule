export let getTimeLeft = (dueDate: Date = new Date()) => {
	const today = new Date();

	// Get day difference between two dates
	const diff_millis = dueDate.getTime() - today.getTime();
	const diff_days = Math.floor(diff_millis / (1000 * 60 * 60 * 24));
	switch (diff_days) {
		case 0:
			return 'Today';
		case 1:
			return 'Tomorrow';
		case -1:
			return 'Yesterday';
		default:
			if (diff_days > 0) {
				return `${diff_days} days left`;
			} else {
				return `${Math.abs(diff_days)} days ago`;
			}
	}
};
