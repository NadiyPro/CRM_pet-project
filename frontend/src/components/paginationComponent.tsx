import { orderAction } from '../redux/slices/orderSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';

const PaginationComponent = () => {
  const { dto, data } = useAppSelector((state) => state.orderStore);
  const dispatch = useAppDispatch();

  const currentPage = dto.page ?? 1; // початкова сторінка, за замовченням 1
  const limit = dto.limit ?? 25;
  const totalPages = Math.ceil(data.total / limit);
  // обчислюємо кількість сторінок (наприклад, якщо в нас 500 елементів і ліміт 25, то сторінок буде 20)

  const handlePageClick = (page: number) => {
    dispatch(orderAction.setPage(page));
    dispatch(orderAction.loadOrdersAll({
      ...dto,
      page,
    }));
  };

  const renderPages = () => {
    // якщо всього 7 сторінок або менше — рендеримо всі сторінки
    if (totalPages <= 7) {
      // Array.from — створює маси з довжиною { length: totalPages },
      // і для кожного індексу масиву довжиною totalPages (<= 7 сторінок) створюємо свій button,
      // таким чином ми виконуємо мапінг (ітерацію) кнопок для кожної сторінки
      // в нас callback функція, яка повинна містити два аргументи, щоб дістатись до індекса,
      // тому в якості першого аргументу вкажемо _ , бо ми його не використовуємо, а другим в нас буде index
      return Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1} // 0+1, 1+1 ...
          onClick={() => handlePageClick(index + 1)}
          disabled={currentPage === index + 1}
          // disabled={true} кнопку відключено (користувач вже на цій сторінці)
          // disabled={false} кнопку можна натиснути, щоб перейти на цю сторінку
        >
          {index + 1}
        </button>
      ));
    }

    // якщо поточна сторінка <= 7 — показуємо 7 перших + "..." + остання
    if (currentPage <= 7) {
      return (
        <>
          {Array.from({ length: 7 }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
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

      // startPage сторінка з якою почнеться нумерація після ...
      let startPage = totalPages - 6;
      if (currentPage < totalPages - 3) {
        startPage = currentPage - 3;
      }
      startPage = Math.max(startPage, 2); //// щоб не показати сторінку менше ніж 2 (бо 1 вже показана)

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