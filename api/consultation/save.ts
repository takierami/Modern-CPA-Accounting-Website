
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { formId, currentStep, data } = req.body;

    if (!supabaseUrl || !supabaseKey) {
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        // Upsert into 'consultation_drafts' table
        const { error } = await supabase
            .from('consultation_drafts')
            .upsert(
                { form_id: formId, current_step: currentStep, data: data, updated_at: new Date().toISOString() },
                { onConflict: 'form_id' }
            );

        if (error) throw error;

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Save error:', error);
        return res.status(500).json({ error: 'Failed to save progress' });
    }
}
