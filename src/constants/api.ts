export const API_CONFIG = {
	API_BASE_URL: 'https://api-service.incognito.org',
	REQUEST_TIMEOUT: 20000,
	REQUEST_HEADER: { 'Content-Type': 'application/json' },
}

export const REACT_REQUEST_CONFIG = {
	defaultConfig: {
		queries: {
			refetchInterval: 5 * 60 * 1000,
			refetchOnWindowFocus: false,
			useErrorBoundary: true,
			suspense: false,
		},
		shared: {
			suspense: false,
		},
	},
}
