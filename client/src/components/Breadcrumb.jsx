import { Link, useLocation } from "react-router";

const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const paths = pathSegments.map((seg, index) => {
    const url = "/" + pathSegments.slice(0, index + 1).join("/");
    const name = seg
      .split("-")
      .map((path) => path.replace(path.at(0), path.at(0).toUpperCase()))
      .join(" ");

    return { path: url, linkName: name };
  });

  return (
    <div className=" breadcrumbs font-merriweather mb-5 text-sm ">
      <ul className="">
        {paths.map((path) => {
          return (
            <li key={path.path}>
              <Link to={path.path}>{path.linkName}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
