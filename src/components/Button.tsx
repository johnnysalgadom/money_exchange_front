import classNames from "classnames"
import React from "react"

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  block?: boolean
  size?: "lg"
  typeStyle?: "primary" | "default"
}

const Button: React.FC<ButtonProps> = ({children, block = false, size = "normal", typeStyle = "default", ...rest}) => {
  const classes = classNames('btn', 
    {[`btn-${typeStyle}`] : typeStyle }, { ['btn-block']: block }, { [`btn-${size}`]: size } )
  return (
    <button className={classes} {...rest}>{children}</button>
  )
}

export default Button
