import { supabase } from '$lib/supabaseClient';

/**
 * Fetches all homeworks from the 'homeworks' table.
 * @returns {Promise<any[]>} A promise that resolves to an array of homeworks.
 */
export let _fetchHomeworks = async () => {
	const { data: homeworks } = await supabase.from('homeworks').select('*');
	return homeworks;
};

/**
 * Inserts a new homework into the 'homeworks' table.
 * @param {string} homework - The homework data.
 * @param {number} classId - The ID of the class.
 * @param {Date} due_date - The due date of the homework.
 * @returns {Promise<any>} A promise that resolves to the inserted homework data.
 */
export let _insertHomework = async (homework: string, classId: number, due_date: Date) => {
	const { data, error } = await supabase
		.from('homeworks')
		.insert({ due_date: due_date, data: homework, class: classId });
	if (error) {
		console.error('Error inserting homework:', error.message);
		return;
	}
	return data;
};

/**
 * Deletes a homework from the 'homeworks' table by ID.
 * @param {number} id - The ID of the homework to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the deletion was successful.
 */
export let _deleteHomework = async (id: number) => {
	const { error } = await supabase.from('homeworks').delete().match({ id });
	if (error) {
		console.error('Error deleting homework:', error.message);
		return;
	}
	return true;
};

/**
 * Fetches all timetables from the 'time_tables' table.
 * @returns {Promise<any[]>} A promise that resolves to an array of timetables.
 */
export let _fetchTimetable = async () => {
	const { data: timetableData, error } = await supabase.from('time_tables').select();
	if (error) {
		console.error('Error fetching timetables:', error.message);
		return;
	}
	return timetableData;
};

/**
 * Fetches all due homeworks from the 'homeworks' table.
 * @returns {Promise<any[]>} A promise that resolves to an array of due homeworks.
 */
export let _fetchDueHomeworks = async () => {
	const { data: dueHomeworks, error } = await supabase.from('homeworks').select('*');
	if (error) {
		console.error('Error fetching due homeworks:', error.message);
		return;
	}
	return dueHomeworks;
};
