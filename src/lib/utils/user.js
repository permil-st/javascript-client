const TOKEN = 'token';

export const saveUser = (token) => localStorage.setItem(TOKEN, token);

export const isAuthUser = () => !!localStorage.getItem(TOKEN);

export const getUserToken = () => localStorage.getItem(TOKEN);

export const deleteUser = () => localStorage.removeItem(TOKEN);
