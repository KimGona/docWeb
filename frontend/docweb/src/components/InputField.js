
function getErrorStyle(isError) {
  if (isError) {
    return "border border-2 border-red-500 focus:outline-pink-500 rounded-md w-full object-contain py-2 px-4"
  } else {
    return "border border-2 border-zinc-400 focus:outline-pink-500 rounded-md w-full object-contain py-2 px-4"
  }
}

function ErrorMessage({isError, errorMessage}) {
  if (isError) {
    return (<p className="text-sm text-red-500 text-normal">{errorMessage}</p>);
  }
};

export default function InputField({ id, label, value, width="w-[300px]", type="text", isError=false, errorMessage="", onValueChange }) {
    return (
      <div className={width}>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onValueChange}
          placeholder={label}
          className={getErrorStyle(isError)}
          required
        />
        <ErrorMessage isError={isError} errorMessage={errorMessage} />
      </div>
    );
  }