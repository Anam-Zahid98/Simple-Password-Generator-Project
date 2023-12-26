import { useCallback, useEffect, useState, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllowed,setNum] = useState(false)
  const [charAllowed, setChar] = useState(false)
  const [password,setPassword] = useState("")

  const passwordRef = useRef(null)

  const passGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "~!@#$%^&*()-_+={[}]<;>:/"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char)
    }
      setPassword(pass)
  }, [length,numAllowed,charAllowed,setPassword])

  const copytoClipboard= useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,50)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passGenerator()
  } , [length,numAllowed, charAllowed,setPassword])

  return (
    <>
    <div className='w-full bg-violet-400 max-w-md mx-auto text-gray-900 my-8 px-4 rounded-lg'>
    <h1 className='text-center text-white my-3 font-bold'>Password Generator using 'useState, useCallback, useEffect, useRef' React-Hooks </h1>
    <div  className='flex rounded-lg overflow-hidden shadow mb-4'>
      <input
       type="text" 
       value={password}
       placeholder='password'
       className='outline-none w-full py-1 px-3'
       readOnly
       ref={passwordRef}
       />
       <button 
       onClick={copytoClipboard}
       className='bg-orange-500 hover:bg-orange-300 focus:bg-orange-600 text-white px-3 py-0.5 shrink-0'>copy</button>
    </div>
    <div className='flex gap-x-3 text-sm'>
      <div className='flex items-center gap-x-1'>
        <input type="range" 
        min={6}
        max={50}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label>Length : {length}</label>
      </div>
      <div className='flex gap-x-1 items-center'>
      <input 
      type="checkbox" 
      defaultChecked = {numAllowed}
      id="numberInput" 
      onChange={() => {setNum((prev) => !prev)}}
     />
     <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className='flex gap-x-1 items-center'>
      <input 
      type="checkbox" 
      defaultChecked = {charAllowed}
      id="characterInput" 
      onChange={() => {setChar((prev) => !prev)}}
     />
     <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
