import React, { useState } from 'react'

type TypingAreaProps = {
  onKeyPress: (event: React.KeyboardEvent) => void
  isErrorSet: boolean
}

/**
 * Typing component where the user types
 */
export const TypingArea = (props: TypingAreaProps) => {
  const { isErrorSet, placeholder, value } = props

  const [hasTyped, setHasTyped] = useState(false)

  const onKeyPress = typeof props.onKeyPress !== 'function' ? (_: React.KeyboardEvent<HTMLTextAreaElement>) => null : props.onKeyPress

  /**
   * Event handler for restting the textarea
   */
  const resetTextarea = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    event.currentTarget.value = ''
    event.preventDefault()
    setHasTyped(true)
  }

  /**
   * Event handler for handling key presses and resetting the text area
   *
   * @param event Keyboard event
   */
  const handleNextWord = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    onKeyPress(event)

    switch (event.key) {
      case ' ':
      case 'Enter':
        if (!isErrorSet) {
          resetTextarea(event)
        }
        break

      case 'Meta':
      default:
        break
    }
  }

  return (
    <div className="justified">
      <textarea
        id="typing-area"
        name="typing-area"
        placeholder={placeholder}
        autoComplete="off"
        autoFocus
        spellCheck={false}
        className="section"
        rows={2}
        cols={20}
        onKeyDown={event => handleNextWord(event)}
        value={value}
      />
    </div>
  )
}
