import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { User, LogOut } from 'lucide-react';

export const Header = () => {
  const { userData } = useGlobalContext();

  return (
    <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="font-medium">欢迎回来，</span>
          <span className="font-bold text-slate-900">{userData?.name}</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-600">{userData?.department}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg">
          <User size={16} className="text-slate-600" />
          <div className="text-sm">
            <p className="text-xs text-slate-500">学号</p>
            <p className="font-semibold text-slate-900">{userData?.studentId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
