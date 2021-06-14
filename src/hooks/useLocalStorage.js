import {useState, useEffect} from "react";

const PREFIX = '98chat-'

function useLocalStorage(key, initValue) {
    const prefixKey = PREFIX + key
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixKey)
        if (jsonValue !== null) return JSON.parse(jsonValue)
        if (typeof initValue === 'function') {
            return initValue()
        }else{
            return initValue
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixKey, JSON.stringify(value))
    }, [prefixKey, value])

    return [value, setValue]
}

export default useLocalStorage