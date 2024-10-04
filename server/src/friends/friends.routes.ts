import { Router } from "express";
import {
  sendFriendRequestHandler,
  respondToRequestHandler,
  getSignedInFriendsHandler,
  removeFriendFromSignedInUserHandler,
} from "./friends.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validationMiddleware } from "../middleware/zod.middleware";
import {
  sendFriendRequestModel,
  respondToFriendRequestModel,
  friendsListQueryModel,
} from "./friends.models";

export const friendsRouter = Router();

friendsRouter
  // Route to send a friend request
  .post(
    "/",
    authMiddleware,
    validationMiddleware(sendFriendRequestModel),
    sendFriendRequestHandler
  )
  // Route to respond to a friend request
  .patch(
    "/:friendUserId",
    authMiddleware,
    validationMiddleware(respondToFriendRequestModel),
    respondToRequestHandler
  )
  // Route to get paginated friends list for signed-in user
  .get(
    "/",
    authMiddleware,
    validationMiddleware(friendsListQueryModel),
    getSignedInFriendsHandler
  )
  // Route to remove a friend
  .delete(
    "/:friendUserId",
    authMiddleware,
    removeFriendFromSignedInUserHandler
  );
