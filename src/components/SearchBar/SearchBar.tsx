import React, { FormEvent } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  reset: () => void;
  setQuery: (query: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const SearchBar: React.FC<SearchBarProps> = ({ reset, setQuery, inputRef }) => {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = inputRef.current?.value.trim();
    if (!query) {
      toast.error("Please enter your search", { position: "top-right" });
    } else {
      reset();
      setQuery(query);
      e.currentTarget.reset();
    }
  };

  return (
    <div className={css.wrapper}>
      <form onSubmit={submitHandler} className={css.form}>
        <input
          name="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Enter to Search Images"
          className={css.input}
          ref={inputRef}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
