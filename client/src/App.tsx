import LandingPage from "./pages/LandingPage/landing.page"
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from "react-router-dom"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
//css files
import './App.css'
import HomePage from "./pages/HomePage/home.page"
function App() {

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </DndProvider>
  )
}

export default App
