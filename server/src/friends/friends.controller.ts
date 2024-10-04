import { RequestHandler } from "express";
import { db } from "../config/db";
import HttpError from "../config/http_error";

export const sendFriendRequestHandler: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const senderId = req.user!.id;
    const receiverId = req.body.receiverId as string;
    const payload = { senderId, receiverId };
    const request = await db.friend.create({
      data: {
        ...payload,
      },
    });
    return res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};

export const respondToRequestHandler: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const signedInId = req.user!.id;
    const friendUserId = req.params.friendUserId as string;
    const isActive = req.body.isActive;
    const foundFriend = await db.friend.findMany({
      where: {
        OR: [
          { senderId: signedInId, receiverId: friendUserId },
          { senderId: friendUserId, receiverId: signedInId },
        ],
      },
    });
    if (foundFriend.length === 0)
      throw new HttpError({
        status: "NOT_FOUND",
        message: "Friend not found.",
      });
    const friend = foundFriend[0];
    if (friend.dateResponded === null) {
      const updatedFriend = await db.friend.update({
        where: {
          senderId_receiverId: {
            senderId: friend.senderId,
            receiverId: friend.receiverId,
          },
        },
        data: {
          isActive,
        },
      });
      return res.status(200).json(updatedFriend);
    }
    throw new HttpError({
      status: "BAD_REQUEST",
      message: "Friend request already responded to. Must delete friend.",
    });
  } catch (error) {
    next(error);
  }
};

export const getSignedInFriendsHandler: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const signedInId = req.user!.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || "";
    const skip = (page - 1) * limit;

    const friends = await db.friend.findMany({
      where: {
        AND: [
          {
            OR: [{ senderId: signedInId }, { receiverId: signedInId }],
          },
          search
            ? {
                OR: [
                  {
                    sender: {
                      userName: { contains: search.toLowerCase() },
                    },
                  },
                  {
                    receiver: {
                      userName: { contains: search.toLowerCase() },
                    },
                  },
                ],
              }
            : {},
        ],
      },
      skip,
      take: limit,
      include: {
        sender: {
          include: { avatarFile: true },
        },
        receiver: {
          include: { avatarFile: true },
        },
      },
    });

    const totalFriends = await db.friend.count({
      where: {
        AND: [
          {
            OR: [{ senderId: signedInId }, { receiverId: signedInId }],
          },
          search
            ? {
                OR: [
                  {
                    sender: {
                      userName: { contains: search.toLowerCase() },
                    },
                  },
                  {
                    receiver: {
                      userName: { contains: search.toLowerCase() },
                    },
                  },
                ],
              }
            : {},
        ],
      },
    });

    const friendList = friends.map((friend) => {
      const isSender = friend.senderId === signedInId;
      //@ts-ignore receiver and sender user included in query
      const friendUser = isSender ? friend.receiver : friend.sender;
      return {
        id: friendUser.id,
        userName: friendUser.userName,
        avatarUrl: friendUser.avatarFile?.url,
        bio: friendUser.bio,
      };
    });

    return res.status(200).json({
      data: friendList,
      meta: {
        totalRecords: totalFriends,
        currentPage: page,
        totalPages: Math.ceil(totalFriends / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const removeFriendFromSignedInUserHandler: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const signedInId = req.user!.id;
    const friendUserId = req.params.friendUserId as string;

    const foundFriend = await db.friend.findMany({
      where: {
        OR: [
          { senderId: signedInId, receiverId: friendUserId },
          { senderId: friendUserId, receiverId: signedInId },
        ],
      },
    });

    if (foundFriend.length === 0) {
      throw new HttpError({
        status: "NOT_FOUND",
        message: "Friend not found.",
      });
    }

    const friend = foundFriend[0];

    await db.friend.delete({
      where: {
        senderId_receiverId: {
          senderId: friend.senderId,
          receiverId: friend.receiverId,
        },
      },
    });

    return res.status(200).json({ message: "Friend deleted" });
  } catch (error) {
    next(error);
  }
};
