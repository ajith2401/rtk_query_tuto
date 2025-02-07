import './App.css';
// import Counter from './features/counter/Counter';
import AddPost from './features/post/AddPost';
import Posts from './features/post/Post';

function App() {
  return (
    <main className="App inset-0 min-w-92 justify-center items-center content-center">
  {/*  <Counter/> */}
    <AddPost/>
    <Posts/>
    </main>
  );
}

export default App;
