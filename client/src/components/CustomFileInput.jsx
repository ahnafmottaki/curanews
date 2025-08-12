const CustomFileInput = ({ label, children, ...props }) => {
  return (
    <div>
      <label className="block mb-1 text-body font-semibold">{label}</label>
      <input
        type="file"
        accept="image/*"
        className="w-full px-3 py-2 rounded-md bg-muted border border-border file:mr-3 file:border-0 file:text-primary"
        {...props}
      />
      {children}
    </div>
  );
};

export default CustomFileInput;
