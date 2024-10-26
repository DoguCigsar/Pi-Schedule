import { supabase } from '$lib/supabaseClient';

export let _fetchSpecificHomework = async (id: number) => {
	const { data: homework } = await supabase.from('homeworks').select('*').match({ id });
	return homework;
};

export let _shareHomework = async (id: number, receiver: string, message: string) => {
	const homework = await _fetchSpecificHomework(id);
	if (!homework || homework.length === 0) {
		console.error('Error fetching homework or no homework found with id:', id);
		return;
	}
	let selectedHomework = homework[0];
	console.log(selectedHomework.data);
	const { data, error } = await supabase.from('shared_homeworks').insert({
		data: homework[0].data,
		due_date: homework[0].due_date,
		receiver: receiver,
		message: message
	});
};

export let _getSharedHomework = async () => {
	const { data: sharedHomework } = await supabase
		.from('shared_homeworks')
		.select('*')
		.match({ receiver: (await supabase.auth.getUser()).data.user?.email });
	return sharedHomework;
};
