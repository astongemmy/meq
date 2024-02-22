import { NextAuthOptions, RequestInternal, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { megaFetch } from '@/utils/api';

type Authorize = {
  req: Pick<RequestInternal, 'body' | 'query' | 'headers' | 'method'>;
  credentials: Record<string, string> | undefined;
};

interface AuthResponse {
  message: string,
  success: boolean,
  data: {
    profile: Record<string, any>;
    token: {
      refresh_token: string;
      access_token: string;
    };
  }
};

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('HELLO ', credentials);
      // if (response && response.data?.value === true) {
      //   // user exists return true passing control to the next callback
      //   return true;
      // } else {
      //   // second axios call which creates a new user in our database
      //   const data = {
      //     firstName: profile.given_name,
      //     lastName: profile.family_name,
      //     email: profile.email,
      //     profileUrl: profile.picture,
      //   };
      //   const response = await axios.post(
      //     "http://localhost:9000/v1/auth/signup",
      //     data
      //   );
        
      //   // retruns true thereby passing control to the next callback
      //   return true;
      // }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account) token.accessToken = account.access_token
      return token;
    },
    async session({ session, token, user }) {
      return { ...session, accessToken: token.accessToken };
    }
  },
  providers: [
    Google({
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      clientId: process.env.GOOGLE_CLIENT_ID ?? ''
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'johndoe@email.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: Authorize['credentials'], req: Authorize['req']): Promise<User | null> {
        const { success, data }: AuthResponse = await megaFetch({
          url: `${process.env.API_URL}/user/auth/`,
          method: 'POST',
          body: JSON.stringify({
            password: credentials?.password,
            email: credentials?.email
          })
        }) as AuthResponse;

        if (!success || !data || (typeof data === 'object' && !Object.keys(data).length)) return null;

        return {
          refresh_token: data.token.refresh_token,
          access_token: data.token.access_token,
          email: data.profile.email,
          name: data.profile.name,
          id: data.profile.id,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth',
  }
};