function ChordButtons({currentScale, currentScaleType, notesPerChord, chordsData, doChord}) {

  const obj = chordsData[currentScaleType.replace('Scales','')]
  let labelIndex = notesPerChord - 3;

  const resetActive = (e) => {
    let p = e.target.parentNode;
    e.target.classList.add('active')
    p.querySelectorAll('.chordButton.active').forEach(btn => {
      if( e.target.getAttribute('scaleint') !== btn.getAttribute('scaleint') ) {
        btn.classList.remove('active')
      }
    })
  }

  return (
    <div className="controller info-display-div chord-buttons">
      <p className="reset-link controller"><button>Reset guitar neck to initially loaded view</button></p>
      <div className="button-wrapper controller">
        {
          obj.map((data, i) => (
            <div
              onClick={(e) => {
                doChord({chordRoot: currentScale[i], ints: data.ints})
                resetActive(e)
              }}
              key={i}
              className={`chordButton${i===0?' active':''}`}
              scaleint={i+1}>{currentScale[i]}<sup>{data.labels[labelIndex]}</sup>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ChordButtons;