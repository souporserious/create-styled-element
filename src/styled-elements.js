import createStyledElement from './index'
import htmlTagNames from 'html-tag-names'
import svgTagNames from 'svg-tag-names'

/*
 * repurposed from Glamorous:
 * https://github.com/paypal/glamorous/blob/master/src/index.js#L26-L45
 *
 * This creates a styledElement component for each DOM element so you can simply do:
 * <styledElements.Div
 *   css={{
 *     color: 'green'
 *   }}
 * >
 *   I'm green!
 * </styledElements.Div>
 *
 */
const capitalize = str => str.charAt(0).toUpperCase() + str.substring(1)
const domElements = htmlTagNames
  .concat(svgTagNames)
  .filter((tag, index, array) => array.indexOf(tag) === index)

export default domElements.reduce((components, tag) => {
  const capitalTag = capitalize(tag)
  components[capitalTag] = props => createStyledElement(tag, props)()
  components[capitalTag].displayName = `Styled${capitalTag}`
  return components
}, {})
