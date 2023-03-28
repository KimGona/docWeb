export default function InputField({ id, label, value, width="w-[300px]", type="text", onValueChange }) {
    return (
      <div className={width}>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onValueChange}
        placeholder={label}
        className="border border-zinc-700 focus:outline-pink-500 rounded-md w-full object-contain py-2 px-4"
        required
      />
      </div>
    );
  }