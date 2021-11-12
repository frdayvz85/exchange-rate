import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';


const Button = ({
  children,
  qaIdPrefix = 'button',
  className,
  onClick,
  disabled = false,
  type = 'submit',
}) => {
  return (
    <button
      data-testid={`${qaIdPrefix}-btn`}
      className={cn(styles.btn, className)}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
