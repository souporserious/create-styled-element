// Thanks again to glamorous! Especially to @marzelin, thank you so much!
const { appendFileSync } = require('fs')
const { resolve } = require('path')
const htmlTagNames = require('html-tag-names')
const svgTagNames = require('svg-tag-names')
const reserved = require('reserved')

function capitalize(s) {
  return s.slice(0, 1).toUpperCase() + s.slice(1)
}

function dashToCamelCase(s) {
  return s.replace(/-([a-z])/g, ([, char]) => char.toUpperCase())
}

function unCollide(name) {
  const prefix = 'Html'
  return reserved.includes(name) ? `${prefix}${name}` : name
}

const elementExports = htmlTagNames
  .concat(svgTagNames)
  .filter((tag, index, array) => array.indexOf(tag) === index)
  .map(tag => {
    const validJsName = dashToCamelCase(tag)
    const capitalName = capitalize(validJsName)
    const tagName = unCollide(capitalName)
    return `exports.${tagName} = createStyledElement.${tagName};`
  }).join`\n`

const buildFile = resolve(__dirname, './lib/index.js')
const toWrite = `\n${elementExports}`

appendFileSync(buildFile, toWrite)
