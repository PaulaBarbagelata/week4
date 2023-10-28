
import './App.css';

import Weather from "./Weather"

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
        <p>
        <Weather />
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
