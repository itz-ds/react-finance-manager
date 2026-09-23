import { useState, useEffect } from "react";

function TransactionForm(props) {

  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const transaction = {
      id: props.editingTransaction
        ? props.editingTransaction.id
        : Date.now(),
      description: description,
      type: type,
      category: category,
      amount: Number(amount),
      date: date
    };
    
    if(props.editingTransaction){
      props.onUpdateTransaction(transaction)
      props.setEditingTransaction(null);
    } else {
      props.onAddTransaction(transaction);
    }

    setDescription('');
    setType('');
    setCategory('');
    setAmount('');
    setDate('');
    
  };

  useEffect(()=>{
    if(props.editingTransaction) {
      setDescription(props.editingTransaction.description || '');
      setType(props.editingTransaction.type);
      setCategory(props.editingTransaction.category);
      setAmount(props.editingTransaction.amount);
      // props.editingTransaction.date ? setDate(props.editingTransaction.date) : setDate('');
      setDate(props.editingTransaction.date || ''); // Use the transaction's date if it exists; otherwise use an empty string.
    } else {
      setDescription('');
      setType('');
      setCategory('');
      setAmount('');
      setDate('');
    }
  }, [props.editingTransaction])

  return (
    <>
      <div>
        {props.modal&&(
          <>
            <div className="modal-backdrop fade show d-block"></div>
            <div className={`modal fade ${props.modal ? 'show d-block' : 'd-none'}`}>
              <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title">{props.editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</h5>
                      <button type="button" className="btn-close" aria-label="Close" onClick={()=>props.setModal(false)}></button>
                  </div>
                  <div className="modal-body">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="type" className="mb-2">Type</label>
                          <div className="form-check">
                            <input type="radio" name="type" id="typeExpense" value='expense' className="form-check-input" checked={type === 'expense'} onChange={(e)=>setType(e.target.value)} />
                            <label htmlFor="typeExpense" className="form-check-label">Expense</label>
                          </div>
                          <div className="form-check">
                            <input type="radio" name="type" id="typeIncome" className="form-check-input" value='income' checked={type === 'income'} onChange={(e)=>setType(e.target.value)} />
                            <label htmlFor="typeIncome" className="form-check-label">Income</label>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">Description</label>
                          <input type="text" name="description" id="description" className="form-control" value={description} onChange={(e)=>setDescription(e.target.value)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="category" className="form-label">Category</label>
                          <select name="category" id="category" className="form-select" value={category} onChange={(e)=>setCategory(e.target.value)}>
                            <option value="">Select category</option>
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Salary">Salary</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="amount" className="form-label">Amount</label>
                          <input type="number" name="amount" id="amount" className="form-control" value={amount} onChange={(e)=>setAmount(e.target.value)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="date" className="form-label">Date</label>
                          <input type="date" name="date" id="date" className="form-control" value={date} onChange={(e)=>setDate(e.target.value)} />
                        </div>
                        <div className="d-flex justify-content-end">
                          <button type="submit" className="btn btn-secondary" style={{width:'150px'}}>{props.editingTransaction ? 'Update' : 'Add'}</button>
                          <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            style={{width:'150px'}}
                            onClick={()=>{
                              props.setEditingTransaction(null);
                              props.setModal(false);
                            }}
                          >
                            {props.editingTransaction ? 'Cancel' : 'Close'}
                          </button>
                          
                        </div>

                      </form>
                  </div>
                  <div className="modal-footer">
                      
                  </div>
                  </div>
              </div>
            </div>
          </>
        )}
      </div>
      {/* <div className="d-flex justify-content-center my-3">
        <div className="card shadow-sm col-6 p-3">
          <div className="card-body">
            <p className="h4">{props.editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="type" className="mb-2">Type</label>
                <div className="form-check">
                  <input type="radio" name="type" id="typeExpense" value='expense' className="form-check-input" checked={type === 'expense'} onChange={(e)=>setType(e.target.value)} />
                  <label htmlFor="typeExpense" className="form-check-label">Expense</label>
                </div>
                <div className="form-check">
                  <input type="radio" name="type" id="typeIncome" className="form-check-input" value='income' checked={type === 'income'} onChange={(e)=>setType(e.target.value)} />
                  <label htmlFor="typeIncome" className="form-check-label">Income</label>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" name="description" id="description" className="form-control" value={description} onChange={(e)=>setDescription(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select name="category" id="category" className="form-select" value={category} onChange={(e)=>setCategory(e.target.value)}>
                  <option value="">Select category</option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Salary">Salary</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input type="number" name="amount" id="amount" className="form-control" value={amount} onChange={(e)=>setAmount(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">Date</label>
                <input type="date" name="date" id="date" className="form-control" value={date} onChange={(e)=>setDate(e.target.value)} />
              </div>
              <div className="d-flex justify-content-end">

                <button type="submit" className="btn btn-secondary" style={{width:'150px'}}>{props.editingTransaction ? 'Update' : 'Add'}</button>
                {props.editingTransaction && (
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    style={{width:'150px'}}
                    onClick={()=>props.setEditingTransaction(null)}
                  >
                    Cancel
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default TransactionForm
