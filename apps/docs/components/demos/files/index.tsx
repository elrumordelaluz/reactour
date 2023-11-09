import { defaultFiles } from './defaults'
import { maskClickFiles } from './mask-click'
import { closeClickFiles } from './close-click'
import { disableKeyboardFiles } from './disable-keyboard'
import { scrollSmoothFiles } from './scroll-smooth'
import { paddingFiles } from './padding'
import { customPrevNextFiles } from './custom-prev-next'
import { customHandlersFiles } from './custom-handlers'
import { rtlFiles } from './rtl'
import { customStylesFiles } from './custom-styles'
import { scrollLockFiles } from './scroll-lock'
import { customBadgeFiles } from './custom-badge'
import { disableDotsNavFiles } from './disable-dots-nav'
import { disableInteractionFiles } from './disable-interaction'
import { toggleNavPartsFiles } from './toggle-nav-parts'
import { startAtFiles } from './start-at'

const filesByDemo = {
  'mask-click': maskClickFiles,
  'close-click': closeClickFiles,
  'disable-keyboard': disableKeyboardFiles,
  'scroll-smooth': scrollSmoothFiles,
  padding: paddingFiles,
  'custom-prev-next': customPrevNextFiles,
  'custom-handlers': customHandlersFiles,
  rtl: rtlFiles,
  'custom-styles': customStylesFiles,
  'scroll-lock': scrollLockFiles,
  'custom-badge': customBadgeFiles,
  'disable-dots-nav': disableDotsNavFiles,
  'disable-interaction': disableInteractionFiles,
  'toggle-nav-parts': toggleNavPartsFiles,
  'start-at': startAtFiles,
}

export function configFiles(demoId: string) {
  const files =
    demoId && filesByDemo[demoId] ? filesByDemo[demoId] : defaultFiles

  return files
}
