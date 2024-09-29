import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const progressAtom = atom(0) // 0-100, out of 5 questions.
export const resumeAtom = atomWithStorage('resume', '')
export const historyAtom = atomWithStorage('history', [])   // store history of past interviews