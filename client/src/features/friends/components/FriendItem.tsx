import React from "react";

import Avatar from "../../ui/Avatar";
import { Friend } from "../../../types";

interface FriendItemProps {
  friend: Friend;
}

const FriendItem: React.FC<FriendItemProps> = ({ friend }) => {
  return (
    <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
      <Avatar userId={friend.id} imgUrl={friend.avatarUrl} />
      <div className="ml-3">
        <p className="font-medium">{friend.userName}</p>
        {friend.bio && <p className="text-sm text-gray-500">{friend.bio}</p>}
      </div>
    </div>
  );
};

export default FriendItem;
