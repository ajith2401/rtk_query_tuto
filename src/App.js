import { useEffect, useRef } from 'react';
import './App.css';
// import Counter from './features/counter/Counter';
import AddPost from './features/post/AddPost';
import Posts from './features/post/Post';
import { fetchUser, getUserStatus, getUserFailure, getUserSuccess } from './features/post/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const users = useSelector(getUserSuccess)
  const status = useSelector(getUserStatus)
  const error  = useSelector(getUserFailure)
  const dispatch = useDispatch()
  const effectRan = useRef(false)

  useEffect(()=>{
    if(!effectRan.current){
      if(status==='idle'){
        dispatch(fetchUser())
      } 
        return ()=> effectRan.current = false;
    } 
  },[status,dispatch])
  
  return (
    <main className="App inset-0 min-w-92 justify-center items-center content-center">
  {/*  <Counter/> */}
    <AddPost/>
    <Posts/>
    </main>
  );
}

export default App;
