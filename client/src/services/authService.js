import { requestFactory } from "./requester";

const endpoint = {
  login: "/api/user/login",
  register: "/api/user/register",
  logout: "/api/user/logout",
};

export const authServiceFactory = (token) => {
  const request = requestFactory(token);
  return {
    login: ({ email, password }) => request.post(endpoint.login, { email, password }),
    register: ({ email, username , tel , password, repass }) => 
      request.post(endpoint.register, { email, username , tel , password, repass }),
    logout: () => request.get(endpoint.logout),
  };
};
