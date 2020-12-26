import React from 'react'

type DropdownProps<T> = {
  options: T[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

/**
 * Dropdown component
 */
export const Dropdown = (props: DropdownProps<string>) => {
  return (
    <select
      name="languages"
      id="languages"
      className="section"
      onChange={event => props.onChange(event)}
    >
      {props.options.map(option => <option key={option}>{option}</option>)}
    </select>
  )
}
