
import styles from './register.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loginUser, registerUser } from '../../store/auth/auth.action';
import useLocalStorage from '../../hooks/useLS';
import { useNavigate } from 'react-router-dom';


interface FormValues {
  email: string;
  password: string;
  passwordRepeat: string

}



export default function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { registerFormError } = useAppSelector(state => state.auth)


  const [data, setData] = useLocalStorage<FormValues>('regForm', {
    email: '',
    password: '',
    passwordRepeat: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const dispatchResult = await dispatch(registerUser(data))
    if (registerUser.fulfilled.match(dispatchResult)) {
      dispatch(loginUser({ username: data.email, password: data.password }));
      navigate("/");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.registerWrapper}>
        <input value={data.email} type="email" onChange={(e) => setData({ ...data, email: e.target.value })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        <input value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        <input value={data.passwordRepeat} onChange={(e) => setData({ ...data, passwordRepeat: e.target.value })} type="password" className="form-control" id="exampleInputPassword2" placeholder="Password repeat" />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {registerFormError && registerFormError.map(el => <p style={{ justifyContent: 'flex-start' }}>{el.field}: {el.message}</p>)}
    </div>
  )
}
