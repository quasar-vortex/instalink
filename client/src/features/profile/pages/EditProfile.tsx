// pages/EditProfile.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DashPanel from "../../dash/components/DashPanel";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import FormWithProvider from "../../ui/form/Form";
import AvatarUploader from "../components/AvatarUploder";
import DeleteAvatarModal from "../components/DeleteAvatarModal";
import {
  selectUserInfo,
  updateAvatarId,
  updateUserInfo,
} from "../../../store/slices/auth.slice";
import { useDeleteFileMutation } from "../../../store/api/files.api";
import { useUpdateMeMutation } from "../../../store/api/users.api";
import updateUserSchema, { updateUserFields } from "../models/update-user";
import { FormField, UpdateUserRequest } from "../../../types";
import { FieldValues } from "react-hook-form";

const EditProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const { avatarFileId, userName, bio } = useSelector(selectUserInfo);
  const [deleteFile] = useDeleteFileMutation();
  const [updateUser] = useUpdateMeMutation();

  const toggleModal = () => setModalOpen((prev) => !prev);

  const handleAvatarDeletion = async () => {
    if (!avatarFileId) return;

    try {
      const { message } = await deleteFile(avatarFileId).unwrap();
      dispatch(updateAvatarId({ id: null }));
      toast.success(message);
      setModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete avatar.");
      console.error(error);
    }
  };

  const handleProfileUpdate = async (data: UpdateUserRequest) => {
    try {
      const { userName, password, newPassword, bio } = data;
      const updatedUser = await updateUser({
        userName,
        password,
        newPassword,
        bio,
        avatarFileId: avatarFileId === null ? undefined : avatarFileId,
      }).unwrap();
      dispatch(updateUserInfo(updatedUser));
      toast.success("Profile updated successfully.");
      navigate("/dash/profile");
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <DashPanel
      title="Edit Profile"
      headerActions={
        <Button
          noPad
          className="p-2 text-sm"
          onClick={() => navigate("/dash/profile")}
        >
          Back
        </Button>
      }
    >
      <h6 className="font-bold text-lg">Avatar:</h6>
      <AvatarUploader onDeleteAvatar={toggleModal} />
      <DeleteAvatarModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onDelete={handleAvatarDeletion}
      />
      <Card className="mt-4">
        <FormWithProvider
          defaultValues={{ userName, bio }}
          fields={updateUserFields as FormField<FieldValues>[]}
          onSubmit={
            handleProfileUpdate as unknown as (data: FieldValues) => void
          }
          schema={updateUserSchema}
        />
      </Card>
    </DashPanel>
  );
};

export default EditProfile;
