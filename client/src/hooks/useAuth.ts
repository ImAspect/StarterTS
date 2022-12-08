import { useContext, useEffect } from 'react'
import AuthAPI from '../api/AuthAPI'
import uidContext from '../contexts/uidContext'
import { useDispatch } from 'react-redux'
import { JsonResponse } from '../types/misc'

const useAuth = (): Promise<JsonResponse> => {
  const dispatch = useDispatch()

  return new Promise((resolve, reject) => {
    const uid = useContext(uidContext)

    useEffect(() => {
      const abortController = new AbortController()

      const checkToken = async () => {
        const res = await AuthAPI.checkToken({ signal: abortController.signal })
        
        resolve(res)

        if (res.status === 200) {
          dispatch({
            type: 'user/loginUser',
            payload: res.data,
          })
        }
      }

      checkToken()
      return () => abortController.abort()
    }, [uid])
  })
}

export { useAuth }
