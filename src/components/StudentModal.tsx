import React, { useState } from 'react';
import { User, School, Check, X } from 'lucide-react';
import { StudentProfile } from '../types';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSave: (updated: StudentProfile) => void;
}

export const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [studentId, setStudentId] = useState(profile.studentId);
  const [name, setName] = useState(profile.name);
  const [department, setDepartment] = useState(profile.department || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim() || !name.trim()) return;
    onSave({
      ...profile,
      studentId: studentId.trim(),
      name: name.trim(),
      department: department.trim() || '餐飲管理系 / 食品科技系',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all border border-amber-100">
        <div className="flex items-center justify-between pb-4 border-b border-amber-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">學生身分設定</h3>
              <p className="text-xs text-slate-500">此資料將顯示於學習紀錄、測驗成績及 PDF 輸出證書</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              學生學號 <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="例如：B11204018"
                className="w-full pl-3 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              學生姓名 <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：陳大衛"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              班級 / 科系 (選填)
            </label>
            <div className="relative">
              <School className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="例如：餐旅管理系 二年甲班"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50/50"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:scale-95 rounded-xl shadow-xs shadow-amber-600/30 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              確認儲存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
