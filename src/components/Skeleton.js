const Skeleton = ({ times, skeleton }) => {
  const product = (
    <>
      <div className="animate-pulse w-full pb-[100%] bg-neutral-100"></div>
      <div className="flex justify-between items-start mt-4 text-transparent">
        <div className="animate-pulse info w-full">
          <div className="bg-neutral-100 rounded-md w-full sm:w-5/6 h-3.5"></div>
          <div className="bg-neutral-100 rounded-md w-14 h-3.5 mt-1.5"></div>
        </div>
      </div>
    </>
  );

  const content = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className="w-full">
          {skeleton ? skeleton : product}
        </div>
      );
    });

  return content;
};

export default Skeleton;
