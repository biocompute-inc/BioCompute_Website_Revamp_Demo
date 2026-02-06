'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface ApplyModalProps {
    jobId: number;
    jobTitle: string;
}

export default function ApplyModal({ jobId, jobTitle }: ApplyModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        linkedIn: '',
        resume: '',
        coverLetter: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://biocompute-cms.onrender.com/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobId,
                    ...formData,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit application');
            }

            alert('Application submitted successfully!');
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                linkedIn: '',
                resume: '',
                coverLetter: '',
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Apply Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-purple text-white px-8 py-4 rounded font-bold hover:bg-purple-300 hover:text-dark transition-colors"
            >
                Apply Now
            </button>

            {/* Application Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 pt-24">
                    <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto mt-8">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-dark">Apply for {jobTitle}</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-dark transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Full Name */}
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-semibold text-dark mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-purple transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-dark mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-purple transition-colors"
                                    placeholder="john.doe@example.com"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-dark mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-purple transition-colors"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            {/* LinkedIn */}
                            <div>
                                <label htmlFor="linkedIn" className="block text-sm font-semibold text-dark mb-2">
                                    LinkedIn Profile
                                </label>
                                <input
                                    type="url"
                                    id="linkedIn"
                                    name="linkedIn"
                                    value={formData.linkedIn}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-purple transition-colors"
                                    placeholder="https://linkedin.com/in/johndoe"
                                />
                            </div>

                            {/* Resume URL */}
                            <div>
                                <label htmlFor="resume" className="block text-sm font-semibold text-dark mb-2">
                                    Resume/CV Link *
                                </label>
                                <input
                                    type="url"
                                    id="resume"
                                    name="resume"
                                    required
                                    value={formData.resume}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-purple transition-colors"
                                    placeholder="https://drive.google.com/file/... or https://dropbox.com/..."
                                />
                            </div>

                            {/* Cover Letter */}
                            <div>
                                <label htmlFor="coverLetter" className="block text-sm font-semibold text-dark mb-2">
                                    Cover Letter
                                </label>
                                <textarea
                                    id="coverLetter"
                                    name="coverLetter"
                                    rows={5}
                                    value={formData.coverLetter}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-purple transition-colors resize-none"
                                    placeholder="Tell us why you're a great fit for this role..."
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-3 border border-gray-300 rounded font-semibold text-dark hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-6 py-3 bg-purple text-white rounded font-semibold hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
