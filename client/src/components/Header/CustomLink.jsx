import { NavLink } from "react-router";

const CustomLink = ({ Element = "li", children, ...props }) => {
  return (
    <Element>
      <NavLink
        {...props}
        className={({ isActive }) =>
          ` font-medium  text-base text-primary relative before:content-[''] before:block before:absolute before:top-full before:left-0 before:h-1  ${
            isActive ? " before:w-full " : " before:w-0"
          } before:bg-primary hover:before:w-full before:transition-all before:duration-300`
        }
      >
        {children}
      </NavLink>
    </Element>
  );
};

export default CustomLink;
