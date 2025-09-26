import { NavLink, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/posts"}>Plain Posts</NavLink>
          </li>
          <li>
            <NavLink to={"/tq-posts"}>TQ Posts</NavLink>
          </li>
          <li>
            <NavLink to={"/paginated-fruits"}>Paginate</NavLink>
          </li>
          <li>
            <NavLink to={"/infinite-fruits"}>Infinite Scroll</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;
