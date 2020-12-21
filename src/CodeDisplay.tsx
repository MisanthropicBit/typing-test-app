import React, { useState } from 'react'

import { Codebox } from './Codebox'
import { Dropdown } from './Dropdown'
import { FileUpload } from './FileUpload'
import { TypingArea } from './TypingArea'

/**
 * Format a decimal as a string with only 2 decimals after
 * the comma and strips zeroes after the comma as well
 *
 * @param decimal Decimal to convert
 *
 * @returns The formatted string
 */
function formatDecimal(decimal: number, precision: number): string {
  const actualPrecision = precision ?? 4

  return decimal.toFixed(actualPrecision).replace(/\.0+$/, '')
}

/**
 * Character index and line number in a set of strings
 */
export type Position = {
  index: number
  lineNum: number
}

/**
 * Code display component that handles key presses and records data
 */
export const CodeDisplay = () => {
  const defaultLanguages = [
    'C',
    'C++',
    'C#',
    'Python 3',
    'Javascript',
    'Typescript',
    'LaTeX',
  ]

  const languageExamples: Map<string, string[]> = new Map([
    ['Python 3', ['#!/usr/bin/env python3', '', 'from typing import List']],
    ['C', ['#include <stddef.h>']],
    ['C++', ['#include <stddef.h>']],
    ['C#', ['using System.Threading']],
    ['Javascript', ['use "strict"']],
    ['Typescript', ['use "strict"']],
    ['LaTeX', ['\\documentclass{article}']],
  ])

  // Keys to ignore when typing
  const keyIgnores = [
    'Alt',
    'Control',
    'Meta',
    'Shift',
  ]

  const colors = {
    hit: 'lightblue',
    miss: 'red',
    mark: 'pink',
  }

  const startPos: Position = {
    index: 0,
    lineNum: 0
  }

  const invalidErrorPos: Position = {
    index: -1,
    lineNum: -1,
  }

  const initialErrorMarks: Position[] = []

  const [language, setLanguage] = useState('C')
  const [pos, setPos] = useState(startPos)
  const [errorPos, setErrorPos] = useState(invalidErrorPos)
  const [errorMarks, setErrorMarks] = useState(initialErrorMarks)
  const [hits, setHits] = useState(0)
  const [misses, setMisses] = useState(0)

  /**
   *
   */
  const onChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setLanguage(event.target.value)

    // Reset state
    setPos(startPos)
    setErrorPos(invalidErrorPos)
    setHits(0)
    setMisses(0)

    // Clear text and reset placeholder
    //event.target.value = ''
    //event.target.placeholder = 'Start typing here...'
  }

  /**
   * Check if the typed key is correct
   *
   * @param key Key that was typed
   * @returns Whether or not the key was valid
   */
  const isKeyCorrect = (key: string): boolean => {
    const languageLines = languageExamples.get(language)

    if (languageLines === undefined) {
      return false
    }

    return languageLines[pos.lineNum].charAt(pos.index) === key
  }

  /**
   * Mark an error position if not already set and record a miss
   *
   * @param idx Index to mark
   */
  const markError = (pos: Position): void => {
    if (errorPos.index === -1) {
      setErrorPos(pos)
    }

    setMisses(prevMisses => prevMisses + 1)
    setErrorMarks(prevMarks => [...prevMarks, pos])
  }

  /**
   * Move to the next line
   */
  const moveToNextLine = () => {
    setPos(prevPos => {
      return {
        index: 0,
        lineNum: prevPos.lineNum + 1,
      }
    })
  }

  const languageLines = languageExamples.get(language)

  if (languageLines === undefined) {
    throw Error('Invalid language')
  }

  const done = pos.lineNum >= languageLines.length

  /**
   *
   */
  const onKeyPress = (event: React.KeyboardEvent): void => {
    if (done) {
      return
    }

    const key = event.key

    if (!keyIgnores.includes(key)) {
      switch (key) {
        case 'Enter':
          if (true) {//index === languageExamples[language][pos.lineNum].length) {
            moveToNextLine()
          } else {
            markError(pos)
          }
          break

        case 'Backspace':
          if (errorPos.index === -1) {
            markError(pos)
          } else {
            setPos(prevPos => {
              return {
                index: prevPos.index - 1,
                lineNum: prevPos.lineNum,
              }
            })
          }
          break

        default:
          const result = isKeyCorrect(key)

          if (result) {
            setHits(prevHits => prevHits + 1)
            setErrorPos(invalidErrorPos)
          } else {
            markError(pos)
          }

            setPos(prevPos => {
              return {
                index: prevPos.index + 1,
                lineNum: prevPos.lineNum,
              }
            })
          break
      }
    }
  }

  return (
    <div style={{display: "inline"}}>
      Select a language: 
      <Dropdown
        options={defaultLanguages}
        onChange={onChangeLanguage}
      />
      or
      <FileUpload />
      <Codebox
        color={colors.hit}
        errorColor={colors.miss}
        lines={languageLines}
        pos={pos}
        errorPos={errorPos}
        errorMarks={errorMarks}
      />
      <TypingArea
        onKeyPress={onKeyPress}
      />
      <p>Hits: {hits}</p>
      <p>Misses: {misses}</p>
      <p>Hitrate: {hits > 0 ? formatDecimal(hits/(hits + misses) * 100.0, 2) : 0.0}%</p>
    </div>
  )
}
