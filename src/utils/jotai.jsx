import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const resumeAtom = atomWithStorage('resume', '')
export const historyAtom = atomWithStorage('history', [])   // store history of past interviews