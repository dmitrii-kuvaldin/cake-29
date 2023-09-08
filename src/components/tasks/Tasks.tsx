import { useDispatch, useSelector } from 'react-redux'
import '../../App.css'
import Card from '../card/card'
import Form from '../form/form'
import { useEffect } from 'react'
import { fetchTodos } from '../../store/todos/todos.action'
import { AppDispatch, RootState } from '../../store/store'
import styles from './tasks.module.css'

function Tasks() {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, todos, error } = useSelector((state: RootState) => state.todos)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch]);

  return (
    <>
      <section className={styles.wrapper}>
        <Form />
        <div className='cardsLayout'>
          {isLoading ? <div>is loading...</div> : error ? <p>{error.message}</p> : todos ? todos?.tasks?.map((el) =>
            <Card key={el.id} id={el.id} description={el.description} name={el.name} />
          ) : <p>Ошибка</p>}
        </div>
      </section>
    </>
  )
}

export default Tasks
