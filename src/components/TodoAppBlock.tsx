import '../TodoAppStyles/TodoAppBlock.css'
type TodoAppBlockProps = {
  task: {
    text: string;
    id: number;
    check: boolean;
  };
  remove: ()=>void;
  onCheckClicked: ()=>void;
}

const TodoAppBlock = (props: TodoAppBlockProps) => {
  const {task, remove, onCheckClicked} = props;
    return (
        <div className="TodoAppBox">
          <input 
            type="checkbox" 
            className='TodoAppBoxCheck'
            checked={task.check}
            onChange={onCheckClicked}
          />
          <span>{task.text}</span>
          <button 
            className='TodoAppBoxDelete'
            onClick={remove}  
          >×</button>
        </div>
    );
};

export default TodoAppBlock;