import { useDispatch } from 'react-redux'
import styles from './form.module.css'
import { FormEvent, useState } from 'react';
import { addTodo } from '../../store/todos/todos.action';
import { AppDispatch } from '../../store/store';
import { ITodoData } from '../../types/todos.types';

export default function Form() {
  const dispatch = useDispatch<AppDispatch>()
  const [form, setForm] = useState<ITodoData>({
    name: '',
    description: ''
  });

  const submitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('form ===>', form);
    dispatch(addTodo(form))
    setForm({ name: '', description: '' })
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <form onSubmit={submitHandle}>
          <div className="mb-3">
            <input placeholder='name' onChange={(e) => setForm({ ...form, name: e.target.value })} value={form.name} type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <input placeholder='description' onChange={(e) => setForm({ ...form, description: e.target.value })} value={form.description} type="text" className="form-control" />
          </div>
          <button style={{ marginRight: 5 }} type="submit" className="btn btn-primary">Add ToDo</button>
        </form>
      </div>
    </div>
  )
}

