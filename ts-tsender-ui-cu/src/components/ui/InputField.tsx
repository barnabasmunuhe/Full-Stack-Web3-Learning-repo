type InputFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  type?: "input" | "textarea";
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function InputField({
  label,
  placeholder,
  value,
  type = "input",
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-medium text-sm text-gray-700">
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={5}
        />
      ) : (
        <input
          className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}