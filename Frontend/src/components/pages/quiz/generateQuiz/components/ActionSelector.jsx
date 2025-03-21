import { FileText, Upload } from "lucide-react";

const ActionSelector = ({ onActionSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Take Assessment Option */}
      <div
        className="bg-slate-900 border border-slate-700 hover:border-cyan-500/50 rounded-lg p-6 text-center cursor-pointer transition-all"
        onClick={() => onActionSelect("take")}
      >
        <div className="bg-gradient-to-br from-cyan-500 to-indigo-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <h4 className="text-lg font-bold text-slate-200 mb-2">
          Attempt Assessment
        </h4>
        <p className="text-slate-400 text-sm">
          Configure and take a custom assessment based on the content
        </p>
      </div>

      {/* Download Assessment Option */}
      <div
        className="bg-slate-900 border border-slate-700 hover:border-cyan-500/50 rounded-lg p-6 text-center cursor-pointer transition-all"
        onClick={() => onActionSelect("download")}
      >
        <div className="bg-gradient-to-br from-cyan-500 to-indigo-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Upload className="h-8 w-8 text-white" />
        </div>
        <h4 className="text-lg font-bold text-slate-200 mb-2">
          Download Assessment
        </h4>
        <p className="text-slate-400 text-sm">
          Get a comprehensive mixed assessment as PDF (5 MCQ, 5 short, 5 long answer questions)
        </p>
      </div>
    </div>
  );
};

export default ActionSelector;
