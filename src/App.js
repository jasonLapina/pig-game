import classes from './App.module.scss';
import { useState, useReducer } from 'react';
import dice0 from './assets/dice-0.png';
import dice1 from './assets/dice-1.png';
import dice2 from './assets/dice-2.png';
import dice3 from './assets/dice-3.png';
import dice4 from './assets/dice-4.png';
import dice5 from './assets/dice-5.png';
import dice6 from './assets/dice-6.png';
import { act } from 'react-dom/test-utils';

const PlayerCard = (props) => {
  return (
    <div
      className={`${classes.player} ${classes[`player--${props.player}`]} ${
        props.active ? classes.active : ''
      }`}
    >
      <div>
        Player {props.player}:<span>{props.score}</span>
      </div>
      <div className={classes.current}>
        current: <span>{props.total}</span>
      </div>
    </div>
  );
};

// REDUCER FUNCTION FOR CURRENT SCORE AND TOTAL SCORE //
const scoreReducer = (state, action) => {
  if (action.type == 'RESET') {
    return { activePlayer: 1, dice: 0, score: [0, 0], total: [0, 0] };
  }
  if (action.type == 'HOLD') {
    if (action.active == 1) {
      return {
        activePlayer: 2,
        dice: 0,
        score: [0, 0],
        total: [state.total[0] + action.value, state.total[1]],
      };
    } else
      return {
        activePlayer: 1,
        dice: 0,
        score: [0, 0],
        total: [state.total[0], state.total[1] + action.value],
      };
  }
  // USER ROLLS A 1, WE SWITCH ACTIVE PLAYERS //
  if (action.active === 1) {
    if (action.value.score === 1) {
      return {
        activePlayer: 2,
        dice: action.value.dice,
        score: [0, 0],
        total: [state.total[0], state.total[1]],
      };
    }
    //// IF NOT DICE NO. IS ADDED TO CURRENT SCORE FOR ACTIVE PLAYER ///
    else
      return {
        activePlayer: 1,
        dice: action.value.dice,
        score: [state.score[0] + action.value.score, 0],
        total: [state.total[0], state.total[1]],
      };
  }
  if (action.active === 2) {
    if (action.value.score === 1) {
      return {
        activePlayer: 1,
        dice: action.value.dice,
        score: [0, 0],
        total: [state.total[0], state.total[1]],
      };
    } else
      return {
        activePlayer: 2,
        dice: action.value.dice,
        score: [state.score[0], state.score[1] + action.value.score],
        total: [state.total[0], state.total[1]],
      };
  }
  return { activePlayer: 1, dice: 0, score: [0, 0], total: [0, 0] };
};

function App() {
  const die = [dice0, dice1, dice2, dice3, dice4, dice5, dice6];
  const [state, dispatchState] = useReducer(scoreReducer, {
    activePlayer: 1,
    dice: 0,
    score: [0, 0],
    total: [0, 0],
  });

  // determines if a player has won and therefore render backdrop //
  const [hasWinner, setHasWinner] = useState(false);

  //  INITIALIZES NEW GAME //
  const resetHandler = () => {
    dispatchState({ type: 'RESET' });
    setHasWinner(false);
  };
  // HOLDS CURRENT SCORE AND ADDS TO TOTAL SCORE OF ACTIVE PLAYER //
  const holdHandler = () => {
    const activePlayer = state.activePlayer - 1;

    /////// A PLAYER WINS IF PLAYER'S TOTAL SCORE IS >= X (set winning number)
    if (state.score[activePlayer] + state.total[activePlayer] >= 100) {
      setHasWinner(true);
    }

    dispatchState({
      type: 'HOLD',
      active: state.activePlayer,
      value: state.score[state.activePlayer - 1],
    });
  };
  // ROLLS DICE //
  const rollHandler = () => {
    const newDice = Math.trunc(Math.random() * 6) + 1;
    console.log(state.activePlayer);
    dispatchState({
      active: state.activePlayer,
      value: { dice: newDice, score: newDice },
    });
  };

  return (
    <main className={classes.container}>
      {/* BACKDROP RENDERS IF A PLAYER WINS */}
      {hasWinner && <div className={classes.backdrop} />}
      <button onClick={resetHandler} className={classes.reset}>
        new game
      </button>
      <img className={classes.dice} src={die[state.dice]} alt='dice' />

      <PlayerCard
        active={state.activePlayer == 1 ? true : false}
        score={state.score[0]}
        total={state.total[0]}
        player={1}
      />
      <PlayerCard
        active={state.activePlayer == 2 ? true : false}
        score={state.score[1]}
        total={state.total[1]}
        player={2}
      />
      <div className={classes.buttons}>
        <button onClick={rollHandler} className={classes.roll}>
          🎲 Roll dice
        </button>
        <button onClick={holdHandler} className={classes.hold}>
          📥 Hold
        </button>
      </div>
    </main>
  );
}

export default App;
