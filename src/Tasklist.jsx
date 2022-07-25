import { XCircle, Pencil, Password } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';

export function Tasklist(props) {
  const [tasks, setTasks] = useState([]);
  const inputTask = useRef(null);

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
      setTasks([...tasks, { taskName: inputTask.current.value }]);
      // setTasks([...tasks, { taskName: inputTask.current.value, isChecked: true }]);
      inputTask.current.value = '';
    } else {
      alert('Essa já existe');
      console.log(tasks);
    }
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
          <li key={task.taskName} className="font-semibold flex justify-between">
            <div className="flex items-center justify-center gap-2">
              <input className="accent-violet-600 h-4 w-4 rounded-lg" type="checkbox" defaultChecked={task.isChecked} />
              <span className={`text-lg ${task.isChecked === true ? 'line-through opacity-70' : ''}`}>{task.taskName}</span>
            </div>
            <div className="flex gap-2">
              <button title="Editar tarefa">
                <Pencil size={25} className="hover:text-blue-500 transition-colors" weight="duotone" />
              </button>
              <button title="Excluir tarefa">
                <XCircle size={25} className="hover:text-red-800 transition-colors" weight="duotone" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
