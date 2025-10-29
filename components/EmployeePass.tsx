import React, { useRef } from 'react';
import type { Employee } from '../types';
import { DownloadIcon, LogoIcon } from './icons';

// Make htmlToImage globally available from the script loaded in index.html
declare const htmlToImage: any;

interface EmployeePassProps {
  employee: Employee;
  onBack: () => void;
}

const EmployeePass: React.FC<EmployeePassProps> = ({ employee, onBack }) => {
  const passRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!passRef.current) return;
    try {
      const dataUrl = await htmlToImage.toJpeg(passRef.current, { quality: 0.98, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = `${employee.employeeId}-pass.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('oops, something went wrong!', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col items-center space-y-6 animate-fade-in-slide-up">
        <h2 className="text-3xl font-bold text-white mb-2">Your Digital Pass is Ready!</h2>
        <p className="text-gray-400 text-center">You can now download your official employee pass. Keep it safe.</p>

        {/* The component to be converted to image */}
        <div ref={passRef} className="w-[350px] h-[550px] bg-white rounded-2xl shadow-2xl p-6 flex flex-col text-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/50">
            <div className="flex justify-between items-center pb-4 border-b-2 border-gray-200">
                <div className="flex items-center space-x-2">
                    <LogoIcon />
                    <span className="font-bold text-lg text-gray-700">GLOBAL ASSOC.</span>
                </div>
            </div>
            <div className="flex-grow flex flex-col items-center justify-center space-y-6">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
                    <img src={employee.photo} alt="Employee" className="w-full h-full object-cover" />
                </div>
                <div className="text-center">
                    <h3 className="text-3xl font-extrabold tracking-tight text-gray-900">{employee.name}</h3>
                    <p className="text-indigo-600 font-semibold mt-1">Employee ID: {employee.employeeId}</p>
                </div>
            </div>
            <div className="text-center pt-4 border-t-2 border-gray-200">
                <p className="text-xs text-gray-500">Registered on: {employee.registrationDate}</p>
                <p className="text-xs text-gray-500 mt-1">This pass is the property of Global Association.</p>
            </div>
        </div>

        <div className="flex space-x-4">
            <button
                onClick={onBack}
                className="w-40 flex justify-center py-3 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 transition-all"
            >
                Register New
            </button>
            <button
                onClick={handleDownload}
                className="w-40 flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-transform transform hover:scale-105"
            >
                <DownloadIcon />
                Download JPG
            </button>
        </div>
    </div>
  );
};

export default EmployeePass;
