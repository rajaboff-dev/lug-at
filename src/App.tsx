import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./pages/Home.tsx";
import AppLayout from "./layouts/AppLayout.tsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
