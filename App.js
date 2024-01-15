import './App.css';
import {useCallback, useEffect, useState, useRef} from 'react';


function App() {
  const [length,setLength]=useState(8);
  const [numberAllowed, setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");  
  const passworRef=useRef(null);
  const passwordGenerator=()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed){
      str+="0123456789";
    }
    for(let i=1;i<=length;i++){
    let char =Math.random()*str.length+1;
    char =Math.floor(char);
    pass +=str.charAt(char)
    }
    setPassword(pass)
  }
  useCallback(passwordGenerator,[length,numberAllowed,charAllowed,setPassword])
  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,setPassword])
  const copyToClipboard=useCallback(()=>{
    passworRef.current?.select();
    passworRef.current?.setSelectionRange(0, length);
    navigator.clipboard.writeText(password)},[password])
  return (
    <>
    <div className="mx-auto my-auto bg-orange-200 h-full min-h-screen justify-center">
      <h1 class="">
        Password Generator!!
      </h1>
      <input className="bg-black px-4 py-1 text-white rounded-lg" value={password} aria-readonly ref={passworRef}/>
      <button className="bg-cyan-500 text-black text-xl p-1 rounded-lg" onClick={copyToClipboard}>Copy</button>
      {/* <input type='checkbox' value={numberAllowed}>numbers</input> */}
      <input type='range' min={8} max={20} value={length} onChange={(e)=>{setLength(e.target.value)}} ></input>
      <label>Length: {length}</label>
      <input type="checkbox" defaultChecked={charAllowed} onChange={()=>{setCharAllowed((prev)=>!prev)}} placeholder="Charallowed"></input>
      <label>Characters Allowed</label>
      
      <input type="checkbox" defaultChecked={numberAllowed} onChange={()=>{setNumberAllowed((prev)=>!prev)}}></input>

      <label>Numbers Allowed</label>
    </div>
    </>
  );
}

export default App;
