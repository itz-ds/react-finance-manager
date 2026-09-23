import Navbar from "./components/Navbar";
import SummaryCard from "./components/SummaryCard";
import TransactionForm from "./components/TransactionForm";
import { useEffect, useState } from "react";
import TransactionList from "./components/TransactionList";
import ExpenseChart from "./components/ExpenseChart";
import ModalForm from "./components/ModalForm";


function App() {

  const [transactions, setTransactions] = useState(()=>{
    const savedTransactions = localStorage.getItem('transactions');

    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const addTransaction = (transaction) => {
    setTransactions([
      ...transactions,
      transaction
    ])
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter(transaction => transaction.id !== id)
    );
  };

  const income = transactions.filter(transaction => transaction.type === 'income').reduce((total, transaction) => total+transaction.amount,0);
  const expense = transactions.filter(transaction => transaction.type === 'expense').reduce((total, transaction) => total+transaction.amount,0);
  const balance = income - expense;

  const [editingTransaction, setEditingTransaction] = useState(null);

  const editTransaction = (transaction) => {
    setEditingTransaction(transaction)
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions(
      transactions.map(transaction => {
        if(transaction.id === updatedTransaction.id){
          return {
            ...transaction,
            description: updatedTransaction.description,
            type: updatedTransaction.type,
            amount: updatedTransaction.amount,
            category: updatedTransaction.category,
            date: updatedTransaction.date,
          };
        }

        return transaction;
      })
    );
  };

  useEffect(()=>{
    localStorage.setItem(
      'transactions',
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const expenseByCategory = transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((result, transaction)=>{
          result[transaction.category] = (result[transaction.category] || 0) + transaction.amount; // it create or update the properties of object.
          return result; // It is accumulator which is need to each iteration of reduce.
      },{}); // reduce initial value is empty object.

  console.log('expenses as object', expenseByCategory);
  

  const expenseByCategoryAsArray = transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((result, transaction)=>{
          result[transaction.category] = (result[transaction.category] || 0) + transaction.amount; // it create or update the properties of object.
          return result; // It is accumulator which is need to each iteration of reduce.
      },[]); // reduce initial value is empty object.

  console.log('expenses as array' ,expenseByCategoryAsArray);
  

  const entries = Object.entries(expenseByCategory); // it convert object's properties into an indivitual array. like, { food: 1000, shopping: 700 } into [['food',1700], ['shopping',700]]
      
  const chartArray = entries.map(([category, amount])=>{ // Destructuring the array. like mentioning array[0], array[1] with name, so we can use the name in return.
   
    return {
      category: category,
      amount: amount,
      percentage: (amount/expense*100).toFixed(2)
    }
  });

  const [modal, setModal] = useState(false);

  console.log('modal state from app:', modal);
  
  

  return (
    <div className="container">
      <div className="mb-3">
        <Navbar/>
      </div>
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <SummaryCard
            title='Balance'
            amount={balance}
          />
        </div>
        <div className="col-md-4">
          <SummaryCard
            title='Income'
            amount={income}
          />
        </div>
        <div className="col-md-4">
          <SummaryCard
            title='Expenses'
            amount={expense}
          />
        </div>
      </div>
      {/* <div className="mb-3">
        <ModalForm
          modal={modal}
          setModal={setModal}
        />
      </div> */}
      <div className="mb-3"> 
        <TransactionForm 
          onAddTransaction={addTransaction}
          editingTransaction={editingTransaction}
          setEditingTransaction={setEditingTransaction}
          onUpdateTransaction={updateTransaction}
          modal={modal}
          setModal={setModal}
        />
      </div>
      <div className="mb-3">
        <TransactionList
          transactions={transactions}
          onDeleteTransaction={deleteTransaction}
          onEditTransaction={editTransaction}
          modal={modal}
          setModal={setModal}
        />
      </div>
      <div className="mb-3">
        <ExpenseChart
          data={chartArray}
          totalExpenses = {expense}
        />
      </div>
    </div>
  );
}

export default App;
