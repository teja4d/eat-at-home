import React, { useState } from 'react';

const InputField = ({
  label,
  type,
  name,
  value,
  handleChange,
  required = false,
  small,
  isValid,
  feedback,
  prependText,
  placeholder
}) => {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
  };
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <div className={prependText ? 'input-group has-validation' : ''}>
        {prependText && <span className="input-group-text">{prependText}</span>}
        <input
        placeholder={placeholder}
          onBlur={handleBlur}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className={`form-control ${small ? 'form-control-sm' : ''} ${
            touched && !isValid
              ? 'is-invalid'
              : touched && isValid
              ? 'is-valid'
              : ''
          }`}
          required={required}
          aria-describedby={`${name}Feedback`}
        />
        <div
          id={`${name}Feedback`}
          className={`${isValid ? 'valid-feedback' : 'invalid-feedback'}`}
        >
          {isValid ? null : feedback}
        </div>
      </div>
    </div>
  );
};

export default InputField;
