import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { NAME } from '../../data/content'
import { HomePage } from '../HomePage'

describe('HomePage', () => {
  it('renders the name and both hero CTA buttons', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByText(NAME)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /view projects/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /contact me/i })).toBeInTheDocument()
  })
})
