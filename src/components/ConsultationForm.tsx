import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';

import { supabase } from '../utils/supabase-client';
import * as kv from '../supabase/functions/server/kv_store';

interface ConsultationFormData {
  // Step 1: Client Type & Service
  clientType: 'individual' | 'business';
  serviceNeeded: string;

  // Step 2: Details
  businessSize?: string;
  incomeRange?: string;

  // Step 3: Contact Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName?: string;

  // Step 4: Scheduling
  preferredDate: string;
  preferredTime: string;
  message?: string;

  // Consent
  consent: boolean;
}

export function ConsultationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle');
  const [formId, setFormId] = useState<string>('');

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ConsultationFormData>({
    defaultValues: {
      clientType: 'business',
      consent: false
    }
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;
  const clientType = watch('clientType');

  // Generate unique form ID on mount
  useEffect(() => {
    const id = `consultation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setFormId(id);

    // Try to load saved progress
    loadSavedProgress(id);
  }, []);

  // Auto-save form data
  useEffect(() => {
    const subscription = watch((data) => {
      if (formId && currentStep > 0) {
        autoSaveFormData(data);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, formId, currentStep]);

  const loadSavedProgress = async (id: string) => {
    try {
      const response = await fetch(`/api/consultation/${id}`);

      if (response.ok) {
        const savedData = await response.json();
        // Determine if we got the raw data or if it's wrapped
        const formData = savedData.data || savedData;

        if (formData) {
          Object.keys(formData).forEach(key => {
            setValue(key as any, formData[key]);
          });
          if (savedData.current_step || savedData.currentStep) {
            setCurrentStep(savedData.current_step || savedData.currentStep);
          }
        }
      }
    } catch (error) {
      console.log('No saved progress found');
    }
  };

  const autoSaveFormData = async (data: any) => {
    setSaveStatus('saving');
    try {
      await fetch('/api/consultation/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId,
          currentStep,
          data: { ...data, currentStep }
        })
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Auto-save failed:', error);
      setSaveStatus('idle');
    }
  };

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/consultation/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formId, data })
      });

      if (response.ok) {
        setIsSuccess(true);
        // Clear saved progress
        await fetch(`/api/consultation/${formId}`, {
          method: 'DELETE',
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center"
      >
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-2xl text-white mb-4">Consultation Scheduled!</h3>
        <p className="text-slate-400 mb-6">
          Thank you for reaching out. We've received your consultation request and
          will contact you within 24 hours to confirm your appointment.
        </p>
        <p className="text-sm text-slate-500">
          A confirmation email has been sent to your inbox.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-slate-400">Step {currentStep} of {totalSteps}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-emerald-400">{Math.round(progress)}% Complete</span>
            {saveStatus === 'saving' && (
              <span className="text-xs text-slate-500">Saving...</span>
            )}
            {saveStatus === 'saved' && (
              <span className="text-xs text-emerald-500">✓ Saved</span>
            )}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {/* Step 1: Client Type & Service */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl text-white mb-6">Tell Us About You</h3>

              <div className="space-y-6">
                <div>
                  <Label className="text-white mb-3 block">I am a:</Label>
                  <RadioGroup
                    value={clientType}
                    onValueChange={(value) => setValue('clientType', value as 'individual' | 'business')}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="individual" id="individual" className="peer sr-only" />
                      <Label
                        htmlFor="individual"
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-slate-700 bg-slate-800/50 p-6 hover:bg-slate-800 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-500/10 cursor-pointer transition-all"
                      >
                        <span className="text-white">Individual</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="business" id="business" className="peer sr-only" />
                      <Label
                        htmlFor="business"
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-slate-700 bg-slate-800/50 p-6 hover:bg-slate-800 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-500/10 cursor-pointer transition-all"
                      >
                        <span className="text-white">Business</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="serviceNeeded" className="text-white mb-3 block">
                    What service do you need?
                  </Label>
                  <Select onValueChange={(value) => setValue('serviceNeeded', value)}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue placeholder="Select a service" className="text-white" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="tax-prep" className="text-white">Tax Preparation & Planning</SelectItem>
                      <SelectItem value="bookkeeping" className="text-white">Bookkeeping</SelectItem>
                      <SelectItem value="payroll" className="text-white">Payroll Services</SelectItem>
                      <SelectItem value="financial-reporting" className="text-white">Financial Reporting</SelectItem>
                      <SelectItem value="advisory" className="text-white">Business Advisory</SelectItem>
                      <SelectItem value="audit" className="text-white">Audit & Assurance</SelectItem>
                      <SelectItem value="other" className="text-white">Other / Not Sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Business Details */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl text-white mb-6">
                {clientType === 'business' ? 'Business Details' : 'Income Information'}
              </h3>

              <div className="space-y-6">
                {clientType === 'business' ? (
                  <div>
                    <Label htmlFor="businessSize" className="text-white mb-3 block">
                      Business Size (Annual Revenue)
                    </Label>
                    <Select onValueChange={(value) => setValue('businessSize', value)}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="0-100k" className="text-white">$0 - $100,000</SelectItem>
                        <SelectItem value="100k-500k" className="text-white">$100,000 - $500,000</SelectItem>
                        <SelectItem value="500k-1m" className="text-white">$500,000 - $1M</SelectItem>
                        <SelectItem value="1m-5m" className="text-white">$1M - $5M</SelectItem>
                        <SelectItem value="5m+" className="text-white">$5M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="incomeRange" className="text-white mb-3 block">
                      Annual Income Range
                    </Label>
                    <Select onValueChange={(value) => setValue('incomeRange', value)}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="0-50k" className="text-white">$0 - $50,000</SelectItem>
                        <SelectItem value="50k-100k" className="text-white">$50,000 - $100,000</SelectItem>
                        <SelectItem value="100k-200k" className="text-white">$100,000 - $200,000</SelectItem>
                        <SelectItem value="200k-500k" className="text-white">$200,000 - $500,000</SelectItem>
                        <SelectItem value="500k+" className="text-white">$500,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label className="text-white mb-3 block">
                    How soon do you need services?
                  </Label>
                  <RadioGroup defaultValue="1-2weeks" className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="immediate" id="immediate" className="border-slate-400 text-emerald-400" />
                      <Label htmlFor="immediate" className="text-slate-300 cursor-pointer">
                        Immediately
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-2weeks" id="1-2weeks" className="border-slate-400 text-emerald-400" />
                      <Label htmlFor="1-2weeks" className="text-slate-300 cursor-pointer">
                        Within 1-2 weeks
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1month" id="1month" className="border-slate-400 text-emerald-400" />
                      <Label htmlFor="1month" className="text-slate-300 cursor-pointer">
                        Within a month
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="planning" id="planning" className="border-slate-400 text-emerald-400" />
                      <Label htmlFor="planning" className="text-slate-300 cursor-pointer">
                        Just planning ahead
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Contact Information */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl text-white mb-6">Contact Information</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white">First Name *</Label>
                    <Input
                      id="firstName"
                      {...register('firstName', { required: true })}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <span className="text-red-400 text-sm">Required</span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">Last Name *</Label>
                    <Input
                      id="lastName"
                      {...register('lastName', { required: true })}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <span className="text-red-400 text-sm">Required</span>
                    )}
                  </div>
                </div>

                {clientType === 'business' && (
                  <div>
                    <Label htmlFor="companyName" className="text-white">Company Name</Label>
                    <Input
                      id="companyName"
                      {...register('companyName')}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                      placeholder="Acme Corporation"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="email" className="text-white">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    className="bg-slate-800 border-slate-700 text-white mt-2"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <span className="text-red-400 text-sm">Valid email required</span>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone', { required: true })}
                    className="bg-slate-800 border-slate-700 text-white mt-2"
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && (
                    <span className="text-red-400 text-sm">Required</span>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Scheduling & Message */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl text-white mb-6">Schedule Your Consultation</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="preferredDate" className="text-white">Preferred Date *</Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      {...register('preferredDate', { required: true })}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="preferredTime" className="text-white">Preferred Time *</Label>
                    <Select onValueChange={(value) => setValue('preferredTime', value)}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-2">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="9am" className="text-white">9:00 AM</SelectItem>
                        <SelectItem value="10am" className="text-white">10:00 AM</SelectItem>
                        <SelectItem value="11am" className="text-white">11:00 AM</SelectItem>
                        <SelectItem value="1pm" className="text-white">1:00 PM</SelectItem>
                        <SelectItem value="2pm" className="text-white">2:00 PM</SelectItem>
                        <SelectItem value="3pm" className="text-white">3:00 PM</SelectItem>
                        <SelectItem value="4pm" className="text-white">4:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-white">
                    Additional Information (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    {...register('message')}
                    className="bg-slate-800 border-slate-700 text-white mt-2 min-h-[120px]"
                    placeholder="Tell us more about your needs or any questions you have..."
                  />
                </div>

                <div className="flex items-start space-x-3 pt-4">
                  <Checkbox
                    id="consent"
                    checked={watch('consent')}
                    onCheckedChange={(checked) => setValue('consent', checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="consent" className="text-slate-400 text-sm cursor-pointer leading-relaxed">
                    I consent to Sterling & Associates CPA contacting me about my consultation
                    request. I understand my information will be kept confidential and used only
                    for the purpose of providing accounting services.
                  </Label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-slate-800">
          {currentStep > 1 ? (
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting || !watch('consent')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Schedule Consultation'
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}