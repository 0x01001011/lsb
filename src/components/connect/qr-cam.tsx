import React from 'react'
import styled from 'styled-components'
import QrReader from 'react-qr-scanner'
import { LinearProgress } from '@material-ui/core'
import { isEmpty } from 'lodash'

const QRCamContainer = styled.div`
	width: 100%;

	display: flex;
	justify-content: center;
	align-self: center;
	position: relative;
`

const ProgressBarContainer = styled.div<{ show: boolean }>`
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	padding: 85px 20px;
	z-index: 1;
	transition: all 0.3s;
	background: ${({ show }) => (show ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.0)')};
	opacity: ${({ show }) => (show ? 1 : 0)};
`
export const QRCam: React.FC<{ onHaveValue: (qrcode: string) => void }> = ({ onHaveValue }) => {
	const [progress, setProgress] = React.useState(0)
	const [show, setShow] = React.useState(false)
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
		}, 1000)

		return () => {
			clearInterval(timer)
		}
	}, [])

	const handleOnQRCode = (value: string) => {
		if (value && !isEmpty(value)) {
			setShow(true)
			onHaveValue(value)
		}
	}
	return (
		<QRCamContainer>
			<QrReader
				style={{
					transform: 'scaleX(-1)',
					maxWidth: 320,
				}}
				delay={800}
				onError={console.error}
				onScan={handleOnQRCode}
			/>
			<ProgressBarContainer show={show}>
				<LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
			</ProgressBarContainer>
		</QRCamContainer>
	)
}
