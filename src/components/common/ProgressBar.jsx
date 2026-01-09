export default function ProgressBar({
  progress,
  className = "",
  showValue = false,
}) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full ${className}`}>
      <div className="h-1.5 bg-surface-highlight rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-rose"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showValue && (
        <div className="flex justify-between mt-2 text-xs text-primary-muted font-medium">
          <span>0%</span>
          <span>{Math.round(clampedProgress)}%</span>
          <span>100%</span>
        </div>
      )}
    </div>
  );
}
