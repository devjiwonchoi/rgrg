import type { Options } from 'arg'
export type ParseArgParams = {
  [key: string]: { info: string; aliases?: string[] }
}

export type RgrgOptions = Options & {
  help?: true
  usage?: string
}
