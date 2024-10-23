import { goto } from '$app/navigation';
import { supabase } from '$lib/supabaseClient';

export let _fetchTimetables = async () => {
	const { data: timetableData, error } = await supabase.from('time_tables').select();
	if (error) {
		console.error('Error fetching timetables:', error.message);
		return;
	}
	return timetableData;
};

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
