import type { ParseArgParams, RgrgOptions } from './types'
import arg from 'arg'

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

// Options:
//   -v, --version          output the version number
//   -h, --help             output usage information
//   -o, --output <path>    specify output path
//   -r, --recursive        convert po files recursively
//   --config <path>        specify config file path
//   --cwd <path>           specify current working directory
export function createHelpMessage(param: ParseArgParams, options: RgrgOptions) {
  const foo: {
    flagString: string
    info: string
  }[] = []

  let helpMessage = 'Options:\n'

  for (const [key, value] of Object.entries(param)) {
    const aliasesString =
      value.aliases?.length === 1
        ? `${value.aliases[0]}, `
        : value.aliases?.join(', ') ?? ''
    const flagString = `${aliasesString}${key}`
    foo.push({ flagString, info: value.info })
  }
  const maxLength = Math.max(...foo.map((f) => f.flagString.length)) + 4
  for (const f of foo) {
    const padding = ' '.repeat(maxLength - f.flagString.length)
    helpMessage += `  ${f.flagString}${padding}${f.info}\n`
  }
  const usage = options.usage ? `Usage: ${options.usage}\n` : ''
  return usage + helpMessage
}

export default function rgrg(param: ParseArgParams, options: RgrgOptions) {
  if (options.help) {
    const helpMessage = createHelpMessage(param, options)
    return { ...arg(parseArg(param), options), helpMessage }
  }
  return arg(parseArg(param), options)
}
