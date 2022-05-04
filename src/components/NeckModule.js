import '../assets/css/Common.css'
import '../assets/css/NeckModule.css'
import includes from 'lodash.includes'
import { useState, useEffect, useCallback } from 'react'
// import { useFetch } from '../hooks/useFetch'
import ChordButtons from './ChordButtons'
import KeySelectors from './KeySelectors'
import NeckContainer from './NeckContainer'
import TopControls from './TopControls'

function NeckModule({prefs}) {

  console.log(prefs)

  const url = 'http://localhost:3000/data'
  const [rootNote, setRootNote] = useState(prefs.rootNote ? prefs.rootNote : 'C')
  const [topFret, setTopFret] = useState(prefs.topFret ? prefs.topFret : 21)
  const [lowFret, setLowFret] = useState(prefs.lowFret ? prefs.lowFret : 0)
  const [fretNumsChanged, setFretNumsChanged] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [data, setData] = useState(null)
  const [keyHasChanged, setKeyHasChanged] = useState(false)
  const [scaleNeedsUpdate, setScaleNeedsUpdate] = useState(false)
  const [notes, setNotes] = useState(data ? data.notes : [])
  const [showScaleOnly, setShowScaleOnly] = useState(true)
  const [currentScaleType, setCurrentScaleType] = useState(prefs.currentScaleType ? prefs.currentScaleType : 'majorScales')
  const [currentScale, setCurrentScale] = useState(prefs.currentScale ? prefs.currentScale : ["C", "D", "E", "F", "G", "A", "B"])

  const initCurrentScale = function() {
    
    switch( currentScaleType ) {
      case 'Major':
      case 'Major Scales':
        setCurrentScale(currentScale => (data.majorScales[rootNote]))
      break;
      case 'naturalMinorScales':
      case 'Harmonic Minor':
        setCurrentScale(currentScale => (data.naturalMinorScales[rootNote]))
      break;
      case 'harmonicMinorScales':
      case 'Harmonic Minor':
        setCurrentScale(currentScale => (data.harmonicMinorScales[rootNote]))
      break;
    }
    
    console.log(currentScale); 
  }
  
  const handleKeychange = ({note, type}) => {

    setRootNote(note)
    setCurrentScaleType(type)
    setScaleNeedsUpdate(true)
  }

  const handleScaleChange = () => {
    initCurrentScale()
    setScaleNeedsUpdate(false)
    setKeyHasChanged(true)
  }

  const doNotes = () => {
    console.log(currentScale);
    console.log(rootNote)
    if( data.notes ) {
      setNotes(() => {
        return data.notes.map( (note) => {
          note.className = note.className.split('note')[0] + 'note';
          if( includes(currentScale, note.notename) ) {
            if( currentScale.indexOf(note.notename)+1 == 2 ) {
              note.className += ` in-scale int-9`;
            } else {
              note.className += ` in-scale int-${currentScale.indexOf(note.notename)+1}`;
            }
            if( parseInt(note.fret) < lowFret || parseInt(note.fret) > topFret ) {
              note.className += ' muted';
            }
          } else {
            note.className += ' hidden';
          }
          return note;
        })
      })
    }
  }

  const processChange = () => {
    doNotes();
  }

  if( scaleNeedsUpdate ) {
    setScaleNeedsUpdate(false)
    handleScaleChange()
  }

  if( keyHasChanged ) {
    setKeyHasChanged(false)
    processChange()
  }

  if( fretNumsChanged ) {
    doNotes()
    setFretNumsChanged(false)
  }

  const handleTopFretChange = (val) => {
    setTopFret(val)
    console.log(val)
    setFretNumsChanged(true)
  }

  const handleLowFretChange = (val) => {
    setLowFret(val)
    console.log(val)
    setFretNumsChanged(true)
  }

  const toggleNoteNumbers = () => {
    let noteDivs = document.querySelectorAll(`#${data.myContainer} .note`)
    if( noteDivs[0].querySelector('.int-num').offsetWidth === 0 ) {
      // hide the note-names and show the int-numbers
      noteDivs.forEach((note) => {
        note.classList.add('hide-names')
        note.classList.remove('hide-ints')
      })
    } else {
      noteDivs.forEach((note) => {
        note.classList.add('hide-ints')
        note.classList.remove('hide-names')
      })
    }
  }

  useEffect(() => {
    console.log('useEffect function ran')
    fetch(url)
      .then(res => res.json())
      .then( (json) => {
        const merged = {
          ...json,
          ...prefs
        }
        setData(merged)
        if( data ) {
          setNotes(data.notes)
        }
        setScaleNeedsUpdate(true);
      })
  }, [])

  return (
    <div className='long-neck-default'>
      { error && <h1 className='error-msg'>{ error }</h1> }
      { !error && 
      <div className="guitar-module-main-wrapper">
        <div className="controls-toggler">
          <span className="show-controls">Show Controls</span>
          <span className="hide-controls">Hide Controls</span>
        </div>
        <div className="container">
          { rootNote && <div className="main_title info-display-div">Key of {rootNote} {currentScaleType.replace('Scales','').replace('Minor', ' minor')}</div> }
          <h2 className="chord-name">{rootNote}</h2>
        </div>
        <KeySelectors rootNote={rootNote} currentScaleType={currentScaleType}  setKey={handleKeychange}  />
        <div className="scale-only-link-wrapper">
          <button className="refresh-scale-link">Show entire scale</button>
        </div>
        <TopControls lowFret={lowFret} topFret={topFret} lowFretChange={handleLowFretChange} topFretChange={handleTopFretChange} currentScale={currentScale} toggleNoteNumbers={toggleNoteNumbers} />
        { isPending && <div className='loading-msg'><h2>Loading notes...</h2></div> }
        { 
          data && 
          <NeckContainer 
            notes={notes.length ? notes : data.notes} 
            currentScale={currentScale} 
            lowFret={lowFret} 
            topFret={topFret} 
          /> 
        }
        <div className="controller info-display-div chord-instructions">Use buttons below to display corresponding chord notes</div>
        <ChordButtons />
        <div className="sound-trigger-options">
          <label>
            <span>Play sounds on mouse-over.</span>
            <input type="checkbox" />
          </label>
          </div>
      </div>}
    </div>
  )
}

export default NeckModule;