import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"

const Layout = ( {children}) => {
  return (
    <>
    <Navbar/>
   
    <div className="container max-w-9xl mx-auto ">
      {children}
    </div>



<Footer/>

    </>
  )
}

export default Layout