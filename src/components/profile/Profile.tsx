import { useSelector } from 'react-redux'
import '../../App.css'
// import { useEffect } from 'react'
// import { fetchTodos } from '../../store/todos/todos.action'
import { RootState } from '../../store/store'
import styles from './profile.module.css'
import { cakes, managerServices } from '../../services/data.service'

function Profile() {
  const { user } = useSelector((state: RootState) => state.auth)


  const getAllCAkes = async () => {
    try {
      const ordersPromise = managerServices.getOrders();
      const cakesPromise = cakes.getAllCakes();
      await Promise.all([ordersPromise, cakesPromise]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <section className={styles.wrapper}>
        <div className={styles.gridContainer}>
          <div className={styles.column1}>
            <p>Name: {user?.firstName}</p>
            <p>Surname: {user?.lastName}</p>
          </div>
          <div className={styles.column2}>
            <p>Role: {user?.role}</p>
            <p>Email: {user?.email}</p>
            <p>Town: {user?.town}</p>
            <p>Street: {user?.street}</p>
            <p>Phone: {user?.phoneNumber}</p>
          </div>
        </div>
        <button type="button" className="btn btn-warning" onClick={getAllCAkes}>Get all cakes</button>

      </section>

    </>
  )
}

export default Profile
