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
    <li className={css.imageItem}>
      <div className={css.imageWrapper}>
        <img
          src={small}
          alt={altDescription}
          className={css.image}
          onClick={() => onModalOpen(regular, altDescription)}
        />
      </div>
    </li>
  );
}

export default ImageCard;
