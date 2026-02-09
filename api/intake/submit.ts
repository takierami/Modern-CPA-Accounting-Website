
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { data } = req.body;

    if (!supabaseUrl || !supabaseKey) {
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        const { error } = await supabase
            .from('client_intakes')
            .insert([
                {
                    data: data,
                    created_at: new Date().toISOString(),
                    status: 'submitted'
                }
            ]);

        if (error) throw error;

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Intake error:', error);
        return res.status(500).json({ error: 'Failed to submit intake form' });
    }
}
