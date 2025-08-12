import { Link } from "react-router";

const Logo = ({ hideInXlDevices }) => {
  return (
    <Link to={"/"} className=" flex items-center gap-3">
      <img
        src="/images/logo.png"
        alt="curanews"
        className="w-7 lg:w-8 xl:w-9  aspect-square object-cover"
      />
      <span
        className={`text-lg  leading-[15px] lg:text-xl  lg:leading-4 ${
          hideInXlDevices ? " max-xl:hidden " : ""
        }   font-bold font-merriweather`}
      >
        Cura <br /> News
      </span>
    </Link>
  );
};

export default Logo;
