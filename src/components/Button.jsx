export default function Button({
  children = "Button",
  href = "",
  px = "px-6",
  py = "py-2",
  mx = "mx-2",
  color = "sky",
  txtColor = "text-white",
  hoverColor = "hover:text-white",
  bg = "bg-orange-600",
  hoverBg = "hover:bg-orange-400",
  border = "border-2",
  borderColor = "border-orange-500",
  hoverBorderColor = "hover:border-orange-600",
  sahdow = "shadow-md",
  hoverShadow = "hover:shadow-lg",
  rounded = "rounded-md",
  hoverTransition = "hover:transition duration-300 ease-in-out",
  onclick,
  disabled = false,
  type = "button",
}) {
  return (
    <>
      <button
        onClick={onclick}
        disabled={disabled}
        type={type}
        className={`
              ${mx} ${px} ${py} 
              ${bg} ${hoverBg} 
              ${txtColor} ${hoverColor}
              ${border} ${borderColor} 
              ${sahdow} ${hoverShadow}
              ${rounded} ${hoverTransition} `}
      >
        {children}
      </button>
    </>
  );
}
