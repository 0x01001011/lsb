import {  createSelector, Slice } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import  deepEqual from 'fast-deep-equal'

export const createSelectorForSlice = <T>(slice: Slice<T,any>): TypedUseSelectorHook<T> => {
  const selectToSlicePath = (s: any) => s[slice.name]
  return (selectFn, equalityFn = (a, b) => deepEqual(a, b)) => {
    const selector = createSelector(selectToSlicePath, (s: any) => selectFn(s))
    return useSelector((s) => selector(s), equalityFn)
  }
}