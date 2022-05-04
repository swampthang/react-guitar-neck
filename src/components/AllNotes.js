export default function AllNotes({notes}) {
  
  console.log(notes)
  return (
    <>
    { notes && notes.map( (note, i) => (
      <div key={i+1} id={note.id} notename={note.notename} className={note.className} snd={note.snd}><span className="note-name">{note.notename}</span><span className="int-num">{note.intNum}</span></div>
    ))}
    </>
  )
}
