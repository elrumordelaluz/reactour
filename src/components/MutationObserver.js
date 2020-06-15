import { useEffect } from 'react'

export default ({ step, refresh }) => {
  useEffect(() => {
    if (!step.mutationObservables) {
      return
    }

    const refreshHighlightedRegionIfObservable = nodes => {
      for (const node of nodes) {
        if (!node.attributes) {
          continue
        }

        const found = step.mutationObservables.find(observable =>
          node.matches(observable)
        )

        if (found) {
          refresh()
        }
      }
    }

    const mutationObserver = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        if (0 !== mutation.addedNodes.length) {
          refreshHighlightedRegionIfObservable(mutation.addedNodes)
        }

        if (0 !== mutation.removedNodes.length) {
          refreshHighlightedRegionIfObservable(mutation.removedNodes)
        }
      }
    })

    const observable = document.documentElement || document.body
    const config = { childList: true, subtree: true }

    mutationObserver.observe(observable, config)

    return () => {
      mutationObserver.disconnect()
    }
  }, [step])

  return null
}
