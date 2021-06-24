import React from 'react';
import clsx from 'clsx';
import {
  Button
 } from '@material-ui/core';
import {
  makeStyles,
} from '@material-ui/core/styles';

import { 
  CommonButton,
} from '../../common/styles';

/**
 * Props
 */
interface IProps {
  className?: string,
  label?: string,
  id?: string,
  onClick?: any,
  variant?: "text" | "contained" | "outlined" | undefined,
  color?: "inherit" | "default" | "primary" | "secondary" | undefined,
  type?: "button" | "reset" | "submit" | undefined,
  disabled?: boolean,
  startIcon?: any,
}

/**
 * Styles
 */
const useStyles = makeStyles(() => ({
  tranBorder: {
    border: '1px solid transparent',
  },
}));

/**
 * Main Component
 */
const CustomButton = ({
  className,
  label,
  id,
  onClick,
  variant,
  color,
  type,
  disabled,
  startIcon,
}: IProps) => {
  const classes = useStyles();

  return (
    <CommonButton 
      className={clsx(className, (variant == 'contained' && classes.tranBorder))} 
      onClick={onClick} 
      variant={variant} 
      color={color} 
      type={type}
      id={id}
      disabled={disabled}
      startIcon={startIcon}
    >
      {label}
    </CommonButton>
  );
}

CustomButton.defaultProps = {
  className: '',
  label: '',
  onClick: null,
  variant: 'contained',
  color: 'primary',
  type: 'button',
  id: '',
  disabled: false,
  startIcon: null,
}

export default CustomButton;
