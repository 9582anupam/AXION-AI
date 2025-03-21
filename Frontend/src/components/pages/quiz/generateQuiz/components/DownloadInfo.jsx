const DownloadInfo = () => {
  return (
    <div className="mb-6 p-4 bg-slate-900 border border-slate-700 rounded-lg">
      <p className="text-slate-300">
        You'll receive a comprehensive assessment in PDF format:
      </p>
      <ul className="list-disc pl-5 mt-2 text-slate-400">
        <li>5 Multiple Choice Questions</li>
        <li>5 Short Answer Questions</li>
        <li>5 Long Answer Questions</li>
      </ul>
      <p className="text-slate-400 mt-2 text-sm">
        The PDF will contain all questions at the beginning and answers with explanations at the end.
        After downloading, you'll still be directed to the assessment page where you can take the quiz.
      </p>
    </div>
  );
};

export default DownloadInfo;
