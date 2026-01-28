'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ApplyModalProps {
    jobTitle: string;
}

export default function ApplyModal({ jobTitle }: ApplyModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        linkedIn: '',
        coverLetter: '',
    });
    const [resumeFile, setResumeFile] = useState<File | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission (e.g., send to API)
        console.log('Form submitted:', { formData, resumeFile });
        // Reset and close
        setIsModalOpen(false);
        alert('Application submitted successfully!');
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

                            {/* Resume Upload */}
                            <div>
                                <label htmlFor="resume" className="block text-sm font-semibold text-dark mb-2">
                                    Resume/CV *
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded p-6 text-center hover:border-purple transition-colors">
                                    <input
                                        type="file"
                                        id="resume"
                                        accept=".pdf,.doc,.docx"
                                        required
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="resume"
                                        className="cursor-pointer flex flex-col items-center gap-2"
                                    >
                                        <Upload size={32} className="text-gray-400" />
                                        <span className="text-sm text-gray-600">
                                            {resumeFile ? resumeFile.name : 'Click to upload or drag and drop'}
                                        </span>
                                        <span className="text-xs text-gray-400">PDF, DOC, DOCX (max 10MB)</span>
                                    </label>
                                </div>
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
                                    className="flex-1 px-6 py-3 bg-purple text-white rounded font-semibold hover:bg-purple-600 transition-colors"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
