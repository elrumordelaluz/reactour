const launchit = require('launchit')

const apps = {
  '@reactour/utils': {
    path: '.',
    script: 'yarn workspace @reactour/utils start',
  },
  '@reactour/mask': {
    path: '.',
    script: 'yarn workspace @reactour/mask start',
    waitBefore: 5000,
  },
  '@reactour/popover': {
    path: '.',
    script: 'yarn workspace @reactour/popover start',
    waitBefore: 5000,
  },
  '@reactour/tour': {
    path: '.',
    script: 'yarn workspace @reactour/tour start',
    waitBefore: 5000,
  },
  '@reactour/playground': {
    path: '.',
    script: 'yarn workspace @reactour/playground start',
    waitBefore: 8000,
  },
}

launchit({ apps })
