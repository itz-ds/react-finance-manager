import {XAxis, YAxis, Tooltip, Bar, BarChart, ResponsiveContainer, LabelList, Cell} from 'recharts';

function ExpenseChart(props) {
  const barColors = [
    '#b52700',
    '#ffc31f',
    '#009be2',
    '#018282',
    '#c5e6e4', 
    '#44d0f4',
    '#696f80',
    '#f44100',
    '#c7c8ca',
    '#111d43',
  ];
  
  
  
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <p className="h4 mb-3">Expense Breakdown</p>
        {
          props.data.length === 0 ? (
            <p className="text-center fw-bold text-muted">No expense recorded yet.</p>
          ) : (
            <div>
              <ResponsiveContainer width='100%' height={300} >
                <BarChart data={props.data} margin={{top:20}} >
                    <XAxis dataKey='category' fill='black' />
                    <YAxis />
                    <Tooltip 
                      content={(props) => {
                        
                        
                        // const objectData = props.payload.length === 0 ? null : props.payload[0].payload;
                        const objectData = props.payload[0]?.payload; // If the thing before '?.' exists, continue; otherwise give me 'undefined' instead of throwing an 'error'.
                        return objectData
                          ? (
                            <div className='bg-white border rounded ms-2 shadow-sm d-flex flex-column px-3 py-1'>
                              <span className='fw-bold'>{objectData.category}</span>
                              <span className=''>₹{objectData.amount}</span>
                              <span className="text-muted">{objectData.percentage}%</span>
                            </div>
                          ) 
                          : null 
                      }}
                    />
                    <Bar dataKey='amount' barSize={36}  >
                      {props.data.map((item, index) => {
                        return (
                          <Cell key={index} fill={barColors[index % 10]}/>
                        )
                      })}
                      <LabelList dataKey='percentage' position='top' formatter={(value)=>`${value}%`} fill='black'/>
                    </Bar>
                </BarChart>
  
              </ResponsiveContainer>
              <p className='h6 ms-5 my-3 text-muted fw-bold'>Total Expenses: <span className='text-dark fw-normal'>₹{props.totalExpenses}</span></p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ExpenseChart
