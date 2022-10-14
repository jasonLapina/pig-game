import classes from './App.module.scss';

const PlayerCard = (props) => {
  return (
    <div className={`${classes.player} ${classes[`player--${props.player}`]}`}>
      <div>
        Player: {props.player}
        <span>0</span>
      </div>
      <div className={classes.current}>
        current: <span>0</span>
      </div>
    </div>
  );
};

function App() {
  return (
    <main className={classes.container}>
      <button className={classes.reset}>new game</button>
      <PlayerCard player={1} />
      <PlayerCard player={2} />
      <div className={classes.buttons}>
        <button className={classes.roll}>🎲 Roll dice</button>
        <button className={classes.hold}>📥 Hold</button>
      </div>
    </main>
  );
}

export default App;
