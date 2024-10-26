import { supabase } from './supabaseClient';

export let acceptSharedHomework = async (id: number, period: number) => {
	const { data: sharedHomework } = await supabase
		.from('shared_homeworks')
		.select('*')
		.match({ id });
	if (!sharedHomework || sharedHomework.length === 0) {
		console.error('Error fetching shared homework or no shared homework found with id:', id);
		return;
	}
	let selectedSharedHomework = sharedHomework[0];
	console.log(selectedSharedHomework.data);
	const { data, error } = await supabase.from('homeworks').insert({
		data: sharedHomework[0].data,
		due_date: sharedHomework[0].due_date,
		class: period
	});
	const { data: sharedHomeworkData, error: sharedHomeworkError } = await supabase
		.from('shared_homeworks')
		.delete()
		.match({ id });
};

export const rejectSharedHomework = async (id: number) => {
	const { data: sharedHomework } = await supabase
		.from('shared_homeworks')
		.select('*')
		.match({ id });
	if (!sharedHomework || sharedHomework.length === 0) {
		console.error('Error fetching shared homework or no shared homework found with id:', id);
		return;
	}
	let selectedSharedHomework = sharedHomework[0];
	console.log(selectedSharedHomework.data);
	const { data, error } = await supabase.from('shared_homeworks').delete().match({ id });
};
