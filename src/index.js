import React, { createElement } from 'react'
import { css as glamor } from 'glamor'
import htmlTagNames from 'html-tag-names'
import svgTagNames from 'svg-tag-names'
import objectAssign from 'object-assign'

/*
 * This works just like React createElement, but allows us to pass default styling
 * as well as gives us a "css" prop that we can use to add overrides later on
 *
 * MyStyledComponent = createStyledElement(MyComponent)({
 *   color: '#b4da55'
 * })
 *
 */
function createStyledElement(component, props, children) {
  return (...chunks) => {
    const classNames = chunks.map(chunk => (chunk ? glamor(chunk) : ''))

    if (props) {
      const { innerRef, css, className, ...restProps } = props

      if (typeof component === 'string') {
        restProps.ref = innerRef
      } else {
        restProps.innerRef = innerRef
      }

      if (css) {
        classNames.push(glamor(css))
      }

      if (className) {
        classNames.push(className)
      }

      return createElement(
        component,
        { className: classNames.join(' ').trim(), ...restProps },
        restProps.children || children
      )
    } else {
      return ({ innerRef, css, className = '', ...restProps }) => {
        const glamorClass = css ? glamor(css) : ''

        if (typeof component === 'string') {
          restProps.ref = innerRef
        } else {
          restProps.innerRef = innerRef
        }

        return createElement(component, {
          className: classNames.concat(glamorClass, className).join(' ').trim(),
          ...restProps,
        })
      }
    }
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

objectAssign(
  createStyledElement,
  domElements.reduce((components, tag) => {
    const capitalTag = capitalize(tag)
    components[capitalTag] = createStyledElement(tag)()
    components[capitalTag].displayName = `Styled${capitalTag}`
    return components
  }, {})
)

export default createStyledElement
