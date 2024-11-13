import { supabase } from '$lib/supabaseClient';

/**
 * Fetches a specific homework by its ID.
 * @param {number} id - The ID of the homework to fetch.
 * @returns {Promise<any>} - A promise that resolves to the fetched homework data.
 */
export let _fetchSpecificHomework = async (id: number) => {
	const { data: homework } = await supabase.from('homeworks').select('*').match({ id });
	return homework;
};

/**
 * Shares a specific homework with a receiver.
 * @param {number} id - The ID of the homework to share.
 * @param {string} receiver - The email of the receiver.
 * @param {string} message - A message to include with the shared homework.
 * @returns {Promise<void>} - A promise that resolves when the homework is shared.
 */
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

/**
 * Retrieves all shared homework for the currently authenticated user.
 * @returns {Promise<any>} - A promise that resolves to the shared homework data.
 */
export let _getSharedHomework = async () => {
	const { data: sharedHomework } = await supabase
		.from('shared_homeworks')
		.select('*')
		.match({ receiver: (await supabase.auth.getUser()).data.user?.email });
	return sharedHomework;
};
