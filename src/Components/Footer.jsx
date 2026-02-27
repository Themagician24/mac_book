import React from 'react'
import { footerLinks } from '../constants/index.js'

const Footer = () => {
  return (
    <footer>

      <div className="info">

      <p>More ways to shop: Find an Apple Store or other retailer near you. Or call +33 123 456 789.</p>
      <img src="/logo.svg" alt="Apple Logo" />

      </div>

      <hr />

      <div className="links">
        <p>Copyright © 2026 Apple Inc. All rights reserved.</p>

        <ul>
          {footerLinks.map(({label, link }) => (
            <li key={link}>
              <a href={link}>{label}</a>
            </li>
          ))}
        </ul>

      </div>

    </footer>
  )
}

export default Footer
