import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { SearchBoxWrapper } from "./SearchBox.style";

const SearchBox = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    query !== "" && history.push(`/search/?q=${query}`);
  };

  useEffect(() => {
    if (!pathname.includes("/search")) {
      setQuery("");
    }
  }, [pathname]);

  return (
    <SearchBoxWrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search MyForum"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </SearchBoxWrapper>
  );
};

export default SearchBox;
