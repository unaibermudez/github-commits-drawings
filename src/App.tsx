import Header from './components/Header';
import Home from './components/Home';
import { GridProvider } from './context/GridContext';

function App() {
  return (
    <GridProvider>
        <Header />
        <Home />
    </GridProvider>
  );
}

export default App;
