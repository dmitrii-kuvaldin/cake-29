
import { useDispatch } from 'react-redux'
import * as todoAction from '../store/todos/todos.action'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'


const rootActions = {
  ...todoAction,
}


export const useActions = () => {
  const dispatch = useDispatch()
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}


