import "./ExploreContainer.css";
import { Link } from "react-router-dom";

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div
      id="container"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <strong>For Product App </strong>
      <Link to="/product">Click here</Link>
      <strong>For Todo App </strong>
      <Link to="/todo">Click here</Link>
      <strong>User Details App </strong>
      <Link to="/user-details">Click here</Link>
    </div>
  );
};

export default ExploreContainer;
