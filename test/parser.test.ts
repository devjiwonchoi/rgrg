import rgrg from '../src'

const param = {
  '--version': {
    info: 'output the version number',
    aliases: ['-v'],
  },
  '--help': {
    info: 'output usage information',
    aliases: ['-h'],
  },
  '--output <path>': {
    info: 'specify output path',
    aliases: ['-o'],
  },
  '--recursive': {
    info: 'convert po files recursively',
    aliases: ['-r'],
  },
  '--config <path>': {
    info: 'specify config file path',
  },
  '--cwd <path>': {
    info: 'specify current working directory',
  },
}
const dummyProcessArgv = [
  'node',
  'index.ts',
  '--config',
  'config.json',
  '--output',
  'output',
  'src',
  '--help',
]
const argv = dummyProcessArgv.slice(2)

describe('rgrg', () => {
  it('should parse arguments', () => {
    const result = rgrg(param, { argv })
    expect(result).toEqual({
      _: ['src'],
      '--config': 'config.json',
      '--output': 'output',
      '--help': true,
    })
  })
})
