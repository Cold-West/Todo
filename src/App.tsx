import { use, useEffect, useState } from 'react'
import TodoAppBlock from './components/TodoAppBlock'
import TodoAppHeader from './components/TodoAppHeader'
import './TodoAppStyles/App.css'

function App() {

  const [todoBlocks, setTodoBlocks] = useState([
    {text:"11111", id:1, check:false},
    {text:"22222", id:2, check:true},
    {text:"33333", id:3, check:false}
  ])

  const [filters, setFilters] = useState('all')

  const [visibleBlocks, setVisibleBlocks] = useState(todoBlocks)

  useEffect(()=>{
    if (filters == 'all'){
      setVisibleBlocks(todoBlocks)
    }
    else if (filters == 'completed'){
      setVisibleBlocks(todoBlocks.filter(t => t.check !== true))
    }
    else if (filters == 'active'){
      setVisibleBlocks(todoBlocks.filter(t => t.check == true))
    }
  },[todoBlocks, filters])

  const TodoNewBlock =(text:string)=>{
    setTodoBlocks([...todoBlocks, {
      text,
      id: Date.now(),
      check: false
    }])
  }

  const TodoDelete =(id: number)=>{
    setTodoBlocks(prev => prev.filter(t => t.id !== id))
  }

  const checkClicked = (id: number) => {
    setTodoBlocks(prev => prev.map(task => {
      if (task.id === id) {
        return {
          ...task,
          check: !task.check,
        }
      }

      return task;
    }))
  }

  const toggleChecks = () => {
    setTodoBlocks(prev => prev.map(task => ({ ...task, check: true })));
  }

  return (
    <>
      <h1>Todos</h1>
      <div className='TodoApp'>
        
        <TodoAppHeader
          check={toggleChecks}
          create={TodoNewBlock}
        />

        {visibleBlocks.map(task=>
          <TodoAppBlock
            remove={()=>TodoDelete(task.id)}
            onCheckClicked={() => checkClicked(task.id)}
            task={task}
            key={task.id}
          />
        )}

        <footer>
          <span className='footerCounter'>Tasks Left: 
            {todoBlocks.filter(t => t.check !== true).length}
          </span>
          <nav className='footerFilter'>
              <button 
                className='footerNavButton' 
                onClick={()=>setFilters('all')}
              >All</button>
              <button 
                className='footerNavButton' 
                onClick={()=>setFilters('completed')}
              >Completed</button>
              <button 
                className='footerNavButton' 
                onClick={()=>setFilters('active')}
              >active</button>
          </nav>
        </footer>
        
      </div>
    </>
  )
}

export default App
