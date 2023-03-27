import Confetti from '../components/confetti/confetti';

const ConfettiPage = () => {
  return (
    <Confetti
      position={[window.innerWidth, window.innerHeight]}
      enableCollisions={false}
      airFriction={0.04}
      velocity={29}
      angularVelocity={0.6}
      angle={-135}
      spread={20}
      volatility={0.75}
      duration={10e3}
      concentration={25}
    />
  );
};

export default ConfettiPage;
