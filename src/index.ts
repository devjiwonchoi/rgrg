import arg from 'arg'
import type { ParseArgParams } from './types'

export function parseArg(param: ParseArgParams) {
  const spec: arg.Spec = {}
  for (const [key, value] of Object.entries(param)) {
    if (value.aliases) {
      for (const alias of value.aliases) {
        spec[alias] = key
      }
    }

    const isStringArg = key.includes('<') && key.endsWith('>')
    if (!isStringArg) {
      spec[key] = Boolean
      continue
    }

    const flag = key.split(' ')[0]
    if (!flag?.startsWith('--')) {
      throw new Error(
        `Invalid flag syntax at "${flag}". Flag must start with "--".`
      )
    }
    spec[flag] = key.includes(',') ? [String] : String
  }
  return spec
}

export default function rgrg(param: ParseArgParams, options: arg.Options) {
  return arg(parseArg(param), options)
}
