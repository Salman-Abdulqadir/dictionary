/**?
 * To use this component first wrap the parent component of the targeted component with the confirmation modal provider
 * then use the "useConfirmationModal Hook"
 */
import { createContext, useContext, useState } from "react";
import Modal from "./Modal";

const ConfirmationModalContext = createContext();
import { IoWarning } from "react-icons/io5";

export const useConfirmationModal = () => useContext(ConfirmationModalContext);

export const ConfirmationModalContextProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    content: null,
    onOk: null,
    onCancel: null,
  });
  const setIsModalOpen = (isOpen) =>
    setModalState((prevState) => ({ ...prevState, isOpen }));
  const closeModal = () => setIsModalOpen(false);

  const confirmationModal = ({ onOk, onCancel, content }) => {
    setModalState({
      isOpen: true,
      content,
      onOk: () => {
        onOk();
        closeModal();
      },
      onCancel: onCancel || closeModal,
    });
  };
  return (
    <ConfirmationModalContext.Provider value={confirmationModal}>
      <Modal isOpen={modalState?.isOpen} setIsOpen={setIsModalOpen}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <header className="flex flex-col items-center justify-center">
              <IoWarning size={50} color="orange" />
              <h2 className="text-2xl font-bold text-primary">Are you sure?</h2>
            </header>
            <p>{modalState?.content}</p>
          </div>
          <footer className="flex gap-2 self-end">
            <button className="btn btn-sm" onClick={modalState?.onCancel}>
              cancel
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={modalState?.onOk}
            >
              Confirm
            </button>
          </footer>
        </div>
      </Modal>
      {children}
    </ConfirmationModalContext.Provider>
  );
};
