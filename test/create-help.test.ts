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

describe('help message', () => {
  it('should create help message', () => {
    const result = rgrg(param, { argv, help: true, usage: 'po2mo [options]' })
    expect(result.helpMessage).toEqual(text)
  })
})

const text =
  'Usage: po2mo [options]\n' +
  'Options:\n' +
  '  -v, --version          output the version number\n' +
  '  -h, --help             output usage information\n' +
  '  -o, --output <path>    specify output path\n' +
  '  -r, --recursive        convert po files recursively\n' +
  '  --config <path>        specify config file path\n' +
  '  --cwd <path>           specify current working directory\n'
