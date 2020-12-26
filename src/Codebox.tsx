import React from 'react'

import { Position } from './CodeDisplay'

type CodeboxProps = {
  color: string
  errorColor: string
  lines: string[]
  pos: Position
  errorPos: Position
  errorMarks: Position[]
}

/**
 * Component for displaying the code that should be typed
 */
export const Codebox = (props: CodeboxProps) => {
  const { color, errorColor, lines, pos, errorPos } = props

  /**
   * Format a line of code
   */
  const formatLine = (
    code: string,
    curPos: Position,
    curErrorPos: Position,
    hitColor: string,
    errorColor: string,
  ) => {
    if (code.length === 0) {
      // This is an empty line where only a newline needs to be typed
      const actualColor = curErrorPos.index === -1 ? hitColor : errorColor

      return (
        <span style={{backgroundColor: actualColor}}>¶</span>
      )
    }

    let spans = []

    if (curErrorPos.index === -1 || curErrorPos.index === curPos.index) {
      spans.push(<span>{code.slice(0, curPos.index)}</span>)

      const curColor = curErrorPos.index === -1 ? hitColor : errorColor
      spans.push(<span style={{backgroundColor: curColor}}>{code.charAt(curPos.index)}</span>)
      spans.push(<span>{code.slice(curPos.index+1)}</span>)
    } else {
      spans.push(<span>{code.slice(0, errorPos.index)}</span>)
      spans.push(<span style={{backgroundColor: errorColor}}>{code.charAt(errorPos.index)}</span>)
      spans.push(<span>{code.slice(errorPos.index+1, curPos.index)}</span>)
      spans.push(<span style={{backgroundColor: hitColor}}>{code.charAt(curPos.index)}</span>)
      spans.push(<span>{code.slice(curPos.index+1)}</span>)
    }

    return (
      <>{spans.map(span => span)}</>
    )
  }

  return (
    <div className="codebox">
      <code>
        {
          lines.map((line, idx) => {
            return (
              <span key={idx}>
              {idx === pos.lineNum ? formatLine(line, pos, errorPos, color, errorColor) : line}
              <br />
              </span>
            )
          })
        }
      </code>
    </div>
  )
}
