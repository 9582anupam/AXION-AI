const LoadingOverlay = ({ loading }) => {
  if (!loading) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-75 z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-300 text-lg">Generating quiz...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
