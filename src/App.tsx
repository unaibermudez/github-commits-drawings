import Header from './components/Header';
import Home from './components/Home';
import { GridProvider } from './context/GridContext';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <GridProvider>
        <Header />
        <Home />
    </GridProvider>
  );
}

export default App;
