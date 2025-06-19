// services/googleAuthService.ts
import { OAuth2Client } from 'google-auth-library'
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const verifyGoogleIdToken = async (id_token: string) => {
  const ticket = await client.verifyIdToken({
    idToken: id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  })

  const payload = ticket.getPayload()

  if (!payload?.email || !payload?.sub) {
    throw new Error('Token de Google inválido.')
  }

  return {
    email: payload.email,
    name: payload.name,
    avatar: payload.picture,
    googleId: payload.sub,
  }
}
