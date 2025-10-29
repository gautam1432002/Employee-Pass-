
import React, { useState, useEffect } from 'react';
import type { Employee, View } from './types';
import { ADMIN_PASSWORD } from './constants';
import RegistrationForm from './components/RegistrationForm';
import EmployeePass from './components/EmployeePass';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { LogoIcon } from './components/icons';

const App: React.FC = () => {
  const [view, setView] = useState<View>('employee');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPassData, setCurrentPassData] = useState<Employee | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Load employees from localStorage on initial render
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  const persistEmployees = (updatedEmployees: Employee[]) => {
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };
  
  const handleRegister = (newEmployee: Omit<Employee, 'id' | 'registrationDate'>) => {
    const employeeWithId: Employee = {
        ...newEmployee,
        id: newEmployee.employeeId + '-' + Date.now(),
        registrationDate: new Date().toLocaleDateString(),
    };
    persistEmployees([...employees, employeeWithId]);
    setCurrentPassData(employeeWithId);
  };

  const handleLogin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setView('adminDashboard');
      return true;
    }
    return false;
  };
  
  const handleLogout = () => {
      setIsAdminAuthenticated(false);
      setView('employee');
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    const updatedEmployees = employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp);
    persistEmployees(updatedEmployees);
  };

  const handleDeleteEmployee = (employeeId: string) => {
    const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
    persistEmployees(updatedEmployees);
  };
  
  const Header: React.FC = () => (
    <header className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <LogoIcon />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Employee Pass Generator</h1>
        </div>
        <nav className="flex items-center space-x-4">
          <button 
            onClick={() => {
                setCurrentPassData(null);
                setView('employee');
            }} 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${view === 'employee' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
            Employee
          </button>
          {isAdminAuthenticated ? (
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 transition-colors">
              Logout
            </button>
          ) : (
            <button 
              onClick={() => setView('adminLogin')} 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${view.startsWith('admin') ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
              Admin
            </button>
          )}
        </nav>
      </div>
    </header>
  );

  const renderContent = () => {
    switch(view) {
      case 'employee':
        return currentPassData ? (
          <EmployeePass 
            employee={currentPassData} 
            onBack={() => setCurrentPassData(null)}
          />
        ) : (
          <RegistrationForm onRegister={handleRegister} />
        );
      case 'adminLogin':
        return <AdminLogin onLogin={handleLogin} />;
      case 'adminDashboard':
        return isAdminAuthenticated ? (
            <AdminDashboard 
                employees={employees}
                onUpdate={handleUpdateEmployee}
                onDelete={handleDeleteEmployee}
            />
        ) : <AdminLogin onLogin={handleLogin} />;
      default:
        return <RegistrationForm onRegister={handleRegister} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
