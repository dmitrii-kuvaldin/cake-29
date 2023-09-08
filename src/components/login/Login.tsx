import styles from './login.module.css'
import useLocalStorage from '../../hooks/useLS';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchUser, loginUser } from '../../store/auth/auth.action';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  username: string;
  password: string;
}

export default function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  // const { authChecked, registerFormError, loginFormError, user } = useAppSelector((state: RootState) => state.auth)


  const [form, setForm] = useLocalStorage<FormValues>('loginForm', {
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(form);
    const formData = await dispatch(loginUser(form))
    console.log('formData', formData);
    if (loginUser.fulfilled.match(formData)) {
      dispatch(fetchUser());
      navigate("/");
    }
    if (loginUser.rejected.match(formData)) {
      console.error(formData.error.message);
    }
    setForm({
      username: '',
      password: '',
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.loginWrapper}>
        <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
