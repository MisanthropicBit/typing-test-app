import React, { useState } from 'react'

type TypingAreaProps = {
  onKeyPress: (event: React.KeyboardEvent) => void
}

/**
 *
 */
export const TypingArea = (props: TypingAreaProps) => {
  const [hasTyped, setHasTyped] = useState(false)

  const onKeyPress = typeof props.onKeyPress !== 'function' ? (_: React.KeyboardEvent<HTMLTextAreaElement>) => null : props.onKeyPress

  const resetTextarea = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    event.currentTarget.value = ''
    event.currentTarget.placeholder = ''
    event.preventDefault()
    setHasTyped(true)
  }

  const handleNextWord = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    onKeyPress(event)

    switch (event.key) {
      case ' ':
      case 'Enter':
        resetTextarea(event)
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
        placeholder="Start typing here"
        autoComplete="off"
        autoFocus
        spellCheck={false}
        className="section"
        rows={2}
        cols={20}
        onKeyDown={event => handleNextWord(event)}
      />
    </div>
  )
}
