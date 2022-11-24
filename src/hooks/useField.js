import { useState } from "react"

export const useField = (initial) => {
    const [value, setValue] = useState(initial)
  
    const onChange = (event) => {
      event.preventDefault();
      if (event.target.value === ""){
        setValue("")
      }else{
        setValue(parseInt(event.target.value))
      }
    }

    const change = (aux) => {
        setValue(aux)
    }
  
    return {
      value,
      onChange,
      change
    }
  }