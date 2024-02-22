type MegaFetchResponse = {
	data: null | Array<any> | Record<string, any>;
	success: boolean;
	message: string;
};

type MegaFetchPayload = {
	method?: 'DELETE' | 'PATCH' | 'POST' | 'PUT' | 'GET';
	body?: BodyInit | null | undefined;
	url: string | URL | Request;
	shouldStringify?: boolean;
	removeToken?: boolean;
	contentType?: string;
};

export const megaFetch = async ({
	contentType = 'application/json',
	removeToken = false,
	body = undefined,
	method = 'GET',
	url
}: MegaFetchPayload) => {
	const config: RequestInit | undefined = {
		headers: {
			'X-MEQ-AUTH': !removeToken ? 'token' : '',
			'Content-Type': contentType,
		},
		redirect: 'follow',
		cache: 'no-cache',
		mode: 'cors',
		method
	};

	if (!['DELETE', 'GET'].includes(method)) {
		config.body = body;
	}

	try {
		const response = await fetch(url, config);
		const data: MegaFetchResponse = await response.json();
		if (!response.ok) console.error(data.message, response.status);
		return data;
	} catch (error: any) {
		if (error instanceof SyntaxError) {
      // JSON parsing error
      console.error('JSON parsing error:', error.message);
    } else if (error instanceof TypeError) {
      // Network error or CORS issue
      console.error('Network error:', error.message);
    } else if (error instanceof Error) {
      // Other types of errors
      console.error('Other error:', error.message);
		} else {
      // Catch-all for other types of errors
      console.error('Unknown error:', error);
    }

    return {
			message: error?.message ?? 'An error occurred',
			success: false,
			data: null
		};
	}
}