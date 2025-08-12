const ActionButton = ({ Icon, classes, children, ...props }) => {
  return (
    <button
      {...props}
      className={`px-3 py-1 text-sm rounded flex items-center  gap-1 justify-center ${classes}`}
    >
      <Icon /> {children}
    </button>
  );
};

export default ActionButton;
