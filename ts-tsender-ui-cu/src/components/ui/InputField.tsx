type InputFormProps = {
  label: string;
  placeholder: string;
  value: string;
  type?: "input" | "textarea";
  large?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

export default function InputForm({
  label,
  placeholder,
  value,
  type,
  large,
  onChange,
}: InputFormProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-medium text-sm text-gray-700">{label}</label>

      {large ? (
        <textarea
          className="`bg-white py-2 px-3 border border-zinc-300 placeholder:text-zinc-500 text-zinc-900 shadow-xs rounded-lg focus:ring-[4px] focus:ring-zinc-400/15 focus:outline-none h-24 align-text-top`"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={5}
        />
      ) : (
        <input
          className={
            "bg-white py-2 px-3 border border-zinc-300 placeholder:text-zinc-500 text-zinc-900 shadow-xs rounded-lg focus:ring-[4px] focus:ring-zinc-400/15 focus:outline-none"
          }
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}
