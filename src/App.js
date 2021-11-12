import { BrowserRouter,Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import Exchange from './pages/Exchange';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Exchange />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
