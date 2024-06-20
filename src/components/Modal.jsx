import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({
  isOpen,
  setIsOpen,
  children,
  title = "",
  withCloseButton = true,
}) => {
  const modalRef = useRef(null);
  const openModal = () => {
    const modal = modalRef.current;
    modal.showModal();
  };
  const closeModal = () => {
    const modal = modalRef.current;
    if (isOpen) setIsOpen(false);
    modal.close();
  };
  useEffect(() => {
    if (isOpen) {
      openModal();
      return;
    }
    closeModal();
  }, [isOpen]);
  return (
    <dialog
      ref={modalRef}
      onCancel={closeModal}
      onClick={closeModal}
      className="modal modal-bottom sm:modal-bottom lg:modal-middle"
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <header className="flex items-center justify-between">
          <h3 className="font-bold">{title}</h3>
          {withCloseButton && (
            <button
              className="btn btn-ghost btn-circle btn-xs"
              onClick={closeModal}
            >
              <IoClose size={20} />
            </button>
          )}
        </header>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
