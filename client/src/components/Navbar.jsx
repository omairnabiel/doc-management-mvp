export const Navbar = ({ heading }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand">{heading}</span>
      </div>
    </nav>
  );
};
