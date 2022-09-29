import { defaultFiles } from './defaults'
import { maskClickFiles } from './mask-click'
import { closeClickFiles } from './close-click'
import { disableKeyboardFiles } from './disable-keyboard'
import { scrollSmoothFiles } from './scroll-smooth'
import { paddingFiles } from './padding'
import { customPrevNextFiles } from './custom-prev-next'
import { rtlFiles } from './rtl'
import { customStylesFiles } from './custom-styles'

const filesByDemo = {
  'mask-click': maskClickFiles,
  'close-click': closeClickFiles,
  'disable-keyboard': disableKeyboardFiles,
  'scroll-smooth': scrollSmoothFiles,
  padding: paddingFiles,
  'custom-prev-next': customPrevNextFiles,
  rtl: rtlFiles,
  'custom-styles': customStylesFiles,
}

export function configFiles(demoId: string) {
  const files =
    demoId && filesByDemo[demoId] ? filesByDemo[demoId] : defaultFiles

  return files
}
