import { XCircle, Pencil, Password, MaskHappy, Smiley, SmileyNervous } from 'phosphor-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';


const LOCAL_STORAGE_KEY = 'tasksLocalStorage';
export function Tasklist(props) {
  const [tasks, setTasks] = useState([]);
  const inputTask = useRef(null);
  const tasksLeft = tasks.filter(task => !task.isChecked).length

  useEffect(() => {
    const cachedTasks = localStorage.getItem(LOCAL_STORAGE_KEY)
    console.log(cachedTasks)
    if(cachedTasks){
      setTasks(JSON.parse(cachedTasks))
    }
  }, [])
  
  // Só roda apos mount
  const firstUpdate = useRef(true);
  useEffect(() => {
    if(firstUpdate.current){
      firstUpdate.current = false;
    }else{
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
    }
  }, [tasks])

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleInsertTask();
    }
  }

  function handleInsertTask() {
    if (!inputTask.current.value.trim()) {
      inputTask.current.value = '';
      return;
    }

    if (!tasks.find((task) => task.taskName.toLowerCase().trim() === inputTask.current.value.toLowerCase().trim())) {
      setTasks([...tasks, { id: tasks.length + 1, taskName: inputTask.current.value }]);
      inputTask.current.value = '';
    } else {
      alert('Essa já existe');
    }
    inputTask.current.focus()
  }

  function handleTaskComplete(e, taskID) {
    const newCompleteTasks = tasks.map((task) => {
      return task.id === taskID ? {...task, isChecked: e.target.checked} : task;
    })

    setTasks(newCompleteTasks);
  }
  
  function handleTaskDelete(e, taskID) {
    const newObjTasks = tasks.filter((task) => {
      return task.id !== taskID;
    })
    setTasks(newObjTasks);
  }

  function handleTaskEdit(e, taskID) {
    const taskWrapper = e.target.closest('li')
    const thisCheckbox = taskWrapper.querySelector('input[type="checkbox"]')
    const thisEditableArea = taskWrapper.querySelector('.editable__area')
    // const newObjTasks = tasks.filter((task) => {
    //   return task.id !== taskID;
    // })
    // setTasks(newObjTasks);
    if(thisCheckbox.checked === true){
      thisCheckbox.click()
    }

    thisEditableArea.querySelector('span').style.display = 'none';
    console.log(thisEditableArea.querySelector('span').style.display)
    thisEditableArea.querySelector('input').value = thisEditableArea.querySelector('span').innerText
    thisEditableArea.querySelector('input').style.display = 'inline'
  }


  return (
    <>
      <div className="text-center font-bold text-3xl mb-10 font-poppins">Lista de Tarefas</div>
      <div className="flex justify-center items-center">
        <input
          type="text"
          ref={inputTask}
          onKeyDown={handleKeyDown}
          placeholder="Dominar o mundo!"
          className="rounded-full bg-slate-100 border border-slate-300 outline-none px-5 py-2 focus:bg-slate-200"
        />
        <button
          onClick={handleInsertTask}
          className="ml-2 px-5 py-2 bg-violet-300 outline outline-2 outline-violet-900 text-violet-900 rounded-full font-bold hover:shadow-md hover:bg-violet-700 hover:text-white transition-colors"
        >
          Inserir
        </button>
      </div>
      <ul className="p-3 pt-7">
        {tasks.map((task) => (
          <li key={task.id} className="font-semibold flex justify-between group">
            <div className="flex items-center justify-center gap-2">
              <input
                className="accent-violet-600 h-4 w-4 rounded-lg" 
                type="checkbox" 
                defaultChecked={task.isChecked}
                onChange={(e) => handleTaskComplete(e, task.id)}
              />
              <div className="editable__area">
                <span className={`text-lg ${task.isChecked === true ? 'line-through opacity-70' : ''}`}>{task.taskName}</span>
                <input type="text" className="hidden border shadow-md border-violet-800 rounded-lg px-2 outline-none text-gray-700" />
              </div>
            </div>
            <div className="gap-2 hidden group-hover:flex">
              <button title="Editar tarefa" onClick={(e) => handleTaskEdit(e, task.id)}>
                <Pencil size={23} className="hover:text-blue-400 transition-colors" weight="duotone" />
              </button>
              <button title="Excluir tarefa" onClick={(e) => handleTaskDelete(e, task.id)}>
                <XCircle size={23} className="hover:text-red-800 transition-colors" weight="duotone" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {tasksLeft <= 1 ?
        (
          <p>Falta apenas <span className="font-bold">{tasks.filter(task => !task.isChecked).length}</span> tarefa <Smiley className="inline align-middle" weight="duotone" size={30}/></p>
          
        ):(
          <p>Faltam <span className="font-bold">{tasks.filter(task => !task.isChecked).length}</span> tarefas <SmileyNervous className="inline align-middle" weight="duotone" size={30}/></p>
        )
      }
    </>
  );
}
