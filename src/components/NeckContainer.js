import AllNotes from './AllNotes';

function NeckContainer({notes}) {

  return (
    <div className="nm-container">
      <div className="neckmodule">
        { notes && <AllNotes notes={notes} />}
        <div className="string-togglers controller">
          <ul>
            <li string="1"></li>
            <li string="2"></li>
            <li string="3"></li>
            <li string="4"></li>
            <li string="5"></li>
            <li string="6"></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NeckContainer;