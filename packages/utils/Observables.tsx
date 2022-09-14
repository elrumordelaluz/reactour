import React, { useRef, useEffect, useState } from 'react'
import useMutationObserver from '@rooks/use-mutation-observer'
import ResizeObserver from 'resize-observer-polyfill'

const Observables: React.FC<ObservablesProps> = ({
  mutationObservables,
  resizeObservables,
  refresh,
}) => {
  const [mutationsCounter, setMutationsCounter] = useState(0)
  const ref = useRef(document.documentElement || document.body)

  function refreshHighlightedRegionIfObservable(nodes: NodeList) {
    const posibleNodes = Array.from(nodes)
    for (const node of posibleNodes) {
      if (mutationObservables) {
        if (!(node as Element).attributes) {
          continue
        }
        const found = mutationObservables.find((observable: string) =>
          (node as Element).matches(observable)
        )

        if (found) {
          refresh(true)
        }
      }
    }
  }

  function incrementMutationsCounterIfObservable(nodes: NodeList) {
    const posibleNodes = Array.from(nodes)
    for (const node of posibleNodes) {
      if (resizeObservables) {
        if (!(node as Element).attributes) {
          continue
        }
        const found = resizeObservables.find((observable: string) =>
          (node as Element).matches(observable)
        )

        if (found) setMutationsCounter(mutationsCounter + 1)
      }
    }
  }

  useMutationObserver(
    ref,
    (mutationList: MutationRecord[]) => {
      for (const mutation of mutationList) {
        if (mutation.addedNodes.length !== 0) {
          refreshHighlightedRegionIfObservable(mutation.addedNodes)
          incrementMutationsCounterIfObservable(mutation.addedNodes)
        }

        if (mutation.removedNodes.length !== 0) {
          refreshHighlightedRegionIfObservable(mutation.removedNodes)
          incrementMutationsCounterIfObservable(mutation.removedNodes)
        }
      }
    },
    { childList: true, subtree: true }
  )

  useEffect(() => {
    if (!resizeObservables) {
      return
    }

    const resizeObserver: ResizeObserver = new ResizeObserver(() => {
      refresh()
    })

    for (const observable of resizeObservables) {
      const element = document.querySelector(observable)
      if (element) {
        resizeObserver.observe(element)
      }
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [resizeObservables, mutationsCounter])

  return null
}

type ObservablesProps = {
  mutationObservables?: string[]
  resizeObservables?: string[]
  refresh?: any
}

export default Observables
