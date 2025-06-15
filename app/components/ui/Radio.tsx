interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Radio({ label, className, ...props }: RadioProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="radio"
        className={`w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 ${className}`}
        {...props}
      />
      {label && <label className="text-sm text-gray-700">{label}</label>}
    </div>
  );
}
