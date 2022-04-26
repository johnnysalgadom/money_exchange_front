import {Navbar} from '../components'
import {SignInForm, Footer} from '../containers'

const Home = () => {

  return (
    <div className="siginPage">
      <Navbar />
      <SignInForm />
      <Footer />
    </div>
  )
}

export default Home
