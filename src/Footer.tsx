import React from 'react'
import githubLogo from './github-logo.svg'

type FooterProps = {
}

/**
 *
 */
export const Footer = (props: FooterProps) => {
  return (
    <div className="footer">
      <span className="vertically-center">
        <a href="https://github.com/MisanthropicBit/typing-test-app">
          <img
            src={githubLogo}
            alt=""
            width="30"
          />
        </a>
      </span>
      <span className="vertically-center">
        <span className="footer-text">Built with React and Typescript</span>
      </span>
    </div>
  )
}
