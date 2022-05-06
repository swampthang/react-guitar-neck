function ChordButtons({currentScale, currentScaleType, notesPerChord, chordsData, doChord}) {

  const obj = chordsData[currentScaleType.replace('Scales','')]
  console.log(obj)
  let labelIndex = notesPerChord - 3;

  console.log(currentScale, currentScaleType, chordsData)
  return (
    <div className="controller info-display-div chord-buttons">
      <p className="reset-link controller"><button>Reset guitar neck to initially loaded view</button></p>
      <div className="button-wrapper controller">
        {
          obj.map((data, i) => (
            <div onClick={() => { doChord({chordRoot: currentScale[i], ints: data.ints})}} key={i} className="chordButton" scaleint={i+1}>{currentScale[i]}<sup>{data.labels[labelIndex]}</sup></div>
          ))
        }
      </div>
    </div>
  )
}

export default ChordButtons;