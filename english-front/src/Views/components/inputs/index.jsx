import "./style/index.scss";

function MainTextInput({ name, value, onChange, label, placeHolder, type, min, max }) {
  return (
    <>
      <label className="mainTextInput text-m" htmlFor={name}>
        {label}
      </label>
      <input
        className="mainTextInput text-m"
        type={type}
        name={name}
        min={min} 
        max={max}
        id={name}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default MainTextInput;
