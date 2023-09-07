import { useDispatch } from 'react-redux'
import styles from './form.module.css'
import { FormEvent, useState } from 'react';
import { addTodo } from '../../store/todos/todos.action';
import { AppDispatch } from '../../store/store';
import { ITodoData } from '../../types/todos.types';

export default function Form() {
  const dispatch = useDispatch<AppDispatch>()
  const [form, setForm] = useState<ITodoData>({
    name: ''
  });

  const submitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addTodo(form))
    setForm({ name: '' })
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <form onSubmit={submitHandle}>
          <div className="mb-3">
            <input onChange={(e) => setForm({ ...form, name: e.target.value })} value={form.name} type="text" className="form-control" />
          </div>
          <button style={{ marginRight: 5 }} type="submit" className="btn btn-primary">Add ToDo</button>
        </form>
      </div>
    </div>
  )
}

