import React, { createElement } from 'react'
import { css as glamor } from 'glamor'
import htmlTagNames from 'html-tag-names'
import svgTagNames from 'svg-tag-names'

/*
 * This works just like React createElement, but allows us to pass default styling
 * as well as gives us a "css" prop that we can use to add overrides later on
 *
 * MyStyledComponent = props => createStyledElement(MyComponent, props)({
 *   color: '#b4da55'
 * })
 *
 */
function createStyledElement(
  component,
  { css, className, ...props } = {},
  children
) {
  return (...chunks) => {
    const classNames = chunks.map(chunk => glamor(chunk))

    if (css) {
      classNames.push(glamor(css))
    }

    if (className) {
      classNames.push(className)
    }

    return createElement(
      component,
      { className: classNames.join(' '), ...props },
      props.children || children
    )
  }
}

/*
 * repurposed from Glamorous:
 * https://github.com/paypal/glamorous/blob/master/src/index.js#L26-L45
 *
 * This creates a styledElement component for each DOM element so you can simply do:
 * <createStyledElement.Div
 *   css={{
 *     color: 'green'
 *   }}
 * >
 *   I'm green!
 * </createStyledElement.Div>
 *
 */
const capitalize = str => str.charAt(0).toUpperCase() + str.substring(1)
const domElements = htmlTagNames
  .concat(svgTagNames)
  .filter((tag, index, array) => array.indexOf(tag) === index)

Object.assign(
  createStyledElement,
  domElements.reduce((components, tag) => {
    const capitalTag = capitalize(tag)
    components[capitalTag] = props => createStyledElement(tag, props)()
    components[capitalTag].displayName = `Styled${capitalTag}`
    return components
  }, {})
)

export default createStyledElement
