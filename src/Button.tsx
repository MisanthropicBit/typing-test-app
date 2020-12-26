import React from 'react'

type ButtonProps = {
  name: string
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
}

/**
 * A simple button component
 */
export const Button = (props: ButtonProps) => {
  const { name, onClick } = props

  return (
    <input
      type="button"
      value={name}
      className="button"
      onClick={event => onClick(event)}
    />
  )
}
