import React, { createElement } from 'react'
import { css as glamor } from 'glamor'

export default function createStyledElement(
  component,
  { css, className, ...props } = {},
  children
) {
  return defaultCss => {
    const glamorClassName = glamor(defaultCss, css)
    const cssClassName = className
      ? `${glamorClassName} ${className}`
      : glamorClassName
    return createElement(
      component,
      { className: cssClassName, ...props },
      props.children || children
    )
  }
}
