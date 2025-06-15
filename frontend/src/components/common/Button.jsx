import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClass = 'custom-button';
  const variantClass = `custom-button--${variant}`;
  const sizeClass = `custom-button--${size}`;
  const loadingClass = isLoading ? 'custom-button--loading' : '';
  const disabledClass = disabled ? 'custom-button--disabled' : '';

  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${sizeClass} ${loadingClass} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="button-spinner"></span>
          <span className="button-text">Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default Button; 