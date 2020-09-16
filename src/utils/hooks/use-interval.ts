import { useEffect, useRef } from 'react'

export const useInterval = <T extends CallableFunction>(callback: T, delay: number) => {
	const savedCallback = useRef<T>()

	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		const handler = (...args) => savedCallback.current(...args)

		if (delay !== null) {
			const id = setInterval(handler, delay)
			return () => clearInterval(id)
		}
	}, [delay])
}
