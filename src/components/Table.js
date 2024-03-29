const Table = ({ data, config, keyValue, className }) => {
  const renderedRow = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return (
        <td key={column.label} className="py-7.5">
          {column.render(rowData)}
        </td>
      );
    });

    return <tr key={keyValue(rowData)}>{renderedCells}</tr>;
  });

  const renderedTableHeaders = config.map((column) => {
    return (
      <th key={column.label} className={`py-1 font-normal ${column.class}`}>
        {column.label}
      </th>
    );
  });

  return (
    <table className={`${className} w-full text-neutral-500`}>
      <thead>
        <tr>{renderedTableHeaders}</tr>
      </thead>
      <tbody className="border-y border-neutral-200">{renderedRow}</tbody>
    </table>
  );
};

export default Table;
