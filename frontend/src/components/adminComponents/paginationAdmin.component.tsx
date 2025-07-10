import { useAppDispatch, useAppSelector } from '../../redux/store';
import { adminAction } from '../../redux/slices/adminSlice';

const PaginationAdminComponent = () => {
  const { dto, data } = useAppSelector((state) => state.adminStore);
  const dispatch = useAppDispatch();

  const limit = dto.limit ?? 5;
  const currentPage = dto.page ?? 1;
  const totalPages = Math.ceil(data.total / limit);

  const handlePageClick = (page: number) => {
    dispatch(adminAction.setPage(page))
    dispatch(adminAction.loadUsersAll({
      ...dto,
      page
    }))
  }

  const renderPage = ()=> {
    if(totalPages <= 7){
      return (
        <div>
          {
        Array.from({ length: totalPages }, (_, index) => (
          <button className={'divMainLayout__outlet__ordersAllPage__paginationComponent__button'} key={index + 1} onClick={() => handlePageClick(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>))
          }
        </div>)
    }

    if(currentPage <= 7){
      return (
      <div>
        {
        Array.from({ length: 7 }, (_, index) => (
          <button className={'divMainLayout__outlet__ordersAllPage__paginationComponent__button'} key={index + 1} onClick={() => handlePageClick(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))
      }
        <button className={'divMainLayout__outlet__ordersAllPage__paginationComponent__button'}><span>...</span></button>
        <button className={'divMainLayout__outlet__ordersAllPage__paginationComponent__button'} key={totalPages} onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages}>
          {totalPages}
        </button>
      </div>)
  } else {
          const firstPage = (
          <button className={'divMainLayout__outlet__ordersAllPage__paginationComponent__button'} key={1} onClick={() => handlePageClick(1)} disabled={currentPage === 1}>
            1
          </button>
          );

      const dots = (<button className={'divMainLayout__outlet__ordersAllPage__paginationComponent__button'}><span key="dots">...</span></button>);
          let startAdminPage = totalPages - 6;
          if (currentPage < totalPages - 3){
            startAdminPage = currentPage - 3;
          }

      startAdminPage = Math.max(startAdminPage, 2);
          const endPage = Math.min(startAdminPage + 6, totalPages);
          const middlePages = Array.from({length: endPage - startAdminPage + 1}, (_,index) => {
            return (
            <button className={'divMainLayout__outlet__ordersAllPage__paginationComponent__button'} key={startAdminPage + index} onClick={() => handlePageClick(startAdminPage + index)} disabled={currentPage === startAdminPage + index}>
              {startAdminPage + index}
            </button>)
          })
      return <div>{[firstPage, dots, ...middlePages]}</div>
    }
  }

  return(
    <div className={'divMainLayout__outlet__ordersAllPage__paginationComponent'}>
      {currentPage > 1 && (
        <button className={'divMainLayout__outlet__adminPage__paginationComponent__button'} key={currentPage-1} onClick={() => handlePageClick(currentPage - 1)}>
          {currentPage - 1}
        </button>
      )}

      {renderPage()}

      {currentPage < totalPages && (
        <button className={'divMainLayout__outlet__ordersAllPage__paginationComponent__button'} key={currentPage + 1} onClick={() => handlePageClick(currentPage + 1)}>
          {'>'}
        </button>
      )}
    </div>
  )
};

export default PaginationAdminComponent;