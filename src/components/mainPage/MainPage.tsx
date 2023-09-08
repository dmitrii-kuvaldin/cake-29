import '../../App.css'
import { useAppSelector } from '../../hooks/hooks'


function MainPage() {
  const { user } = useAppSelector(state => state.auth)

  return (
    <>
      {!user ? (<h2>Try to login</h2>) : (<><h2>Good to see you again!</h2><p>Your email: {user?.email}</p></>)}

    </>
  )
}

export default MainPage
