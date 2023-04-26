import cookie from 'cookie';
import { PUBLIC_ENVIRONMENT } from '$env/static/public';

export const load = async ({ request, setHeaders }: any) => {
	const cookies = cookie.parse(request.headers.get('cookie') || '');
	const API_URL =
		PUBLIC_ENVIRONMENT === 'production' ? 'api.azidoazide.xyz' : 'dev-api.azidoazide.xyz';

	let userData: any = null;

	if (cookies.token) {
		userData = await fetch(`https://${API_URL}/api/users/@me?token=${cookies.token}`).then(
			async (res) => {
				const status = res.status;

				if (status === 200) {
					const data: any = await res.json();

					if (data.error) return null;
					else return data;
				} else return null;
			}
		);
	}

	return {
		user: userData,
		token: cookies.token
	};
};
