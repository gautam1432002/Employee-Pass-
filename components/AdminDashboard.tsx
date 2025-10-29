import React, { useState } from 'react';
import type { Employee } from '../types';
import { EditIcon, DeleteIcon } from './icons';

interface AdminDashboardProps {
  employees: Employee[];
  onUpdate: (employee: Employee) => void;
  onDelete: (employeeId: string) => void;
}

const EditModal: React.FC<{
  employee: Employee;
  onSave: (employee: Employee) => void;
  onClose: () => void;
}> = ({ employee, onSave, onClose }) => {
  const [name, setName] = useState(employee.name);
  const [employeeId, setEmployeeId] = useState(employee.employeeId);

  const handleSave = () => {
    onSave({ ...employee, name, employeeId });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md shadow-xl animate-zoom-in">
        <h3 className="text-xl font-bold mb-4">Edit Employee</h3>
        <div className="space-y-4">
            <div>
              <label htmlFor="edit-name" className="block text-sm font-medium text-gray-300">Full Name</label>
              <input
                type="text"
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              />
            </div>
             <div>
              <label htmlFor="edit-employeeId" className="block text-sm font-medium text-gray-300">Employee ID</label>
              <input
                type="text"
                id="edit-employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              />
            </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 transition-colors">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 transition-colors">Save</button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ employees, onUpdate, onDelete }) => {
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl p-6 animate-fade-in-slide-up">
        <h2 className="text-2xl font-bold text-white mb-6">Employee Management</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700/50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Photo</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Employee ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Registered On</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {employees.length > 0 ? employees.map((employee) => (
                        <tr key={employee.id} className="hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img className="h-10 w-10 rounded-full object-cover" src={employee.photo} alt={employee.name} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{employee.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{employee.employeeId}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{employee.registrationDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={() => setEditingEmployee(employee)} className="text-indigo-400 hover:text-indigo-300 mr-4 transition-colors"><EditIcon /></button>
                                <button onClick={() => onDelete(employee.id)} className="text-red-500 hover:text-red-400 transition-colors"><DeleteIcon /></button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={5} className="text-center py-10 text-gray-500">No employees registered yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        {editingEmployee && (
            <EditModal 
                employee={editingEmployee}
                onSave={onUpdate}
                onClose={() => setEditingEmployee(null)}
            />
        )}
    </div>
  );
};

export default AdminDashboard;
