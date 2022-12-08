import sha1 from 'sha1'
import { BigInteger } from 'jsbn'

export async function createVerifier(
  username: string,
  password: string,
  salt: Buffer
) {
  const N = new BigInteger(
    '894B645E89E1535BBDAD5B8B290650530801B18EBFBF5E8FAB3C82872A3E9BB7',
    16
  )
  const g = new BigInteger('7', 16)

  const h1 = Buffer.from(sha1(username.toUpperCase() + ':' + password), 'hex')

  const h2 = Buffer.from(sha1(Buffer.concat([salt, h1]))).reverse()

  const h2bigint = new BigInteger(h2.toString('hex'), 16)

  const verifierBigint = g.modPow(h2bigint, N)

  let verifier = Buffer.from(verifierBigint.toByteArray()).reverse()

  verifier = verifier.slice(0, 32)
  if (verifier.length != 32) {
    verifier = Buffer.concat([verifier], 32)
  }

  return verifier
}
