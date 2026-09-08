import { supabase } from './supabaseClient'
import type { SolvedProblem, SolvedProblemRow } from '../types/solvedProblem'

function normalize(row: SolvedProblemRow): SolvedProblem {
  return {
    id: row.id,
    title: row.title,
    problem: row.problem,
    solution: row.solution,
    tags: row.tags ?? [],
    difficulty: row.difficulty ?? 'Medium',
    link: row.link,
    createdAt: new Date(row.created_at),
  }
}

/**
 * Read-only from the client -- new entries are added from the Supabase
 * dashboard. Mirrors the Flutter ProblemsRepository.fetchAll() exactly:
 * newest first, same default-filling for nullable columns.
 */
export async function getSolvedProblems(): Promise<SolvedProblem[]> {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Copy .env.example to .env.local and restart the dev server.',
    )
  }

  const { data, error } = await supabase
    .from('solved_problems')
    .select()
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data as SolvedProblemRow[]).map(normalize)
}
