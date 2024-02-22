import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
	// interface Session extends DefaultSession {
	// }

	interface User extends DefaultUser {
		refresh_token: string;
		access_token: string;
	}
};