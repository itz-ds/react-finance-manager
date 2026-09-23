
function ModalForm(props) {

  return (
    <div>
      {props.modal&&(
        <>
        <div className="modal-backdrop fade show d-block"></div>
        <div className={`modal fade ${props.modal ? 'show d-block' : 'd-none'}`}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Modal title</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={()=>props.setModal(false)}></button>
                </div>
                <div className="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={()=>props.setModal(false)}>Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
        </>
      )}
    </div>
  )
}

export default ModalForm
