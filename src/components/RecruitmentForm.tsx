import React, { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { VOLUNTEER_FORM_URL } from '@/data/events';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  address: '',
  education: '',
  experience: '',
  skills: '',
  motivation: '',
};

type FormState = typeof EMPTY;

const inputClass =
  'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ngo-blue focus:border-transparent transition-all disabled:opacity-60';

const RecruitmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Without a backend the old form silently discarded submissions. Send
    // people to the Google Form instead of pretending it worked.
    if (!isSupabaseConfigured || !supabase) {
      toast.error('Applications are not set up on this deployment.', {
        description: 'Please use our volunteer form instead.',
        action: { label: 'Open form', onClick: () => window.open(VOLUNTEER_FORM_URL, '_blank') },
      });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from('applications').insert({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim() || null,
      education: formData.education.trim() || null,
      experience: formData.experience.trim() || null,
      skills: formData.skills.trim(),
      motivation: formData.motivation.trim(),
    });
    setSubmitting(false);

    if (error) {
      console.error('[TBSF] application submit failed', error);
      toast.error('Could not submit your application.', {
        description: `${error.message}. Please try again, or use our volunteer form.`,
      });
      return;
    }

    setFormData(EMPTY);
    setSubmitted(true);
    toast.success('Application submitted. We will be in touch soon.');
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Thank you for applying</h3>
        <p className="text-gray-600 mb-6">
          Your application has reached The Basements Social Forum. A member of the core
          team will contact you.
        </p>
        <button onClick={() => setSubmitted(false)} className="btn-ngo">
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input id="name" name="name" type="text" required disabled={submitting}
              value={formData.name} onChange={handleChange} className={inputClass}
              placeholder="Enter your full name" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input id="email" name="email" type="email" required disabled={submitting}
              value={formData.email} onChange={handleChange} className={inputClass}
              placeholder="Enter your email" />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input id="phone" name="phone" type="tel" required disabled={submitting}
              value={formData.phone} onChange={handleChange} className={inputClass}
              placeholder="Enter your phone number" />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input id="address" name="address" type="text" disabled={submitting}
              value={formData.address} onChange={handleChange} className={inputClass}
              placeholder="Enter your address" />
          </div>
        </div>

        <div>
          <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
            Educational Background
          </label>
          <input id="education" name="education" type="text" disabled={submitting}
            value={formData.education} onChange={handleChange} className={inputClass}
            placeholder="Your highest qualification" />
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
            Prior Volunteer Experience
          </label>
          <textarea id="experience" name="experience" rows={3} disabled={submitting}
            value={formData.experience} onChange={handleChange} className={inputClass}
            placeholder="Describe any previous volunteer experience" />
        </div>

        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
            Skills &amp; Interests *
          </label>
          <textarea id="skills" name="skills" rows={3} required disabled={submitting}
            value={formData.skills} onChange={handleChange} className={inputClass}
            placeholder="List your skills, talents, and interests that could benefit our organization" />
        </div>

        <div>
          <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
            Motivation to Join *
          </label>
          <textarea id="motivation" name="motivation" rows={4} required disabled={submitting}
            value={formData.motivation} onChange={handleChange} className={inputClass}
            placeholder="Why do you want to join The Basements Social Forum? What do you hope to contribute and gain?" />
        </div>

        <div className="pt-4">
          <button type="submit" disabled={submitting} className="btn-ngo py-3 px-8 gap-2">
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {submitting ? 'Submitting…' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruitmentForm;
