import css from "./ImageCard.module.css";

interface ImageCardProps {
  urls: {
    small: string;
    regular: string;
  };
  altDescription: string;
  onModalOpen: (url: string, alt: string) => void;
}

function ImageCard({ urls: { small, regular }, altDescription, onModalOpen }: ImageCardProps) {
  return (
    <div className={css.imageCard}>
      <div className={css.imageWrapper}>
        <img
          src={small}
          alt={altDescription}
          className={css.image}
          onClick={() => onModalOpen(regular, altDescription)}
        />
      </div>
    </div>
  );
}

export default ImageCard;
