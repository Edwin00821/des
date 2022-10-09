export default function Input({
  state,
  setState,
  funcion,
  type = "text",
  label = "Label",
  placeholder = "Placeholder",
  name = "name",
  regEx,
  msgError,
}) {
  const onChange = (e) => {
    setState({ ...state, key: e.target.value });
  };

  const validacion = () => {
    if (regEx) {
      if (regEx.test(state.key)) {
        setState({ ...state, valid: "true" });
      } else {
        setState({ ...state, valid: "false" });
      }
    }
    if (funcion) {
      funcion();
    }
  };

  return (
    <>
      <label
        className={`text-xl font-bold block ${
          state.valid === "false" && "text-red-500"
        }`}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
        placeholder={placeholder}
        name={name}
        type={type}
        value={state.key}
        onChange={onChange}
        onKeyUp={validacion}
        onBlur={validacion}
      />
      {state.valid === "false" && <p className="font-bold">{msgError}</p>}
    </>
  );
}
