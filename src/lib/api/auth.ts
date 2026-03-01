import { getAuthMe, postAuthLogin, postAuthLogout, postAuthRegister } from './sdk';

export async function apiRegister(payload: { name: string; email: string; password: string; password_confirmation: string }) {
  return postAuthRegister({ body: payload });
}

export async function apiLogin(payload: { email: string; password: string }) {
  return postAuthLogin({ body: payload });
}

export async function apiMe() {
  return getAuthMe();
}

export async function apiLogout() {
  return postAuthLogout();
}
