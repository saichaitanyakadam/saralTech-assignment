interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  type: string;
  value: string;
  handleInput: (event: React.FormEvent<HTMLInputElement>) => void;
}

const Input = ({
  label,
  name,
  type,
  handleInput,
  value,
  placeholder,
}: InputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-gray-900">
        {label}
      </label>
      <input
        onChange={handleInput}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        id={name}
        className="h-8 rounded outline-none px-2 border"
      />
    </div>
  );
};

export default Input;
