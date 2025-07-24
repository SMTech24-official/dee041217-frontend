"use client";
import { Modal } from "antd";
interface Props {
  open: string;
  setOpen: (open: string) => void;
  name: string;
  handleDelete: () => void;
  isLoading: boolean;
}
function DeleteModal({ open, setOpen, name, handleDelete, isLoading }: Props) {
  return (
    <Modal
      title={<h2 className="text-xl font-semibold">Confirm Delete</h2>}
      open={!!open}
      onOk={() => handleDelete()}
      onCancel={() => {
        setOpen("");
      }}
      okText="Yes, Delete"
      cancelText="Cancel"
      okButtonProps={{
        danger: true,
        loading: isLoading,
        style: { height: "40px" },
      }}
      cancelButtonProps={{
        style: { height: "40px" },
      }}
      centered
    >
      <p className="text-lg">
        Are you sure you want to delete this <span className="text-green-500 font-semibold">{name}</span>? This action cannot be
        undone.
      </p>
    </Modal>
  );
}

export default DeleteModal;
