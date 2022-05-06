function TopControls({currentScale, lowFret, lowFretChange, topFret, topFretChange, toggleNoteNumbers, setNotesPerChord, doChord}) {

  const handleNotesPerChordBtnClick = (e) => {
    e.target.parentNode.querySelectorAll('notes-per-chord-button').forEach((btn) => {
      btn.classList.remove('active')
    })
    e.target.classList.add('active')
    setNotesPerChord(e.target.getAttribute('ctype'))
    // doChord()
  }
  return (
    <div className="top-wrapper info-display-div">
  <div className="top-left">
    <div id="keyNotes">
      <ul>
        <li>Scale notes: </li>
        { currentScale && currentScale.map((note, i) => (
          <li key={i+1}>{note}</li>
        ))}
      </ul>
    </div>
    <div className="controller" id="info">Fret range: {lowFret} to {topFret}</div>
      <div className="controller" id="fretselectors">Set lowest fret: 
        <select id="lowfret" defaultValue={lowFret} onChange={(e) => { lowFretChange(e.target.value) }}>
          <>        
            {Array.apply(0, Array(21)).map(function (x, i) {
              return <option key={i} value={i}>{i}</option>
            })}
          </>
        </select>
        <span>Set highest fret: </span>
        <select id="highfret" defaultValue={topFret} onChange={(e) => { topFretChange(e.target.value) }}>
          <>        
            {Array.apply(1, Array(22)).map(function (x, i) {
              return <option key={i} value={i}>{i}</option>
            })}
          </>
        </select>
      </div>
      <button className="note-display-toggler" onClick={toggleNoteNumbers}>Toggle Letters/Numbers</button>
  </div>
  <div className="top-right">
    <div className="controller notes-per-chord-wrapper">
      <div className="notesPerChord">
        <button onClick={handleNotesPerChordBtnClick} className="notes-per-chord-button active" ctype="3">basic chords</button>
      </div>
      <div className="notesPerChord">
        <button className="notes-per-chord-button" ctype="4">7th chords</button>
      </div>
      <div className="notesPerChord">
        <button className="notes-per-chord-button" ctype="5">9th chords</button>
      </div>
    </div>
    <div id="color_key">
      <div id="color-key-wrapper">
        <h4>Color Key for chord note intervals</h4>
        <ul id="color-key">
          <li>
            <div className="int-1">1</div>
          </li>
          <li>
            <div className="int-3">3</div>
          </li>
          <li>
            <div className="int-5">5</div>
          </li>
          <li>
            <div className="int-7">7</div>
          </li>
          <li>
            <div className="int-9">9</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
  )
}

export default TopControls;