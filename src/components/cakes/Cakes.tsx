import { useSelector } from 'react-redux'
import '../../App.css'
// import { useEffect } from 'react'
// import { fetchTodos } from '../../store/todos/todos.action'
import { RootState } from '../../store/store'
import styles from './cakes.module.css'
import { cakes } from '../../services/data.service'
import { useState } from 'react'
import ICake from '../../types/cake.types'

function Cakes() {
  const { user } = useSelector((state: RootState) => state.auth)

  const [allCakes, setAllCakes] = useState<ICake[]>([]);



  const getAllCakes = async () => {
    try {
      console.log('id', user?.id);
      const response = await cakes.getAllCakes();
      console.log('response', response);
      setAllCakes(response.cakes)


    } catch (error) {
      console.error(error);
    }
  }

  console.log('allCakes', allCakes);

  return (
    <>
      <section className={styles.wrapper}>
        <p>All cakes</p>

        {!allCakes ? <p>No cakes</p> : allCakes.map((el) =>
          <div key={el.id}>
            <p>{el.name}</p>
            <img width='100px' src={`https://github.com/OlegKarimov/ArtCake_FrontEnd/blob/dev/Images/cupcakes/img/${el.id}.jpg?raw=true`} alt="pic" />
          </div>

        )}

        <button type="button" className="btn btn-warning" onClick={getAllCakes}>Get all cakes</button>

      </section>

    </>
  )
}

export default Cakes
