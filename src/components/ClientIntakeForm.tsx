import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';

interface ClientIntakeFormData {
  // Step 1: Entity Information
  clientType: 'individual' | 'sole-proprietor' | 'llc' | 's-corp' | 'c-corp' | 'partnership';
  entityName?: string;
  ein?: string;
  ssn?: string;

  // Step 2: Contact Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;

  // Step 3: Services Selection
  services: string[];
  startDate: string;
  fiscalYearEnd?: string;

  // Step 4: Financial Information
  previousAccountant?: string;
  accountingSoftware?: string;
  bankAccounts?: number;
  employees?: number;

  // Step 5: Additional Details
  businessDescription?: string;
  specificNeeds?: string;

  // Consent
  consent: boolean;
  dataPrivacy: boolean;
}

export function ClientIntakeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ClientIntakeFormData>({
    defaultValues: {
      clientType: 'llc',
      services: [],
      consent: false,
      dataPrivacy: false
    }
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;
  const clientType = watch('clientType');
  const selectedServices = watch('services') || [];

  const onSubmit = async (data: ClientIntakeFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/intake/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data })
      });

      if (response.ok) {
        console.log('Client intake form submitted:', data);
        setIsSuccess(true);
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

  const toggleService = (service: string) => {
    const current = selectedServices;
    const index = current.indexOf(service);
    if (index > -1) {
      setValue('services', current.filter(s => s !== service));
    } else {
      setValue('services', [...current, service]);
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
        <h3 className="text-2xl text-white mb-4">Welcome Aboard!</h3>
        <p className="text-slate-400 mb-6">
          Thank you for choosing Sterling & Associates CPA. Your intake form has been
          submitted successfully. Our team will review your information and reach out
          within 1-2 business days to complete your onboarding.
        </p>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 text-sm text-slate-300">
          <p className="mb-2">Next Steps:</p>
          <ul className="space-y-1 text-left">
            <li>✓ Check your email for confirmation</li>
            <li>✓ Access to client portal will be sent</li>
            <li>✓ Your dedicated accountant will be assigned</li>
          </ul>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-slate-400">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm text-emerald-400">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-slate-500 mt-2">
          Your progress is being saved automatically
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {/* Step 1: Entity Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl text-white mb-6">Entity Information</h3>

              <div className="space-y-6">
                <div>
                  <Label className="text-white mb-3 block">Entity Type *</Label>
                  <RadioGroup
                    value={clientType}
                    onValueChange={(value) => setValue('clientType', value as any)}
                    className="grid grid-cols-2 gap-3"
                  >
                    {[
                      { value: 'individual', label: 'Individual' },
                      { value: 'sole-proprietor', label: 'Sole Proprietor' },
                      { value: 'llc', label: 'LLC' },
                      { value: 's-corp', label: 'S-Corporation' },
                      { value: 'c-corp', label: 'C-Corporation' },
                      { value: 'partnership', label: 'Partnership' }
                    ].map((type) => (
                      <div key={type.value}>
                        <RadioGroupItem value={type.value} id={type.value} className="peer sr-only" />
                        <Label
                          htmlFor={type.value}
                          className="flex items-center justify-center rounded-lg border-2 border-slate-700 bg-slate-800/50 p-3 hover:bg-slate-800 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-500/10 cursor-pointer transition-all text-sm text-white"
                        >
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {clientType !== 'individual' && (
                  <>
                    <div>
                      <Label htmlFor="entityName" className="text-white">
                        {clientType === 'sole-proprietor' ? 'Business Name (DBA)' : 'Legal Entity Name'} *
                      </Label>
                      <Input
                        id="entityName"
                        {...register('entityName', { required: clientType !== 'individual' })}
                        className="bg-slate-800 border-slate-700 text-white mt-2"
                        placeholder="Enter entity name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ein" className="text-white">
                        EIN (Employer Identification Number) *
                      </Label>
                      <Input
                        id="ein"
                        {...register('ein', { required: clientType !== 'individual' })}
                        className="bg-slate-800 border-slate-700 text-white mt-2"
                        placeholder="XX-XXXXXXX"
                      />
                    </div>
                  </>
                )}

                {clientType === 'individual' && (
                  <div>
                    <Label htmlFor="ssn" className="text-white">Social Security Number *</Label>
                    <Input
                      id="ssn"
                      type="password"
                      {...register('ssn', { required: clientType === 'individual' })}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                      placeholder="XXX-XX-XXXX"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Your SSN is encrypted and stored securely
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 2: Contact Details */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
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
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">Last Name *</Label>
                    <Input
                      id="lastName"
                      {...register('lastName', { required: true })}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-white">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone', { required: true })}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="text-white">Street Address *</Label>
                  <Input
                    id="address"
                    {...register('address', { required: true })}
                    className="bg-slate-800 border-slate-700 text-white mt-2"
                  />
                </div>

                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-3">
                    <Label htmlFor="city" className="text-white">City *</Label>
                    <Input
                      id="city"
                      {...register('city', { required: true })}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="state" className="text-white">State *</Label>
                    <Input
                      id="state"
                      {...register('state', { required: true })}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                      placeholder="NY"
                      maxLength={2}
                    />
                  </div>
                  <div className="col-span-1">
                    <Label htmlFor="zip" className="text-white">ZIP *</Label>
                    <Input
                      id="zip"
                      {...register('zip', { required: true })}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Services Selection */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl text-white mb-6">Services Needed</h3>

              <div className="space-y-6">
                <div>
                  <Label className="text-white mb-3 block">Select all services you need *</Label>
                  <div className="space-y-3">
                    {[
                      { id: 'tax-prep', label: 'Tax Preparation & Planning' },
                      { id: 'bookkeeping', label: 'Bookkeeping Services' },
                      { id: 'payroll', label: 'Payroll Processing' },
                      { id: 'financial-reporting', label: 'Financial Reporting' },
                      { id: 'advisory', label: 'Business Advisory' },
                      { id: 'audit', label: 'Audit & Assurance' }
                    ].map((service) => (
                      <div
                        key={service.id}
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${selectedServices.includes(service.id)
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800'
                          }`}
                      >
                        <Checkbox
                          checked={selectedServices.includes(service.id)}
                          onCheckedChange={() => toggleService(service.id)}
                        />
                        <Label
                          className="text-white cursor-pointer flex-1"
                          onClick={() => toggleService(service.id)}
                        >
                          {service.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="startDate" className="text-white">When would you like to start? *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    {...register('startDate', { required: true })}
                    className="bg-slate-800 border-slate-700 text-white mt-2"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {clientType !== 'individual' && (
                  <div>
                    <Label htmlFor="fiscalYearEnd" className="text-white">Fiscal Year End</Label>
                    <Input
                      id="fiscalYearEnd"
                      type="date"
                      {...register('fiscalYearEnd')}
                      className="bg-slate-800 border-slate-700 text-white mt-2"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 4: Financial Information */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl text-white mb-6">Financial Details</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="previousAccountant" className="text-white">
                    Previous Accountant/Firm (if any)
                  </Label>
                  <Input
                    id="previousAccountant"
                    {...register('previousAccountant')}
                    className="bg-slate-800 border-slate-700 text-white mt-2"
                    placeholder="Firm name"
                  />
                </div>

                <div>
                  <Label htmlFor="accountingSoftware" className="text-white">
                    Current Accounting Software
                  </Label>
                  <Select onValueChange={(value) => setValue('accountingSoftware', value)}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-2">
                      <SelectValue placeholder="Select software" className="text-white" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="quickbooks" className="text-white">QuickBooks</SelectItem>
                      <SelectItem value="xero" className="text-white">Xero</SelectItem>
                      <SelectItem value="freshbooks" className="text-white">FreshBooks</SelectItem>
                      <SelectItem value="wave" className="text-white">Wave</SelectItem>
                      <SelectItem value="excel" className="text-white">Excel/Spreadsheets</SelectItem>
                      <SelectItem value="none" className="text-white">None</SelectItem>
                      <SelectItem value="other" className="text-white">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {clientType !== 'individual' && (
                  <>
                    <div>
                      <Label htmlFor="bankAccounts" className="text-white">
                        Number of Bank Accounts
                      </Label>
                      <Input
                        id="bankAccounts"
                        type="number"
                        {...register('bankAccounts')}
                        className="bg-slate-800 border-slate-700 text-white mt-2"
                        min="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="employees" className="text-white">
                        Number of Employees
                      </Label>
                      <Input
                        id="employees"
                        type="number"
                        {...register('employees')}
                        className="bg-slate-800 border-slate-700 text-white mt-2"
                        min="0"
                      />
                    </div>
                  </>
                )}

                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                  <Label className="text-white mb-2 block">
                    <Upload className="w-4 h-4 inline mr-2" />
                    Upload Documents (Optional)
                  </Label>
                  <p className="text-slate-400 text-sm mb-3">
                    Tax returns, financial statements, or other relevant documents
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
                  >
                    Choose Files
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: Additional Details & Consent */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl text-white mb-6">Final Details</h3>

              <div className="space-y-6">
                {clientType !== 'individual' && (
                  <div>
                    <Label htmlFor="businessDescription" className="text-white">
                      Brief Business Description
                    </Label>
                    <Textarea
                      id="businessDescription"
                      {...register('businessDescription')}
                      className="bg-slate-800 border-slate-700 text-white mt-2 min-h-[100px]"
                      placeholder="What does your business do?"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="specificNeeds" className="text-white">
                    Specific Needs or Concerns
                  </Label>
                  <Textarea
                    id="specificNeeds"
                    {...register('specificNeeds')}
                    className="bg-slate-800 border-slate-700 text-white mt-2 min-h-[100px]"
                    placeholder="Any specific areas we should focus on or questions you have..."
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-700">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consent"
                      checked={watch('consent')}
                      onCheckedChange={(checked) => setValue('consent', checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="consent" className="text-slate-400 text-sm cursor-pointer leading-relaxed">
                      I consent to Sterling & Associates CPA providing accounting services and
                      authorize the firm to access necessary financial records and communicate
                      with relevant third parties on my behalf.
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="dataPrivacy"
                      checked={watch('dataPrivacy')}
                      onCheckedChange={(checked) => setValue('dataPrivacy', checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="dataPrivacy" className="text-slate-400 text-sm cursor-pointer leading-relaxed">
                      I acknowledge that I have read and agree to the firm's privacy policy
                      and understand how my data will be protected and used.
                    </Label>
                  </div>
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
              disabled={isSubmitting || !watch('consent') || !watch('dataPrivacy')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Intake Form'
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}