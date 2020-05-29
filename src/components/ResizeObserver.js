import { useEffect, useState } from 'react'

export default ({ step, refresh }) => {
  const [mutationsCounter, setMutationsCounter] = useState(0)

  useEffect(() => {
    if (!step.resizeObservables) {
      return
    }

    const incrementMutationsCounterIfObservable = nodes => {
      for (const node of nodes) {
        if (!node.attributes) {
          continue
        }

        const found = step.resizeObservables.find(observable =>
          node.matches(observable)
        )

        if (found) {
          // hack to postpone execution in the event queue
          setTimeout(() => setMutationsCounter(mutationsCounter + 1), 0)
        }
      }
    }

    const mutationObserver = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        if (0 !== mutation.addedNodes.length) {
          incrementMutationsCounterIfObservable(mutation.addedNodes)
        }

        if (0 !== mutation.removedNodes.length) {
          incrementMutationsCounterIfObservable(mutation.removedNodes)
        }
      }
    })

    const observable = document.documentElement || document.body
    const config = { childList: true, subtree: true }

    mutationObserver.observe(observable, config)

    return () => {
      mutationObserver.disconnect()
    }
  }, [mutationsCounter])

  useEffect(() => {
    if (!step.resizeObservables) {
      return
    }

    const resizeObserver = new ResizeObserver(entries => {
      refresh()
    })

    for (const observable of step.resizeObservables) {
      const element = document.querySelector(observable)

      if (element) {
        resizeObserver.observe(element)
      }
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [mutationsCounter])

  return null
}
