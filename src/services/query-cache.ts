import { QueryCache } from 'react-query'

export const queryCache = new QueryCache({
	defaultConfig: {
		queries: {
			refetchInterval: 5 * 60 * 1000,
			refetchOnWindowFocus: false,
			useErrorBoundary: true,
			suspense: false,
			refetchOnMount: false,
			refetchIntervalInBackground: true,
		},
	},
})
