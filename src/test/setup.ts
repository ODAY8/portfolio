import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// jsdom doesn't implement these -- stub them so components using
// IntersectionObserver/ResizeObserver/matchMedia/canvas don't crash tests.
class MockObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal('IntersectionObserver', MockObserver)
vi.stubGlobal('ResizeObserver', MockObserver)

vi.stubGlobal(
  'matchMedia',
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
)

HTMLCanvasElement.prototype.getContext = vi.fn(() => null) as unknown as typeof HTMLCanvasElement.prototype.getContext
