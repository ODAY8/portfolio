export interface SolvedProblem {
  id: string
  title: string
  problem: string
  solution: string
  tags: string[]
  difficulty: string
  link: string | null
  createdAt: Date
}

/** Shape of a raw row from the Supabase `solved_problems` table. */
export interface SolvedProblemRow {
  id: string
  title: string
  problem: string
  solution: string
  tags: string[] | null
  difficulty: string | null
  link: string | null
  created_at: string
}
