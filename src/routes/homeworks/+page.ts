import { supabase } from '$lib/supabaseClient';

export let _fetchHomeworks = async () => {
	const { data: homeworks } = await supabase.from('homeworks').select('*');
	return homeworks;
};

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

export let _deleteHomework = async (id: number) => {
	const { error } = await supabase.from('homeworks').delete().match({ id });
	if (error) {
		console.error('Error deleting homework:', error.message);
		return;
	}
	return true;
};

export let _fetchTimetable = async () => {
	const { data: timetableData, error } = await supabase.from('time_tables').select();
	if (error) {
		console.error('Error fetching timetables:', error.message);
		return;
	}
	return timetableData;
};
