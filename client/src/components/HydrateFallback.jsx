const HydrateFallback = () => {
  return (
    <div className="min-h-[100dvh] grid place-items-center bg-white opacity-30">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  );
};

export default HydrateFallback;
