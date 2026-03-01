"use client";

import { useMutation, useQuery } from '@tanstack/react-query';
import { apiLogin, apiLogout, apiMe, apiRegister } from '../auth';

export function useAuthMe() {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: apiMe,
  });
}

export function useAuthLogin() {
  return useMutation({
    mutationFn: apiLogin,
  });
}

export function useAuthRegister() {
  return useMutation({
    mutationFn: apiRegister,
  });
}

export function useAuthLogout() {
  return useMutation({
    mutationFn: apiLogout,
  });
}
