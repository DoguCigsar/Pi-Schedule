import { supabase } from './supabaseClient';

/**
 * Accepts shared homework by moving it to the homeworks table and deleting it from the shared_homeworks table.
 * @param {number} id - The ID of the shared homework to accept.
 * @param {number} period - The class period to assign the homework to.
 * @returns {Promise<void>}
 */
export let acceptSharedHomework = async (id: number, period: number): Promise<void> => {
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

/**
 * Rejects shared homework by deleting it from the shared_homeworks table.
 * @param {number} id - The ID of the shared homework to reject.
 * @returns {Promise<void>}
 */
export const rejectSharedHomework = async (id: number): Promise<void> => {
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
