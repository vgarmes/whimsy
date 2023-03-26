import './App.css';
import Confetti from './components/confetti/confetti';

function App() {
  return (
    <div className="App">
      <Confetti
        position={[window.innerWidth / 2, window.innerHeight]}
        enableCollisions={true}
        airFriction={0.04}
        velocity={29}
        angularVelocity={0.6}
        angle={-90}
        spread={20}
        volatility={0.75}
        duration={6000}
        concentration={20}
      />
    </div>
  );
}

export default App;
