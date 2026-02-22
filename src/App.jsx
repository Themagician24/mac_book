import React from 'react'
import NavBar from './Components/NavBar.jsx'
import Hero from './Components/Hero.jsx'
import ProductViewer from './Components/ProductViewer.jsx'
import gsap from 'gsap';
import { ScrollTrigger} from 'gsap/all';
import Showcase from './Components/Showcase.jsx';




gsap.registerPlugin(ScrollTrigger);
const App = () => {
  return (
  <main>
    <NavBar />
    <Hero />
    <ProductViewer />
    <Showcase />
  </main>
  )
}

export default App
