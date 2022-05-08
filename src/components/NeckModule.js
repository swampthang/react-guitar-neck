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
  const [showingNumbers, setShowingNumbers] = useState(false)
  const [notes, setNotes] = useState(data ? data.notes : [])
  const [showScaleOnly, setShowScaleOnly] = useState(false)
  const [notesPerChord, setNotesPerChord] = useState(3)
  const [currentScaleType, setCurrentScaleType] = useState(prefs.currentScaleType ? prefs.currentScaleType : 'majorScales')
  const [currentScale, setCurrentScale] = useState(prefs.currentScale ? prefs.currentScale : ["C", "D", "E", "F", "G", "A", "B"])

  const initCurrentScale = function() {
    
    switch( currentScaleType ) {
      case 'majorScales':
      case 'Major Scales':
        setCurrentScale(currentScale => (data.majorScales[rootNote]))
      break;
      case 'naturalMinorScales':
      case 'Natural Minor':
        setCurrentScale(currentScale => (data.naturalMinorScales[rootNote]))
      break;
      case 'harmonicMinorScales':
      case 'Harmonic Minor':
        setCurrentScale(currentScale => (data.harmonicMinorScales[rootNote]))
      break;
    }
  }
  
  const handleKeyChange = ({note, type}) => {

    setRootNote(note)
    setCurrentScaleType(type)
    setScaleNeedsUpdate(true)
  }

  const handleScaleChange = () => {
    initCurrentScale()
    setScaleNeedsUpdate(false)
    setKeyHasChanged(true)
  }

  const autoInitChord = () => {
    doChord()
  }

  const doChord = (obj) => {

    // if obj contains a notesPerChord val, use it instead of the notesPerChord state val
    let nps = notesPerChord;
    // ints is the array of notes to be picked from the currentScale
    let chordRoot = currentScaleType.replace('Scales',''),
        ints = data.chordsData[chordRoot][0].ints;
    if( obj ) {
      chordRoot = obj.chordRoot === undefined ? currentScaleType.replace('Scales','') : obj.chordRoot;
      ints = obj.ints === undefined ? data.chordsData[chordRoot][0].ints : obj.ints;
      nps = obj.notesPerChord ? obj.notesPerChord : nps;
    }

    if( data.notes ) {
      // first mute em all
      document.querySelectorAll('.note.in-scale').forEach((note) => {
        let stringHide = note.classList.contains('string-hide');
        note.className = note.className.split('in-scale')[0] + 'note';
        note.classList.add('muted');
        note.classList.add('in-scale');
        if( stringHide ) note.classList.add('string-hide')
      })
      let int = 1;
      for( let i = 0; i < nps; i++ ) {

        let notename = currentScale[ints[i]];

        // eslint-disable-next-line no-loop-func
        document.querySelectorAll(`.note[notename="${notename}"`).forEach(note => {
          let fret = parseInt(note.getAttribute('fret'));
          note.classList.add(`int-${int}`)
          note.querySelector('span.int-num').textContent = int;
          if( fret >= lowFret && fret <= topFret ) {
            note.classList.remove('muted')
          }

        })
        int += 2;
      }
    }
    if(showingNumbers) showInts()
  }

  const showInts = ()=> {
    const noteDivs = document.querySelectorAll(`#${data.myContainer} .note`)
    noteDivs.forEach((note) => {
      note.classList.add('hide-names')
      note.classList.remove('hide-ints')
    })
    setShowingNumbers(true)
  }

  const hideInts = ()=> {
    const noteDivs = document.querySelectorAll(`#${data.myContainer} .note`)
    noteDivs.forEach((note) => {
      note.classList.add('hide-ints')
      note.classList.remove('hide-names')
    })
    setShowingNumbers(false)
  }

  const doNotes = () => {

    const notesArr = document.querySelectorAll('.note');

    if( data.notes ) {
      if( notesArr.length ) {
        notesArr.forEach( note => {
          let stringHide = note.classList.contains('string-hide');
          note.className = note.className.split('note')[0] + 'note';
          let notename = note.getAttribute('notename');
          if( includes(currentScale, notename) ) {
            if( currentScale.indexOf(notename)+1 === 2 ) {
              note.className += ` in-scale int-9`;
            } else {
              note.className += ` in-scale int-${currentScale.indexOf(notename)+1}`;
            }
            let fret = note.getAttribute('fret');
            if( parseInt(fret) < lowFret || parseInt(fret) > topFret ) {
              note.className += ' muted';
            }
          } else {
            note.className += ' hidden';
          }
          if( stringHide ) note.classList.add('string-hide')
        })
      } else {
        setNotes(() => {
          return data.notes.map( (note) => {
            note.className = note.className.split('note')[0] + 'note';
            if( includes(currentScale, note.notename) ) {
              if( currentScale.indexOf(note.notename)+1 === 2 ) {
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
  }

  const setNoteDisplay = ()=> {
    if( showScaleOnly ) {
      doNotes()
    } else {
      doChord()
    }
  }

  const processChange = () => {
    // setNoteDisplay();
    doNotes();
    if( !showScaleOnly ) {
      autoInitChord()
    }
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
    setNoteDisplay()
    setFretNumsChanged(false)
  }

  const handleTopFretChange = (val) => {
    setTopFret(val)
    setFretNumsChanged(true)
    if(data && !scaleNeedsUpdate && !keyHasChanged && showingNumbers) showInts()
  }

  const handleLowFretChange = (val) => {
    setLowFret(val)
    setFretNumsChanged(true)
    if(data && !scaleNeedsUpdate && !keyHasChanged && showingNumbers) showInts()
  }

  const toggleNoteNumbers = () => {
    let noteDivs = document.querySelectorAll(`#${data.myContainer} .note`)
    if( noteDivs[0].querySelector('.int-num').offsetWidth === 0 ) {
      // hide the note-names and show the int-numbers
      showInts()
    } else {
      hideInts()
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
        </div>
        <KeySelectors rootNote={rootNote} currentScaleType={currentScaleType}  setKey={handleKeyChange}  />
        <div className="scale-only-link-wrapper">
          <button onClick={ () => {
            setShowScaleOnly(!showScaleOnly)
            if( showScaleOnly ) {
              doChord()
            } else {
              doNotes({showScale: !showScaleOnly});
            }
          }} className="refresh-scale-link">Toggle show entire scale</button>
        </div>
        <TopControls 
        lowFret={lowFret} 
        topFret={topFret} 
        lowFretChange={handleLowFretChange} 
        topFretChange={handleTopFretChange} 
        currentScale={currentScale} 
        toggleNoteNumbers={toggleNoteNumbers}
        setNotesPerChord={setNotesPerChord}
        doChord={doChord}
        />
        { isPending && <div className='loading-msg'><h2>Loading notes...</h2></div> }
        { 
          data && 
          <NeckContainer 
            notes={notes.length ? notes : data.notes} 
            currentScale={currentScale} 
            lowFret={lowFret} 
            topFret={topFret}
            showingNumbers={showingNumbers}
          /> 
        }
        <div className="controller info-display-div chord-instructions">Use buttons below to display corresponding chord notes</div>
        { data && <ChordButtons currentScale={currentScale} currentScaleType={currentScaleType} notesPerChord={notesPerChord} chordsData={data.chordsData} doChord={doChord} />}
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