import { useNavigate } from "react-router-dom";
import DashPanel from "../../components/dash/DashPanel";
import Button from "../../components/ui/Button";
import { useSelector } from "react-redux";
import {
  selectUserInfo,
  updateAvatarId,
  updateUserInfo,
} from "../../store/slices/auth.slice";
import Avatar from "../../components/ui/Avatar";
import { FiX } from "react-icons/fi";
import Modal from "../../components/ui/Modal";
import { ChangeEvent, useRef, useState } from "react";
import {
  useDeleteFileMutation,
  useGetFileQuery,
  useUploadFileMutation,
} from "../../store/api/files.api";
import { toast } from "react-toastify";
import { FileResponse, FormField } from "../../types";
import { useDispatch } from "react-redux";
import FormWithProvider from "../../components/ui/form/Form";
import updateUserSchema, {
  updateUserFields,
  UpdateUserSchema,
} from "../../models/update-user";
import { FieldValues } from "react-hook-form";
import Card from "../../components/ui/Card";
import {
  useUpdateAvatarMutation,
  useUpdateMeMutation,
} from "../../store/api/users.api";

type AvatarUploaderProps = {
  deleteAvatarHandler: () => void;
};
const AvatarUploader = ({ deleteAvatarHandler }: AvatarUploaderProps) => {
  const [tempFile, setTempFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const { avatarFileId, id } = useSelector(selectUserInfo);

  const { data } = useGetFileQuery(avatarFileId!, {
    skip: !avatarFileId,
  });
  const [handleFileUpload] = useUploadFileMutation();
  const [handleAvatarUpdate] = useUpdateAvatarMutation();
  const handleAvatarUpload = async () => {
    if (!tempFile) {
      toast.error("No file");
      return;
    }

    try {
      const { id } = await handleFileUpload({
        file: tempFile,
      }).unwrap();
      const userInfo = await handleAvatarUpdate({ avatarFileId: id }).unwrap();
      dispatch(updateUserInfo(userInfo));
      setTempFile(null);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAvatarSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const allowedFiles = ["image/jpeg", "image/png", "image/webp"];

    const selected = e.target.files ? e.target.files[0] : null;

    if (selected) {
      if (!allowedFiles.includes(selected.type)) {
        toast.error("Must be a jpeg, png or webp file.");
        return;
      }
      setTempFile(selected);
      console.log("File selected", selected);
    }
  };
  const handleCancelAvatarSelect = () => {
    setTempFile(null);
  };

  if (!avatarFileId || !data)
    return (
      <>
        {!tempFile && (
          <>
            <button
              onClick={() => fileRef.current?.click()}
              className="border-2 w-full border-gray-400 border-dashed p-4"
            >
              Add Image
            </button>
            <input
              onChange={handleAvatarSelection}
              ref={fileRef}
              type="file"
              className="hidden"
            />
          </>
        )}
        {tempFile && (
          <div className="border-dashed border-2 border-gray-400 p-4 flex flex-col items-center">
            <div className="h-14 w-14">
              <img src={URL.createObjectURL(tempFile)} />
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={handleCancelAvatarSelect} bgColor="red">
                Cancel
              </Button>
              <Button onClick={handleAvatarUpload} bgColor="indigo">
                Upload
              </Button>
            </div>
          </div>
        )}
      </>
    );
  const { url } = data as FileResponse;
  return (
    <div className="relative border-dashed border-2 border-gray-400 p-4">
      <Avatar isClickable={false} userId={id!} imgUrl={url} />
      <button
        onClick={deleteAvatarHandler}
        className="absolute top-4 right-4 text-red-600 text-lg"
      >
        <FiX />
      </button>
    </div>
  );
};
const EditProfile = () => {
  const dispatch = useDispatch();
  const { avatarFileId, userName, bio, email } = useSelector(selectUserInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigate();

  const toggleModal = (val?: boolean) => setIsModalOpen((p) => val || !p);

  const deleteAvatarHandler = async () => {
    toggleModal();
  };

  const [deleteFile] = useDeleteFileMutation();
  const deleteUserAvatar = async () => {
    try {
      if (!avatarFileId) {
        return;
      }
      const { message } = await deleteFile(avatarFileId).unwrap();
      dispatch(updateAvatarId({ id: null }));
      toast.success(message);
      toggleModal(false);
    } catch (error) {
      toast.error("Unable to delete file.");
      console.log(error);
    }
  };
  const [handleUpdate] = useUpdateMeMutation();
  const handleProfileUpdate = async (data: Partial<UpdateUserSchema>) => {
    try {
      const payload = { ...data, email, avatarFileId } as UpdateUserSchema;
      const updatedUser = await handleUpdate(payload).unwrap();
      dispatch(updateUserInfo(updatedUser));
      toast.success("Profile Updated");
      nav("/dash/profile");
    } catch (error) {
      const errorMsg = `Unable to update profile`;
      console.error(errorMsg + ": ", error);
      toast.error(errorMsg);
    }
  };
  return (
    <DashPanel
      title="Edit Profile"
      headerActions={
        <Button
          noPad
          className="p-2 text-sm"
          onClick={() => nav("/dash/profile")}
        >
          Back
        </Button>
      }
    >
      <h6 className="font-bold text-lg">Avatar:</h6>
      <AvatarUploader deleteAvatarHandler={deleteAvatarHandler} />
      {isModalOpen && (
        <Modal
          closeModal={() => toggleModal(false)}
          title="Avatar Edit"
          body={
            <>
              <h6 className="font-bold">
                Are you sure you'd like to delete your existing avatar file?
              </h6>
              <p className="text-gray-700">This cannot be undone.</p>
            </>
          }
          footer={
            <div className="flex gap-4 justify-between">
              <Button onClick={() => toggleModal(false)} bgColor="red">
                Cancel
              </Button>
              <Button onClick={deleteUserAvatar} bgColor="blue">
                Delete My Avatar
              </Button>
            </div>
          }
        />
      )}
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
