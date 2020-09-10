import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import styled from 'styled-components'
import LoadingGif from 'assets/loading.gif'

const LoadingContainer = styled.div`
	display: flex;
	flex-wrap: 'wrap';
	width: '100%';
	height: 100vh;
`

export const Loading: React.FC = () => {
	const [progress, setProgress] = React.useState(0)
	const [buffer, setBuffer] = React.useState(10)

	const progressRef = React.useRef(() => {})
	React.useEffect(() => {
		progressRef.current = () => {
			if (progress > 100) {
				setProgress(0)
				setBuffer(10)
			} else {
				const diff = Math.random() * 10
				const diff2 = Math.random() * 10
				setProgress(progress + diff)
				setBuffer(progress + diff + diff2)
			}
		}
	})

	React.useEffect(() => {
		const timer = setInterval(() => {
			progressRef.current()
		}, 500)

		return () => {
			clearInterval(timer)
		}
	}, [])

	return (
		<LoadingContainer>
			<LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
		</LoadingContainer>
	)
}
