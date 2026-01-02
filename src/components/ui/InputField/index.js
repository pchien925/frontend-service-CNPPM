import React, { useState } from 'react';
import clsx from 'clsx';

export default function InputField({
  label,
  placeholder,
  size = 'md',
  fullWidth = false,
  disabled = false,
  required = false,
  rules = {},
  onValidate,
  startIcon,
  endIcon,
  className,
  error: externalError,
  ...inputProps
}) {
  const [internalError, setInternalError] = useState("");

  const error = externalError ?? internalError;

  const validate = (value) => {
    let message = "";
    if (required && !value.trim()) message = "This field is required";
    else if (rules.minLength && value.length < rules.minLength) message = `Minimum ${rules.minLength} characters`;
    else if (rules.maxLength && value.length > rules.maxLength) message = `Maximum ${rules.maxLength} characters`;
    else if (rules.pattern && !rules.pattern.test(value)) message = "Invalid format";

    setInternalError(message);
    onValidate?.(!message, message);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (!externalError) validate(value);
    inputProps.onChange?.(e);
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  const baseStyles =
    'border rounded-md focus:outline-none focus:ring-2 transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed';

  const inputClass = clsx(
    baseStyles,
    sizeStyles[size],
    startIcon && 'pl-10',
    endIcon && 'pr-10',
    error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-light-primary',
    className
  );

  return (
    <div className={clsx('flex flex-col', fullWidth && 'w-full')}>
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative w-full">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            {startIcon}
          </div>
        )}

        <input
          {...inputProps}
          className={inputClass}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
        />

        {endIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
            {endIcon}
          </div>
        )}
      </div>

      {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
    </div>
  );
}
