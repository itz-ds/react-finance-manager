function SummaryCard({title, amount}) {
  return (
    <div className='card px-4 shadow-sm'>
      <div className="card-body">
        <h6 className="text-muted">{title}</h6>
        <h3>₹{amount}</h3>
      </div>
    </div>
  )
}

export default SummaryCard
