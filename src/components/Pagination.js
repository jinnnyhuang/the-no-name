import Icons from "./Icons";

const Pagination = ({ currentPages, total, onClick }) => {
  const pageCount = Math.ceil(total / process.env.REACT_APP_DEFAULT_PER_PAGE);
  // const pages = [];
  // for (let i = 1; i <= pageCount; i++) {
  //   page.push(<div>key={i}</div>);
  // }

  const pages = Array(pageCount)
    .fill(0)
    .map((_, i) => {
      i++;
      return (
        <div key={i} className={`pagination ${currentPages === i && `text-white bg-primary`}`} onClick={() => onClick(i)}>
          {i}
        </div>
      );
    });

  return (
    pageCount > 1 && (
      <div className="flex justify-center items-center gap-x-4 mx-5 mt-16 lg:mx-24">
        {currentPages !== 1 && <Icons.Prev className="pagination-icon" onClick={() => onClick(currentPages - 1)} />}
        {pages}
        {currentPages < pageCount && <Icons.Next className="pagination-icon" onClick={() => onClick(currentPages + 1)} />}
      </div>
    )
  );
};

export default Pagination;
