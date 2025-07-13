import { orderAction } from '../../redux/slices/orderSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import '../../styles/styles.scss';

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
      return (
        <div>
          {
        Array.from({ length: totalPages }, (_, index) => (
          <button className={'divMainLayout__outlet__ordersAllPage__paginationComponent__button'}
            key={index + 1} // 0+1, 1+1 ...
            onClick={() => handlePageClick(index + 1)}
            disabled={currentPage === index + 1}
            // disabled={true} кнопку відключено (користувач вже на цій сторінці)
            // disabled={false} кнопку можна натиснути, щоб перейти на цю сторінку
          >
            {index + 1}
          </button>))
          }
        </div>
      )
    }

    // якщо поточна сторінка <= 7 — показуємо 7 перших + "..." + остання
    if (currentPage <= 7) {
      return (
        <div>
          {Array.from({ length: 7 }, (_, index) => (
            <button className={'divMainLayout__outlet__ordersAllPage__paginationComponent__button'}
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
          <button className={'divMainLayout__outlet__ordersAllPage__paginationComponent__button'} ><span>...</span></button>
          <button className={'divMainLayout__outlet__ordersAllPage__paginationComponent__button'} onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages}>
            {totalPages}
          </button>
        </div>
      );
    } else {

      const firstPage = (
        <button className={'divMainLayout__outlet__ordersAllPage__paginationComponent__button'} key={1} onClick={() => handlePageClick(1)} disabled={currentPage === 1}>
          1
        </button>
      );
      const dots = <button className={'divMainLayout__outlet__ordersAllPage__paginationComponent__button__dots'}><span key="dots">...</span></button>;
        // startPage сторінка з якою почнеться нумерація після ...
      let startPage = totalPages - 6;
      // якщо ми зараз знаходимось на сторінці, яка знаходиться десь посередині,
      // тобто ми ще не наблизились до кінця списку,
      // тоді ми будемо показувати попередні 3 кнопки відносно поточної сторінки
      if (currentPage < totalPages - 3) {
        startPage = currentPage - 3;
      }

      // так як в else ми окремо завжди світимо 1 сторінку,
      // то для того щоб в нашому списку наступна сторінка була мінімум 2
      // щоб не дублювати двійчі 1 сторінку
      // ми обираємо більше з двох значень
      startPage = Math.max(startPage, 2);

      // тут пишемо умову щоб кінцева сторінка в нас максимум була totalPages
      // ми обираємо менше з двох значень
      const endPage = Math.min(startPage + 6, totalPages);
      const middlePages = Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        // startPage + 1, тут + 1 потрібен, бо Array.from не включає кінцеве значення,
        // тому нам треба вручну додати ще один елемент, щоб останній номер також потрапив у список
        return (
          <button className={'divMainLayout__outlet__ordersAllPage__paginationComponent__button'}
            key={startPage + index}
            onClick={() => handlePageClick(startPage + index)}
            disabled={currentPage === startPage + index}
          >
            {startPage + index}
          </button>
        );
      });
      return <div>{[firstPage, dots, ...middlePages]}</div>;
    }
  };

  return (
    <div className={'divMainLayout__outlet__ordersAllPage__paginationComponent'} style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
      {currentPage > 1 && (
        <button className={'divMainLayout__outlet__ordersAllPage__paginationComponent__button'} key={currentPage - 1} onClick={() => handlePageClick(currentPage - 1)}>
          {'<'}
        </button>
      )}

      {renderPages()}

      {currentPage < totalPages && (
        <button className={'divMainLayout__outlet__ordersAllPage__paginationComponent__button'} key={currentPage + 1} onClick={() => handlePageClick(currentPage + 1)}>
          {'>'}
        </button>
      )}
    </div>
  );
};

export default PaginationComponent;