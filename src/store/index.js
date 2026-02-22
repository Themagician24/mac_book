import { create } from 'zustand'

const useMacbookStore = create((set) => ({
    color: '#2e2c2e',
    // size: '16',
    setColor: (color) => set({ color }),
    // setSize: (size) => set({ size })

    scale: 0.08,
    setScale: (scale) => set({ scale }),

    reset: () => set({ color: '#2e2c3e', scale: 0.08 })
}))

export default useMacbookStore;
