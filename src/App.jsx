import { Tasklist } from './Tasklist';

function App() {
  return (
    <main className="min-h-screen min-w-full bg-gray-200 flex flex-col items-center pt-32">
      <div className="bg-white p-8 rounded-xl shadow-xl">
        <Tasklist title={'pao'} />
      </div>
    </main>
  );
}

export default App;
