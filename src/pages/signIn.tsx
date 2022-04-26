import { Navbar } from '../components'

import {Footer, SignInForm} from '../containers'

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
