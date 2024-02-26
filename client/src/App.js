import { BrowserRouter, Route, Routes } from "react-router-dom";

import RecepiesOwerwiev from './views/RecepiesOwerwiev';

import "./App.css";
import RecipeDetail from "./views/RecipeDetail";

function App() {
  return (
    <div className="App-header">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RecepiesOwerwiev/>} />
          <Route path="/recipe/:id" element={<RecipeDetail/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
