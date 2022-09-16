import { useBlock } from './block'
import { renderHook, waitFor } from '../../test/react'
import { connectors, devnetProvider, compiledErc20 } from '../../test/devnet'

describe('useBlock', () => {
  beforeAll(async () => {
    await devnetProvider.deployContract({
      contract: compiledErc20,
    })
  })

  it('returns the latest block by default', async () => {
    const { result } = renderHook(() => useBlock({ watch: false }), { connectors })

    await waitFor(() => {
      expect(result.current.data).toBeDefined()
    })
  })

  it.skip('returns an error', async () => {
    const { result } = renderHook(() => useBlock(), { connectors })

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy()
    })
  })
})