// --- Internal Helper Component ---
export const SocialInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon,
}) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-gray-800 font-jakarta tracking-wide">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">{icon}</div>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full placeholder:text-slate-400 border border-slate-400 focus-visible:ring-1 focus-visible:ring-brand-aqua rounded-lg py-3 pl-12 pr-4 text-sm font-medium text-slate-800 focus:outline-none transition-all duration-300"
      />
    </div>
  </div>
);
