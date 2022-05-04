import "./App.css";
import "./components/NeckModule";
import NeckModule from "./components/NeckModule";

function App() {

  return (
    <div className="App">
      <header>
        <h1>Container</h1>
      </header>
      <div id="chords-container" className="main">
        <NeckModule prefs={{
          myContainer: 'chords-container',
          rootNote: 'D',
          showInitialChord: true,
          showFretRangeSelectors: true,
          showResetLink: true,
          showNeckStyleSelectors: false,
          showScaleOnlyLink: true,
          showFretRange: true,
          chordInterval: 1,
          showIntervalColorKey: true,
          neckStyleClass: 'long-neck-default',
          totalFrets: 21,
          topfret: 17,
          lowfret:5,
          currentScaleType: 'majorScales',
          currentScale: ["D", "E", "F#", "G", "A", "B", "C#"]
          }} />
      </div>
    </div>
  );
}

export default App;
