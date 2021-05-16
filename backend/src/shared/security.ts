import { hashSync, genSaltSync } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { appConfig } from 'src/app.config';

const salt = genSaltSync(10);
const { PRIVATE_KEY } = appConfig;

export function encrypt(value: string): string {
  return hashSync(value, salt);
}

export function decrypt(value: string): string {
  return hashSync(value, salt);
}

export function generateToken(payload: any): string {
  return sign(payload, PRIVATE_KEY, { expiresIn: '15m' });
}

export function validateToken(jwt: string): boolean {
  try {
    verify(jwt, PRIVATE_KEY);
    return true;
  } catch (error) {
    return false;
  }
}
