import React, { useState } from 'react';
import type { Employee } from '../types';

interface RegistrationFormProps {
  onRegister: (employee: Omit<Employee, 'id' | 'registrationDate'>) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [photo, setPhoto] = useState<string>('');
  const [photoName, setPhotoName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !employeeId || !photo) {
      setError('All fields are required.');
      return;
    }
    setError('');
    onRegister({ name, employeeId, photo });
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden md:max-w-2xl animate-fade-in-slide-up">
      <div className="md:flex">
        <div className="p-8 w-full">
          <div className="uppercase tracking-wide text-sm text-indigo-400 font-semibold mb-1">Employee Registration</div>
          <h2 className="text-2xl font-bold text-white mb-6">Create Your Digital Pass</h2>
          {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-md mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-300">Employee ID</label>
              <input
                type="text"
                id="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                placeholder="EMP-12345"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Profile Photo</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-400">
                    <label htmlFor="photo" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-indigo-400 hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input id="photo" name="photo" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={handlePhotoUpload} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  {photoName && <p className="text-xs text-green-400 pt-2">{photoName}</p>}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform hover:scale-105"
            >
              Generate Pass
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
