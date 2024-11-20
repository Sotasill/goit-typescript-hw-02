import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import GetImages from "../apiRequest";
import { useState, useEffect, useRef } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { BiSolidNoEntry } from "react-icons/bi";

interface Image {
  id: string;
  urls: {
    regular: string;
    small?: string;
  };
  alt_description: string;
}

interface ApiResponse {
  results: Image[];
  total: number;
  total_pages: number;
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string>("");
  const [modalAlt, setModalAlt] = useState<string>("");
  const [modalAuthor, setModalAuthor] = useState<string>("");
  const [modalDescription, setModalDescription] = useState<string>("");
  const [modalRating, setModalRating] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchImagesHandler = async () => {
      try {
        setError(false);
        setLoading(true);
        const data: ApiResponse = await GetImages(query, page);
        const results = data.results;

        if (page === 1) {
          if (results.length === 0) {
            toast("There are no results, try another search", {
              icon: <BiSolidNoEntry />,
              position: "top-right",
              duration: 5000,
              style: {
                background: "red",
                color: "#fff",
                fontSize: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              },
            });
            return;
          }
          toast.success(`A total of ${data.total} results found`, {
            position: "top-right",
            duration: 5000,
            style: {
              background: "green",
              color: "#fff",
              fontSize: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            },
          });
        }

        setIsLastPage(page >= data.total_pages);
        setImages((prevData) => [...prevData, ...results]);
      } catch (error) {
        setError(true);
        setErrorMessage((error as Error).message);
        toast.error((error as Error).message, {
          position: "top-right",
          duration: 5000,
          style: {
            background: "red",
            color: "#fff",
            fontSize: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        });
      } finally {
        setLoading(false);
      }
    };
    if (query) {
      fetchImagesHandler();
    }
  }, [query, page]);

  useEffect(() => {
    if (isLastPage) {
      toast.success("You have reached the end of the results", {
        position: "top-right",
        duration: 5000,
        style: {
          background: "green",
          color: "#fff",
          fontSize: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });
    }
  }, [isLastPage]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onSubmitReset = () => {
    setPage(1);
    setQuery("");
    setImages([]);
  };

  const pageIncrement = () => {
    setPage((prevData) => prevData + 1);
  };

  const openModal = (imageUrl: string, alt: string, author: string = "", description: string = "", rating: number = 0) => {
    setModalIsOpen(true);
    setModalImage(imageUrl);
    setModalAlt(alt);
    setModalAuthor(author);
    setModalDescription(description);
    setModalRating(rating);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={css.container}>
      <Toaster />
      <SearchBar reset={onSubmitReset} setQuery={setQuery} inputRef={inputRef} />
      {error ? (
        <ErrorMessage errorMessage={errorMessage} />
      ) : (
        images.length > 0 && (
          <>
            <ImageGallery images={images} onModalOpen={openModal} />
            {!isLastPage && <LoadMoreBtn loadMoreImages={pageIncrement} />}
          </>
        )
      )}
      {loading && <Loader />}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        modalImage={modalImage}
        modalAlt={modalAlt}
        modalAuthor={modalAuthor}
        modalDescription={modalDescription}
        modalRating={modalRating.toString()}
      />
    </div>
  );
};

export default App;
