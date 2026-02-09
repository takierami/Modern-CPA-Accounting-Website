import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Consultation Form Routes
app.post('/make-server-d900d137/consultation/save', async (c) => {
  try {
    const { formId, currentStep, data } = await c.req.json();
    
    if (!formId) {
      return c.json({ error: 'Form ID required' }, 400);
    }

    // Save form progress to KV store
    await kv.set(`consultation_progress:${formId}`, {
      ...data,
      currentStep,
      lastSaved: new Date().toISOString()
    });

    return c.json({ success: true, message: 'Progress saved' });
  } catch (error) {
    console.error('Error saving consultation progress:', error);
    return c.json({ error: 'Failed to save progress' }, 500);
  }
});

app.get('/make-server-d900d137/consultation/:formId', async (c) => {
  try {
    const { formId } = c.req.param();
    
    if (!formId) {
      return c.json({ error: 'Form ID required' }, 400);
    }

    // Retrieve saved progress
    const savedData = await kv.get(`consultation_progress:${formId}`);
    
    if (!savedData) {
      return c.json(null, 404);
    }

    return c.json(savedData);
  } catch (error) {
    console.error('Error retrieving consultation progress:', error);
    return c.json({ error: 'Failed to retrieve progress' }, 500);
  }
});

app.delete('/make-server-d900d137/consultation/:formId', async (c) => {
  try {
    const { formId } = c.req.param();
    
    if (!formId) {
      return c.json({ error: 'Form ID required' }, 400);
    }

    // Delete saved progress after successful submission
    await kv.del(`consultation_progress:${formId}`);
    
    return c.json({ success: true, message: 'Progress cleared' });
  } catch (error) {
    console.error('Error deleting consultation progress:', error);
    return c.json({ error: 'Failed to clear progress' }, 500);
  }
});

app.post('/make-server-d900d137/consultation/submit', async (c) => {
  try {
    const { formId, data } = await c.req.json();
    
    if (!data) {
      return c.json({ error: 'Form data required' }, 400);
    }

    // Generate submission ID
    const submissionId = `consultation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Save completed consultation request
    await kv.set(`consultation_submission:${submissionId}`, {
      ...data,
      submissionId,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    });

    // Log submission (in production, this would trigger email notifications)
    console.log('Consultation submitted:', { submissionId, email: data.email });

    return c.json({ 
      success: true, 
      submissionId,
      message: 'Consultation request submitted successfully' 
    });
  } catch (error) {
    console.error('Error submitting consultation:', error);
    return c.json({ error: 'Failed to submit consultation' }, 500);
  }
});

// Client Intake Form Routes
app.post('/make-server-d900d137/intake/save', async (c) => {
  try {
    const { formId, currentStep, data } = await c.req.json();
    
    if (!formId) {
      return c.json({ error: 'Form ID required' }, 400);
    }

    // Save form progress to KV store
    await kv.set(`intake_progress:${formId}`, {
      ...data,
      currentStep,
      lastSaved: new Date().toISOString()
    });

    return c.json({ success: true, message: 'Progress saved' });
  } catch (error) {
    console.error('Error saving intake progress:', error);
    return c.json({ error: 'Failed to save progress' }, 500);
  }
});

app.get('/make-server-d900d137/intake/:formId', async (c) => {
  try {
    const { formId } = c.req.param();
    
    if (!formId) {
      return c.json({ error: 'Form ID required' }, 400);
    }

    // Retrieve saved progress
    const savedData = await kv.get(`intake_progress:${formId}`);
    
    if (!savedData) {
      return c.json(null, 404);
    }

    return c.json(savedData);
  } catch (error) {
    console.error('Error retrieving intake progress:', error);
    return c.json({ error: 'Failed to retrieve progress' }, 500);
  }
});

app.delete('/make-server-d900d137/intake/:formId', async (c) => {
  try {
    const { formId } = c.req.param();
    
    if (!formId) {
      return c.json({ error: 'Form ID required' }, 400);
    }

    // Delete saved progress after successful submission
    await kv.del(`intake_progress:${formId}`);
    
    return c.json({ success: true, message: 'Progress cleared' });
  } catch (error) {
    console.error('Error deleting intake progress:', error);
    return c.json({ error: 'Failed to clear progress' }, 500);
  }
});

app.post('/make-server-d900d137/intake/submit', async (c) => {
  try {
    const { formId, data } = await c.req.json();
    
    if (!data) {
      return c.json({ error: 'Form data required' }, 400);
    }

    // Generate submission ID
    const submissionId = `intake_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Save completed client intake
    await kv.set(`intake_submission:${submissionId}`, {
      ...data,
      submissionId,
      submittedAt: new Date().toISOString(),
      status: 'pending_review'
    });

    // Log submission (in production, this would trigger email notifications)
    console.log('Client intake submitted:', { submissionId, email: data.email });

    return c.json({ 
      success: true, 
      submissionId,
      message: 'Client intake form submitted successfully' 
    });
  } catch (error) {
    console.error('Error submitting intake:', error);
    return c.json({ error: 'Failed to submit intake' }, 500);
  }
});

// Admin route to view all submissions (for demo purposes)
app.get('/make-server-d900d137/admin/submissions', async (c) => {
  try {
    // Get all consultation submissions
    const consultations = await kv.getByPrefix('consultation_submission:');
    
    // Get all intake submissions
    const intakes = await kv.getByPrefix('intake_submission:');

    return c.json({
      consultations: consultations.map(item => item.value),
      intakes: intakes.map(item => item.value),
      total: consultations.length + intakes.length
    });
  } catch (error) {
    console.error('Error retrieving submissions:', error);
    return c.json({ error: 'Failed to retrieve submissions' }, 500);
  }
});

// Health check
app.get('/make-server-d900d137/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);
