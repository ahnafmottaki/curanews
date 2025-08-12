const CustomTextarea = ({ label, children, ...props }) => {
  return (
    <div>
      <label className="block mb-1 text-body font-semibold">{label}</label>
      <textarea
        {...props}
        className="w-full resize-y px-4 py-3 rounded-md min-h-[150px] max-h-[250px] bg-muted border border-border focus:outline-primary"
      ></textarea>
      {children}
    </div>
  );
};

export default CustomTextarea;
