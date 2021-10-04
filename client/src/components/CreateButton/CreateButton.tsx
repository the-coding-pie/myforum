import { Link } from "react-router-dom";
import { CreateButtonWrapper } from "./CreateButton.style";

const CreateButton = () => {
  return (
    <CreateButtonWrapper>
      <Link to="/create">
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      </Link>
    </CreateButtonWrapper>
  );
};

export default CreateButton;
