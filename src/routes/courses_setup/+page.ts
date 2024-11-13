import { goto } from '$app/navigation';
import { supabase } from '$lib/supabaseClient';

/**
 * Fetches timetables from the database.
 * @returns {Promise<any>} The fetched timetable data.
 */
export let _fetchTimetables = async () => {
	const { data: timetableData, error } = await supabase.from('time_tables').select();
	if (error) {
		console.error('Error fetching timetables:', error.message);
		return;
	}
	return timetableData;
};

/**
 * Adds a new timetable to the database.
 * @param {any} timetable - The timetable data to add.
 * @returns {Promise<any>} The added timetable data.
 */
export let _addTimetable = async (timetable: any) => {
	const { data, error } = await supabase.from('time_tables').upsert({
		period_1: timetable[0],
		period_2: timetable[1],
		period_3: timetable[2],
		period_4: timetable[3]
	});
	if (error) {
		console.error('Error adding timetable:', error.message);
		return;
	} else {
		goto('/');
	}
	return data;
};

/**
 * Updates an existing timetable in the database.
 * @param {any} timetable - The timetable data to update.
 * @returns {Promise<any>} The updated timetable data.
 */
export let _updateTimetable = async (timetable: any) => {
	const { data, error } = await supabase
		.from('time_tables')
		.update({
			period_1: timetable[0],
			period_2: timetable[1],
			period_3: timetable[2],
			period_4: timetable[3]
		})
		.eq('owner', (await supabase.auth.getUser()).data.user?.id);
	if (error) {
		console.error('Error adding timetable:', error.message);
		return;
	} else {
		goto('/');
	}
	return data;
};
