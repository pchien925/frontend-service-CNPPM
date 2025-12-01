import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import clsx from 'clsx';

const VARIANT_STYLES = {
  primary: 'bg-light-primary text-light-textPrimary hover:bg-light-primaryHover',
  secondary: 'bg-light-secondary text-light-textPrimary hover:bg-light-secondaryHover',
  accent: 'bg-light-accent text-light-textPrimary hover:bg-light-accentHover',
  danger: 'bg-light-danger text-light-textPrimary hover:bg-light-dangerHover',
  warning: 'bg-light-warning text-light-textPrimary hover:bg-light-warningHover',
  success: 'bg-light-success text-light-textPrimary hover:bg-light-successHover',
  info: 'bg-light-info text-light-textPrimary hover:bg-light-infoHover',
};

const SIZE_STYLES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  className,
  ...props
}) {
  const isDisabled = disabled || loading;

  // Nếu disable, bỏ hover class
const baseVariant = VARIANT_STYLES[variant].split(' ').filter(cls => !cls.startsWith('hover:')).join(' ');
  const hoverVariant = VARIANT_STYLES[variant].match(/hover:[^\s]+/g)?.join(' ') || '';

  const classes = clsx(
    'rounded-md font-medium focus:outline-none transition-all duration-200',
    'flex items-center justify-center gap-2 select-none',
    baseVariant,
    SIZE_STYLES[size],
    fullWidth && 'w-full',
    !isDisabled && hoverVariant,
    isDisabled && 'opacity-50 cursor-not-allowed',
    className
  );

  return (
    <button
      className={classes}
      disabled={isDisabled}
      aria-busy={loading}
      onClick={onClick}
      {...props}
    >
      {loading && <AiOutlineLoading3Quarters className="animate-spin text-current" />}
      <span className={clsx(loading && 'opacity-70')}>{children}</span>
    </button>
  );
}
