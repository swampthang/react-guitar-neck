import React from "react";

function KeySelectors(props) {

  const resetOtherSelectors = (el) => {
    const wrapper = el.parentNode
    wrapper.querySelectorAll('select').forEach(sel => {
      if( el.id !== sel.id ) {
        sel.value = "choose";
      }
    });
  }

  const allScales = [
  {
    id: 1,
    title: 'Major',
    selector: 'scaleSelector',
    keyType: 'majorScales',
    values: ['C','G','D','A','E','B','F#','C#','F','Bb','Eb','Ab','Db','Gb','Cb']
  },
  {
    id: 2,
    title: 'Natural Minor',
    selector: 'minorScaleSelector',
    keyType: 'naturalMinorScales',
    values: ['A','E','B','F#','C#','G#','D#','A#','F','C','G','D','Bb','Eb','Ab','Db']
  },
  {
    id: 3,
    title: 'Harmonic Minor',
    selector: 'harMinorScaleSelector',
    keyType: 'harmonicMinorScales',
    values: ['A','E','B','F#','C#','G#','D#','A#','F','C','G','D','Bb','Eb','Ab','Db']
  }
]

  return (
    <div className="changeKey controller info-display-div">
      <h4>Select key:</h4>
      { allScales.map( scale => (
        <select 
          defaultValue={scale.keyType === props.currentScaleType ? props.rootNote : "choose"} 
          onChange={ (e) => { 
            props.setKey({note: e.target.value, type: scale.keyType}) 
            resetOtherSelectors(e.target)
          }} 
          key={scale.id} id={scale.selector}>
          <option value="choose">{scale.title}...</option>
          { scale.values.map( (val, i) => (
            <option key={i} value={val}>{`${val} ${scale.title}`}</option>
          ))}
        </select>
      ))}
    </div>
  )
}

export default KeySelectors;