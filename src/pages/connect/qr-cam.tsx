import React from 'react'
import styled from 'styled-components'
import QrReader from 'react-qr-scanner'
import ScanArea from 'assets/scan-bg.jpg'

const QRCamContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-self: center;
	position: relative;
`

export const QRCam: React.FC<{ onHaveValue: (qrcode: string) => void }> = ({ onHaveValue }) => {
	return (
		<QRCamContainer>
			<QrReader
				style={{
					transform: 'scaleX(-1)',
					maxWidth: 320,
				}}
				delay={800}
				onError={console.error}
				onScan={(value: string) => value && onHaveValue(value)}
			/>
		</QRCamContainer>
	)
}
