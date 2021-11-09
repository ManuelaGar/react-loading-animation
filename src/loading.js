import { useState, useEffect } from 'react'
import FadeIn from 'react-fade-in'
import Lottie from 'react-lottie-player'
import 'bootstrap/dist/css/bootstrap.css'

import * as legoData from './lego_loading.json'
import * as doneData from './done_loading.json'

function Loading() {
  const [isDone, setIsDone] = useState(undefined)
  const [isLoading, setIsLoading] = useState(undefined)

  useEffect(() => {
    let isActive = true

    if (isActive) {
      setTimeout(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
          .then((response) => response.json())
          .then((json) => {
            setIsLoading(true)
            setTimeout(() => {
              setIsDone(true)
            }, 1000)
          })
      }, 1200)
    }

    return function cleanup() {
      isActive = false
    }
  }, [])

  return (
    <div>
      {!isDone ? (
        <FadeIn>
          <div class="d-flex justify-content-center align-items-center">
            <h1>fetching pizza</h1>
            {!isLoading ? (
              <Lottie
                loop
                animationData={legoData.default}
                play
                style={{ width: 120, height: 120 }}
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid slice',
                }}
              />
            ) : (
              <Lottie
                loop={false}
                animationData={doneData.default}
                play
                style={{ width: 120, height: 120 }}
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid slice',
                }}
              />
            )}
          </div>
        </FadeIn>
      ) : (
        <h1>hello world</h1>
      )}
    </div>
  )
}

export default Loading
