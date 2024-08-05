import "./style.css";
export default function Input({ type, name, value, placeholder, onChange }) {
  return (
    <>
      <div className="input-wrapper">
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        <span></span>
      </div>
    </>
  );
}
