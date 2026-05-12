import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';

export const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    department: ''
  });

  const { login } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.studentId && formData.department) {
      login(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 to-blue-600"></div>

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="64" height="64" rx="12" fill="#004d99"/>
                <path d="M32 16L44 40H20L32 16Z" fill="white"/>
                <rect x="28" y="40" width="8" height="8" fill="white"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              华诚集团 2026 年度高潜储干选拔实训
            </h1>
            <p className="text-slate-600">
              管理不是一种职位，而是一种担当
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-900 p-4 rounded-lg mb-6">
            <p className="text-sm text-slate-700 italic">
              请以职业心态开启你的职业新篇章
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">
                姓名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="请输入您的姓名"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="studentId" className="block text-sm font-semibold text-slate-700 mb-1">
                学号
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="请输入您的学号"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-semibold text-slate-700 mb-1">
                所属部门
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="请输入您的所属部门"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transform hover:scale-[1.02] transition-all shadow-lg"
            >
              开始选拔
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
