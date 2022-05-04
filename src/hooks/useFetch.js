// name of hook needs to start with the word use so react knows it's a hook
import { useState, useEffect } from "react"

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  // remember: useRef to wrap an object/array argument
  // that is a useEffect dependency to avoid a runaway continuous loop!

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      setIsPending(true)

      try {
        const res = await fetch(url, {signal: controller.signal })
        if( !res.ok ) {
          throw new Error(res.statusText) // throwing error forces the catch block to run
        }
        const json = await res.json()
        setIsPending(false)
        setData(json)
        setError(null)
      } catch(err) {
        if( err.name === "AbortError") {
          console.log('the fetch was aborted',err.message);
        } else {
          setIsPending(false)
        setError('Could not fetch the data')
        }
      }
      // console.log(json)
    }

    fetchData()

    // cleanup
    // return () => {
    //   controller.abort();
    // }
  }, [url])

  return { data, isPending, error } // same as {data: data}
}
