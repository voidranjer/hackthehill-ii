import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const resumeAtom = atomWithStorage('resume', '')