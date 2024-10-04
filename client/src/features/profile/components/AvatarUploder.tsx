import React from "react";
import { useSelector } from "react-redux";
import { useGetFileQuery } from "../../../store/api/files.api";
import { selectUserInfo } from "../../../store/slices/auth.slice";
import Avatar from "../../ui/Avatar";
import Button from "../../ui/Button";
import { FiX } from "react-icons/fi";
import { useAvatarUploader } from "../useAvatarUploader";

type AvatarUploaderProps = {
  onDeleteAvatar: () => void;
};

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ onDeleteAvatar }) => {
  const {
    tempFile,
    fileInputRef,
    handleFileSelection,
    handleFileUpload,
    cancelFileSelection,
  } = useAvatarUploader();
  const { avatarFileId, id } = useSelector(selectUserInfo);
  const { data } = useGetFileQuery(avatarFileId!, { skip: !avatarFileId });

  if (!avatarFileId || !data) {
    return (
      <>
        {!tempFile ? (
          <>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="border-2 w-full border-gray-400 border-dashed p-4"
            >
              Add Image
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelection}
              className="hidden"
            />
          </>
        ) : (
          <div className="border-dashed border-2 border-gray-400 p-4 flex flex-col items-center">
            <div className="h-14 w-14">
              <img src={URL.createObjectURL(tempFile)} alt="Selected Avatar" />
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={cancelFileSelection} bgColor="red">
                Cancel
              </Button>
              <Button onClick={handleFileUpload} bgColor="indigo">
                Upload
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }

  const { url } = data;

  return (
    <div className="relative border-dashed border-2 border-gray-400 p-4">
      <Avatar isClickable={false} userId={id!} imgUrl={url} />
      <Button
        noPad
        bgColor="red"
        onClick={onDeleteAvatar}
        className="px-1 py-1 flex gap-1 items-center absolute top-4 right-4"
      >
        <FiX />
        <span className="text-sm">Delete</span>
      </Button>
    </div>
  );
};

export default AvatarUploader;
