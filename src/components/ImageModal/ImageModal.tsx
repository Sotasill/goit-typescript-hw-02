import Modal from "react-modal";
import css from "./ImageModal.module.css";

interface ImageModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  modalImage: string;
  modalAlt: string;
  modalAuthor: string;
  modalDescription: string;
  modalRating: string;
}

export default function ImageModal({
  modalIsOpen,
  closeModal,
  modalImage,
  modalAlt,
  modalAuthor,
  modalDescription,
  modalRating,
}: ImageModalProps) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={css.modal}
      overlayClassName={{
        base: css.backdrop,
        afterOpen: css.backdropOpen,
        beforeClose: css.backdropClose,
      }}
      closeTimeoutMS={600}
    >
      <img src={modalImage} alt={modalAlt} className={css.image} />
      <div className={css.info}>
        <h3>Author: {modalAuthor}</h3>
        <p>Description: {modalDescription}</p>
        <p>Rating: {modalRating}</p>
        <button className={css.closeButton} onClick={closeModal}>
          Dissmiss
        </button>
      </div>
    </Modal>
  );
}
