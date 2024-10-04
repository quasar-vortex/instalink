import { useState, useRef, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useUploadFileMutation } from "../../store/api/files.api";
import { updateUserInfo } from "../../store/slices/auth.slice";
import { useUpdateAvatarMutation } from "../../store/api/users.api";

export const useAvatarUploader = () => {
  const [tempFile, setTempFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const [uploadFile] = useUploadFileMutation();
  const [updateAvatar] = useUpdateAvatarMutation();

  const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setTempFile(selectedFile);
    } else {
      toast.error("Please select a JPEG, PNG, or WEBP image.");
    }
  };

  const handleFileUpload = async () => {
    if (!tempFile) {
      toast.error("No file selected.");
      return;
    }

    try {
      const { id: avatarFileId } = await uploadFile({
        file: tempFile,
      }).unwrap();
      const userInfo = await updateAvatar({ avatarFileId }).unwrap();
      dispatch(updateUserInfo(userInfo));
      setTempFile(null);
    } catch (error) {
      toast.error("Failed to upload avatar.");
      console.error(error);
    }
  };

  const cancelFileSelection = () => {
    setTempFile(null);
  };

  return {
    tempFile,
    fileInputRef,
    handleFileSelection,
    handleFileUpload,
    cancelFileSelection,
  };
};
