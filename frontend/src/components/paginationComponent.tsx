import { useAppDispatch, useAppSelector } from '../redux/store';

const PaginationComponent = () => {
  const { dto } = useAppSelector((state) => state.orderStore);
  const dispatch = useAppDispatch();


  return(
    <div>

    </div>
  )
};

export default PaginationComponent;