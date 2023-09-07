import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Card from './components/card/card'
import Form from './components/form/form'
import { useEffect } from 'react'
import { fetchTodos } from './store/todos/todos.action'
import { AppDispatch, RootState } from './store/store'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, todos, error } = useSelector((state: RootState) => state.todos)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch]);

  return (
    <>
      <Form />
      <div className='cardsLayout'>
        {isLoading ? <div>is loading...</div> : error ? <p>{error.message}</p> : todos ? todos.map((el) =>
          <Card key={el.id} id={el.id} name={el.name} />
        ) : <p>Ошибка</p>}
      </div>
    </>
  )
}

export default App
