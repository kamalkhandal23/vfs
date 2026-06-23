import ConfirmModal from "../../../../../../components/ui/modal/ConfirmModal";

/* eslint-disable react/prop-types */
const ClassSwitchModal = ({ open, title, onClose, onConfirm, assignedCount }) => {
  return (
    <ConfirmModal
      isOpen={open}
      onClose={onClose}
      title={`Switch to ${title}?`}
      message={`This will reset all ${assignedCount} assigned seats for the current passengers.`}
      confirmText="Switch and Reset"
      cancelText="Cancel"
      variant="warning"
      onConfirm={onConfirm}
    />
  );
};

export default ClassSwitchModal;
