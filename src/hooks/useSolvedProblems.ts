import { useCallback, useEffect, useState } from 'react'
import { getSolvedProblems } from '../lib/solvedProblems'
import type { SolvedProblem } from '../types/solvedProblem'

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; problems: SolvedProblem[] }

/** Mirrors ProblemsScreen's FutureBuilder: loading/error/success states plus
 * a retry function for the "Try again" button. */
export function useSolvedProblems() {
  const [state, setState] = useState<State>({ status: 'loading' })

  const fetchProblems = useCallback(() => {
    getSolvedProblems()
      .then((problems) => setState({ status: 'success', problems }))
      .catch((error: unknown) =>
        setState({
          status: 'error',
          message: error instanceof Error ? error.message : 'Something went wrong loading problems.',
        }),
      )
  }, [])

  const retry = useCallback(() => {
    setState({ status: 'loading' })
    fetchProblems()
  }, [fetchProblems])

  useEffect(() => {
    fetchProblems()
  }, [fetchProblems])

  return { ...state, retry }
}
