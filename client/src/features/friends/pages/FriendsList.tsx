import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DashPanel from "../../dash/components/DashPanel";
import Button from "../../ui/Button";
import SearchBar from "../../ui/SearchBar";
import FriendItem from "../components/FriendItem";
import { useGetFriendsQuery } from "../../../store/api/friends.api";

const FriendsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetFriendsQuery({
    search: searchTerm,
    page,
    limit: 10, // Default limit as per the API
  });

  const handleAddFriend = () => {
    navigate("/friends/add");
  };

  const handleNextPage = () => {
    if (data && page < data.meta.totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  // Reset page to 1 when search term changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  return (
    <DashPanel
      title="Friends"
      headerActions={
        <Button
          className="px-2 py-2 flex gap-1 items-center"
          onClick={handleAddFriend}
        >
          <FiPlus />
          <span className="text-sm">Add</span>
        </Button>
      }
    >
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      {isLoading && <p>Loading friends...</p>}
      {error && <p>Error loading friends.</p>}
      {data && data.data.length === 0 && <p>No friends found.</p>}
      {data && (
        <div className="mt-4">
          {data.data.map((friend) => (
            <FriendItem key={friend.id} friend={friend} />
          ))}

          {data.meta.totalPages !== 1 && (
            <div className="flex justify-between mt-4">
              <Button onClick={handlePreviousPage} disabled={page === 1}>
                Previous
              </Button>
              <span>
                Page {page} of {data.meta.totalPages}
              </span>
              <Button
                onClick={handleNextPage}
                disabled={page === data.meta.totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </DashPanel>
  );
};

export default FriendsList;
