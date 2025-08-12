const CustomSelect = ({
  label = null,
  options,
  classes = "",
  children,
  ...props
}) => {
  return (
    <div className={classes}>
      {label && (
        <label className="block mb-1 text-body font-semibold">{label}</label>
      )}
      <select
        {...props}
        className={`w-full px-4 py-2 rounded-md bg-muted border border-border focus:outline-primary `}
      >
        {options}
      </select>
      {children}
    </div>
  );
};

export default CustomSelect;
