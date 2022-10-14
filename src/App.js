import classes from './App.module.scss';
import { useState, useReducer } from 'react';
import dice1 from './assets/dice-1.png';
import dice2 from './assets/dice-2.png';
import dice3 from './assets/dice-3.png';
import dice4 from './assets/dice-4.png';
import dice5 from './assets/dice-5.png';
import dice6 from './assets/dice-6.png';

const PlayerCard = (props) => {
  return (
    <div className={`${classes.player} ${classes[`player--${props.player}`]}`}>
      <div>
        Player {props.player}:<span>{props.score}</span>
      </div>
      <div className={classes.current}>
        current: <span>{props.total}</span>
      </div>
    </div>
  );
};

function App() {
  const die = [dice1, dice2, dice3, dice4, dice5, dice6];

  const [dice, setDice] = useState(0);
  //  INITIALIZES NEW GAME //
  const resetHandler = () => {};
  // HOLDS CURRENT SCORE AND ADDS TO TOTAL SCORE //
  const holdHandler = () => {};
  // ROLLS DICE //
  const rollHandler = () => {
    setDice(Math.trunc(Math.random() * 6));
  };
  return (
    <main className={classes.container}>
      <button className={classes.reset}>new game</button>
      <img className={classes.dice} src={die[dice]} alt='dice' />
      <PlayerCard player={1} />
      <PlayerCard player={2} />
      <div className={classes.buttons}>
        <button onClick={rollHandler} className={classes.roll}>
          🎲 Roll dice
        </button>
        <button className={classes.hold}>📥 Hold</button>
      </div>
    </main>
  );
}

export default App;
