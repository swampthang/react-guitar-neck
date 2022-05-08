import AllNotes from './AllNotes';

function NeckContainer({notes, showingNumbers}) {

  let stringTogglers = [1,2,3,4,5,6]

  const toggleStringView = (e)=> {
    let stringNum = e.target.getAttribute('string');
    let stringNotes = Array.from(e.target.parentNode.parentNode.parentNode.querySelectorAll(`.note.in-scale[string="${stringNum}"]`))
    if( stringNotes[0].classList.contains('string-hide') ) {
      for (let n = 0; n < stringNotes.length; n++ ) {
        stringNotes[n].classList.remove('string-hide')
      }
    } else {
      for (let n = 0; n < stringNotes.length; n++ ) {
        stringNotes[n].classList.add('string-hide')
      }
    }
  }

  return (
    <div className="nm-container">
      <div className="neckmodule">
        { notes && <AllNotes notes={notes} showNumbers={{showingNumbers}} />}
        <div className="string-togglers controller">
          <ul>
            { stringTogglers.map(num => (
              <li onClick={(e) => toggleStringView(e)} key={'str-'+num} string={num}></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NeckContainer;