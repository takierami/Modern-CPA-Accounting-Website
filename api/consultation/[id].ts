
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
    const { id } = req.query;

    if (!supabaseUrl || !supabaseKey) {
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    if (req.method === 'GET') {
        try {
            const { data, error } = await supabase
                .from('consultation_drafts')
                .select('*')
                .eq('form_id', id)
                .single();

            if (error) {
                if (error.code === 'PGRST116') { // Not found
                    return res.status(404).json({ error: 'Draft not found' });
                }
                throw error;
            }

            return res.status(200).json(data);
        } catch (error) {
            console.error('Fetch error:', error);
            return res.status(500).json({ error: 'Failed to fetch draft' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const { error } = await supabase
                .from('consultation_drafts')
                .delete()
                .eq('form_id', id);

            if (error) throw error;

            return res.status(200).json({ success: true });
        } catch (error) {
            console.error('Delete error:', error);
            return res.status(500).json({ error: 'Failed to delete draft' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
