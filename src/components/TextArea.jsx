export default function TextArea({
  state = {},
  setState = () => {},
  value,
  placeholder = "Placeholder",
  name = "name",
  label = "Label",
  disabled = false,
}) {
    const onChange = (e) => {
        setState({ ...state, message: e.target.value });
    };
  return (
    <div className="relative group w-full h-40 flex flex-col gap-3 justify-center items-center">
      <label className="text-xl font-bold" htmlFor={name}>
        {label}
      </label>
      <textarea
        className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
        placeholder={placeholder}
        name={name}
        value={value ?? state.message}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
