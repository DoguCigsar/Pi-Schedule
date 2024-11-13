import { supabase } from '$lib/supabaseClient';

/**
 * Fetches all homeworks.
 * @returns {Promise<any>} - A promise that resolves to the fetched homeworks data.
 */
export let _fetchHomeworks = async () => {
	const { data: homeworks } = await supabase.from('homeworks').select('*');
	return homeworks;
};

/**
 * Inserts a new homework.
 * @param {string} homework - The homework data to insert.
 * @param {number} classId - The ID of the class the homework belongs to.
 * @param {Date} due_date - The due date of the homework.
 * @returns {Promise<any>} - A promise that resolves to the inserted homework data.
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
 * Deletes a specific homework by its ID.
 * @param {number} id - The ID of the homework to delete.
 * @returns {Promise<boolean>} - A promise that resolves to true if the homework was deleted successfully.
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
 * Fetches the timetable data.
 * @returns {Promise<any>} - A promise that resolves to the fetched timetable data.
 */
export let _fetchTimetable = async () => {
	const { data: timetableData, error } = await supabase.from('time_tables').select();
	if (error) {
		console.error('Error fetching timetables:', error.message);
		return;
	}
	return timetableData;
};
