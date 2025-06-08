import { useAppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { authAction } from '../../redux/slices/authSlice';
import '../../styles/styles.scss';

const LogOutComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await dispatch(authAction.loadLogOut());
      navigate('/auth/login');
    } catch (e) {
      console.log(e)
    }
  }

  return(
    <div className={'divMainLayout__header__nav__panel'}>
      <button className={'divMainLayout__header__nav__panel__button'} type={'button'} onClick={logOut}>
        {/*<div>*/}
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNUlEQVR4nO3aO05DMRBGYUNBiwQtG0FZGG0aXjvJCmgQC6AIUNDR5rKNE01kikjJlSfRDf+MfHpL88nJfckFuACegV90GoBHm620Bjyh24MHYnrrtogEzOpMg2fRpiIW3rk6ZOLoOyIWfUfEAu5SXLUsYF4yQFx1yIQBC+AFuAz90wKWdaz3Zowo5Ab4qaMZ6iok5CCMKmQH5mMUowxxYdQhezDXJSKkCRMFsgPzuYWJBBnFRIPsxRwDAc6AL/6/5bGQ8/rHiw1J89OSugwTCMLYvSQKhAw3RFqet9QhtD7OK0PwvJOoQsjwYkWWV13gO8vHhzfgNfznoIPqkBNEho/YwNw1lzBk03QLThTeuTpk4ug7kmBHhrpmVvQO1aw8i+xclGr3HogdPDPM384otDKE5+DZGhon/IxufD43AAAAAElFTkSuQmCC"
          alt="logOut" />
        <p className={'divMainLayout__header__nav__panel__button__p'}>logout</p>
        {/*</div>*/}
      </button>
    </div>
  )
};

export default LogOutComponent;