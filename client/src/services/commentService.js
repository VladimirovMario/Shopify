import { requestFactory } from "./requester";

const endpoints = {
  allComments: "/api/comments/",
  createComment: "/api/comments/",
};

const request = requestFactory();

export const getCommentsById = async (gameId) => {
  return await request.get(endpoints.allComments + gameId);
};


export const commentServiceFactory = (token) => {
  const authorizedRequest = requestFactory(token);

  const createComment = async (gameId, commentsData) => { 
    return await authorizedRequest.post(endpoints.createComment + gameId, commentsData);
  };

  return {
    createComment,
  };
};
