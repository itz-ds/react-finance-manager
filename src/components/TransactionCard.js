
function TransactionCard(props) {

    const sign = props.type === 'income' ? '+' : '-';
    const fontColor = props.type === 'income' ? 'text-success' : 'text-danger';
    const formattedDate = props.date && new Date(props.date).toLocaleDateString('en-IN',{
        day: '2-digit',
        month: 'short',
        year: 'numeric' 
    });
    


  return (
    <div className="row">
        <div className="col-8 d-flex flex-column">
            <span>{props.description}</span>
            <span className="fw-light text-secondary">{props.category} {props.date && <span>| {formattedDate} </span> }</span>
        </div>
        <div className="col-2">
            <span className={fontColor}>{sign} ₹{props.amount}</span>
        </div>
        <div className="col-1">
            <button className="btn btn-sm btn-outline-secondary" style={{width:'75px'}} onClick={() => {props.onEditTransaction(props.transaction); props.setModal(true);}}>Edit</button>
        </div>
        <div className="col-1">
            <button className="btn btn-sm btn-outline-danger" style={{width:'75px'}} onClick={() => props.onDeleteTransaction(props.transactionId)}>Delete</button>
        </div>
      
    </div>
  )
}

export default TransactionCard