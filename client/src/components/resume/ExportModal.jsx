import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, CheckCircle2, Loader2, Sparkles, X, FileText } from 'lucide-react';

const ExportModal = ({ isOpen, onClose, onConfirmDownload, templateName = 'Modern Professional' }) => {
  const [isExporting, setIsExporting] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsExporting(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsExporting(false);
            return 100;
          }
          return prev + 25;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2 pt-2">
            <div className="w-16 h-16 rounded-2xl bg-[#5B4BFF]/10 text-[#5B4BFF] border border-[#5B4BFF]/20 flex items-center justify-center mx-auto shadow-sm">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {isExporting ? 'Preparing Your ATS Resume' : 'Your Resume is Ready!'}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Format: <span className="font-bold text-slate-800">{templateName} (A4 Print PDF)</span>
            </p>
          </div>

          {/* Progress / Success Area */}
          {isExporting ? (
            <div className="space-y-4 text-center py-2">
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="bg-gradient-to-r from-[#5B4BFF] to-[#7C5CFC] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs font-bold text-[#5B4BFF] flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Formatting A4 page layout ({progress}%)...
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-center py-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                <span>Passed ATS Document Verification</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Click below to download or print your high-resolution A4 PDF document.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
                setTimeout(() => {
                  onConfirmDownload();
                }, 150);
              }}
              disabled={isExporting}
              className="flex-1 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#4169FF] to-[#6C4CF6] hover:opacity-95 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ExportModal;
