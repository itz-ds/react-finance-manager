import { useState } from "react"
import TransactionCard from "./TransactionCard"

function TransactionList(props) {
    
    const sortedTransactions = [...props.transactions];
    sortedTransactions.sort((a,b) => {
        if(a.date && b.date){
            return new Date(b.date) - new Date(a.date);
        } else if (a.date && !b.date){
            return -1;
        } else if (!a.date && b.date){
            return 1;
        } else {
            return 0;
        }
    });

    const [filter, setFilter]=useState('all');
    let filteredTransactions = sortedTransactions;

    if(filter === 'expense'){
        filteredTransactions = sortedTransactions.filter(
            transaction => (transaction.type === 'expense')
        );
    };

    if(filter === 'income'){
        filteredTransactions = sortedTransactions.filter(
            transaction => (transaction.type === 'income')
        );
    };

    const [search, setSearch] = useState('');

    if(search){
        filteredTransactions = filteredTransactions.filter(
            transaction => 
                transaction.description
                    .toLowerCase()
                    .includes(search.toLowerCase())
        );
    };

    

  return (
    <div>
        <div className="card shadow-sm">
            <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                    <p className=  "h4">Recent transactions</p>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        style={{width:'150px'}}
                        onClick={()=>props.setModal(true)}
                    >
                        Add Transaction
                    </button>
                </div>
                <div className="d-flex">
                    <select
                        name="filter"
                        id="filter"
                        className="form-select-sm"
                        style={{width:'150px'}}
                        value={filter}
                        onChange={(e)=> setFilter(e.target.value)}
                    >
                        <option value='all'>All</option>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        value={search}
                        onChange={(e)=> setSearch(e.target.value)}
                        className="form-control ms-auto"
                        style={{width:'150px'}}
                    />
                </div>
                {filteredTransactions.length === 0 ? (
                    <p className="text-muted text-center mt-3">No transaction found.</p>
                ) : (
                    <ul className="list-group mt-3">
                        {
                            filteredTransactions.map( transaction => 
                                (
                                    <li key={transaction.id}  className="list-group-item">
                                        <TransactionCard
                                            description={transaction.description}
                                            category={transaction.category}
                                            amount={transaction.amount}
                                            type={transaction.type}
                                            date={transaction.date}
                                            onDeleteTransaction={props.onDeleteTransaction}
                                            transactionId={transaction.id}
                                            onEditTransaction={props.onEditTransaction}
                                            transaction={transaction}
                                            modal={props.modal}
                                            setModal={props.setModal}
                                        />
                                    </li>
                                )
                            )
                        }
                    </ul>
                )}
            </div>
        </div>
    </div>
  )
}

export default TransactionList
