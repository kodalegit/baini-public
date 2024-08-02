function SkeletonCard() {
  return (
    <div className="mt-12 flex min-h-screen justify-center">
      <div className="mt-8 flex w-10/12 flex-col gap-4 md:w-7/12">
        <div className="skeleton h-48 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>

        <div className="flex items-end justify-center gap-4">
          <div className="skeleton h-8 w-5/12 md:h-10"></div>
          <div className="skeleton h-5 w-2/12 md:h-8"></div>
          <div className="skeleton h-5 w-2/12 md:h-8"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
