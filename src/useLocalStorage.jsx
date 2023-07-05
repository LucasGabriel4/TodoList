import React from 'react'

function useLocalStorage(key, initial) {
   const [state, setState] = React.useState(() => {
     const local = window.localStorage.getItem(key)
     return local ? JSON.parse(local) : initial
   })

   React.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(state))
   }, [key, state])



  return [state, setState]
}

export default useLocalStorage
