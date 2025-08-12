const CustomInput = ({ label, classes, children, ...props }) => {
  return (
    <div className={classes}>
      {label && (
        <label className="block mb-1 text-body font-semibold">{label}</label>
      )}
      <input
        {...props}
        className={`w-full border border-border px-4 py-2 rounded-md bg-muted focus:outline-primary `}
      />
      {children}
    </div>
  );
};

export default CustomInput;
