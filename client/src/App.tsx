import LandingPage from "./pages/LandingPage/landing.page"
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from "react-router-dom"

//css files
import './App.css'
import HomePage from "./pages/HomePage/home.page"
function App() {

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
