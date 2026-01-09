export default function ProgressBar({ progress, className = '', showValue = false }) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const getProgressColor = (p) => {
    if (p < 33) return 'bg-md-error';
    if (p < 66) return 'bg-amber-400';
    return 'bg-emerald-400';
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressColor(clampedProgress)}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showValue && (
        <div className="flex justify-between mt-1 text-xs text-md-on-surface-variant-dark">
          <span>0%</span>
          <span>{Math.round(clampedProgress)}%</span>
          <span>100%</span>
        </div>
      )}
    </div>
  );
}
