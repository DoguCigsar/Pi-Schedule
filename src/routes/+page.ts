import { supabase } from '$lib/supabaseClient';
export async function load() {
	const time_tables = await supabase.from('time_tables').select();

	return { time_table: time_tables };
}
