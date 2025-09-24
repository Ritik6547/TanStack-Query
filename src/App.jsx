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
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;
