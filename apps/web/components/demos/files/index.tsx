import { defaultFiles } from './defaults'
import { maskClickFiles } from './mask-click'
import { closeClickFiles } from './close-click'
import { disableKeyboardFiles } from './disable-keyboard'
const filesByDemo = {
  'mask-click': maskClickFiles,
  'close-click': closeClickFiles,
  'disable-keyboard': disableKeyboardFiles,
}

export function configFiles(demoId: string) {
  const files =
    demoId && filesByDemo[demoId] ? filesByDemo[demoId] : defaultFiles

  return files
}
