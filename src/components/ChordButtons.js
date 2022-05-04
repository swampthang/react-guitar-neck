function ChordButtons() {

  return (
    <div className="controller info-display-div chord-buttons">
      <p className="reset-link controller"><button>Reset guitar neck to initially loaded view</button></p>
      <div className="button-wrapper controller">
        <div className="chordButton active" scaleint="1">C</div>
        <div className="chordButton" scaleint="2">D<sup>m</sup></div>
        <div className="chordButton" scaleint="3">E<sup>m</sup></div>
        <div className="chordButton" scaleint="4">F</div>
        <div className="chordButton" scaleint="5">G</div>
        <div className="chordButton" scaleint="6">A<sup>m</sup></div>
        <div className="chordButton" scaleint="7">B<sup>dim</sup></div>
      </div>
    </div>
  )
}

export default ChordButtons;