import { orderAction } from '../redux/slices/orderSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';

const PaginationComponent = () => {
  const { dto, data } = useAppSelector((state) => state.orderStore);
  const dispatch = useAppDispatch();

  const currentPage = dto.page ?? 1;
  const limit = dto.limit ?? 25;
  const totalPages = Math.ceil(data.total / limit);

  const handlePageClick = (page: number) => {
    dispatch(orderAction.setPage(page));
    dispatch(orderAction.loadOrdersAll({
      ...dto,
      page,
    }));
  };

  const renderPages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx + 1}
          onClick={() => handlePageClick(idx + 1)}
          disabled={currentPage === idx + 1}
        >
          {idx + 1}
        </button>
      ));
    }

    if (currentPage <= 7) {
      return (
        <>
          {Array.from({ length: 7 }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageClick(idx + 1)}
              disabled={currentPage === idx + 1}
            >
              {idx + 1}
            </button>
          ))}
          <span>...</span>
          <button onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages}>
            {totalPages}
          </button>
        </>
      );
    } else {
      const pages = [];

      pages.push(
        <button key={1} onClick={() => handlePageClick(1)} disabled={currentPage === 1}>
          1
        </button>
      );
      pages.push(<span key="dots-start">...</span>);

      let startPage = totalPages - 6;
      if (currentPage < totalPages - 3) {
        startPage = currentPage - 3;
      }
      startPage = Math.max(startPage, 2);

      const endPage = Math.min(startPage + 6, totalPages);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            disabled={currentPage === i}
          >
            {i}
          </button>
        );
      }

      return pages;
    }
  };

  return (
    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
      {currentPage > 1 && (
        <button onClick={() => handlePageClick(currentPage - 1)}>
          {'<'}
        </button>
      )}
      {renderPages()}
      {currentPage < totalPages && (
        <button onClick={() => handlePageClick(currentPage + 1)}>
          {'>'}
        </button>
      )}
    </div>
  );
};

export default PaginationComponent;