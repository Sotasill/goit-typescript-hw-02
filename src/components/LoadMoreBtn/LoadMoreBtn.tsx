import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  loadMoreImages: () => void;
}

export default function LoadMoreBtn({ loadMoreImages }: LoadMoreBtnProps) {
  return (
    <button className={css.button} onClick={loadMoreImages}>
      Load more
    </button>
  );
}
