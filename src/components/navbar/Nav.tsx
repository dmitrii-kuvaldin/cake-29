import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import styles from './nav.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { logoutUser } from '../../store/auth/auth.action'

export default function Nav() {
  const dispatch = useAppDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth)
  return (
    <div className={styles.navWrapper}>

      <ul className="nav">
        {!user ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link " to="/auth/login">Login</NavLink>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link" to="/auth/register">Registration</NavLink>
            </li>
          </>
        ) : location.pathname === "/" ?
          (user.role === "ADMIN" ?
            (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/tasks">All tasks</Link>
              </li>
            ) :
            (
              <>
                <li className="nav-item ">
                  <NavLink className="nav-link" to="/tasks">My tasks</NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/profile">My profile</NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/cakes">Cakes</NavLink>
                </li>
              </>
            ))
          :
          (
            <li>
              <NavLink className="nav-link" to="/">Main page</NavLink>
            </li>)
        }
        {
          user && (
            <li className="nav-item">
              <NavLink className="nav-link" onClick={() => { dispatch(logoutUser()); navigate("/"); }} to="#">Logout</NavLink>
            </li>
          )
        }
      </ul >
    </div >
  )
}
