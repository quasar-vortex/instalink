import React from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

type DeleteAvatarModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteAvatarModal: React.FC<DeleteAvatarModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      closeModal={onClose}
      title="Confirm Avatar Deletion"
      body={
        <>
          <h6 className="font-bold">
            Are you sure you want to delete your avatar?
          </h6>
          <p className="text-gray-700">This action cannot be undone.</p>
        </>
      }
      footer={
        <div className="flex gap-4 justify-between">
          <Button onClick={onClose} bgColor="red">
            Cancel
          </Button>
          <Button onClick={onDelete} bgColor="blue">
            Delete Avatar
          </Button>
        </div>
      }
    />
  );
};

export default DeleteAvatarModal;
