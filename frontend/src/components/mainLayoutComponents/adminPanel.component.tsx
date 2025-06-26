import { useNavigate } from 'react-router-dom';
import '../../styles/styles.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { RoleTypeEnum } from '../../module/enums/roleTypeEnum';
import { adminAction } from '../../redux/slices/adminSlice';

const AdminPanelComponent = () => {
  const { role } = useAppSelector(state => state.adminStore.authTokens.user)
  const { adminPanelError } = useAppSelector (state => state.adminStore)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goToAdminPanel = () => {
    if (role !== RoleTypeEnum.ADMIN) {
      dispatch(adminAction.setAdminPanelError('Помилка. Заявка знаходиться в роботі у іншого менеджера.'))
      setTimeout(() => {
        dispatch(adminAction.setAdminPanelError(null))
      }, 4000)
    }
    navigate('/admin');
  }

  return(
    <div className={'divMainLayout__header__nav__panel'}>
      <button className={'divMainLayout__header__nav__panel__button'} type={'button'} onClick={goToAdminPanel}>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE9ElEQVR4nO2Za4hVVRTHj+OzbCzpYTlaUlr20IqIip4yoSWEUoEaBIFEpZhIkR/qQyqhvaASi4yQHhNN5WRRmlQfrAhFK8qihiizKDLHRmey6PmLNfPf4+J07txz7jl35gb+YeDcffZa819n7/XYa0fRQRzE/wPAecAy4B3gK+BX4BdgB/AccEVUywDOBjaRDs8Ch0S1BuAq4HeR3AU8YF8eGGeEgUOBU4DbgHbNs1VaDRwZ1QKAC5wRq4D6MvOnANuBvyXzGTCy7xgnABgAfCxCD0UZoBX6RLLPRP0JoFFEvgWGVSA/TsHAVmdidVimI/KwDFmaQ8cT0nF3seyykXhPJKbk0DFTOjYWyy4bie9FYmwOHWdIR2ux7LKR6BSJo3PoOEo6frPgUSzD9CT2icSYHDoGScc/QF2xDNOTsGhlGF/AinQWyy4bibdE4vIcOk6Wjh+KZZeNxCMicXsOHTOk4+1i2WUjcUvezAzcLx33FssuG4k7ROLzHDo+raTEKRQ6Yxhm5NAxTTraimWXjYTFfsNhOQvPPxV+BxbLMD2Jj2TIlTl0TJSOncWyy0ZiiUh8AcyvQH4WsFU6VleHZToiR8gIw6YK5F8POQQ4vjos05MZq/1tddfgDHJDVOLYWeTEqBbAAV+ZlUFmdqUrWTUAN4uUncUHpZhvDYlWycyJagV0b5MvRezpcuU40KS52/qt4i0F4HyRI8Vcw4/AqQnvjuW/mBb1JTIYYkacpufRfgU5kOk9FsYS6OhaMSQYMRnYDbwJNGhssdRYU2KBnh/Vu2OA9ZKZXHVDgFeS2js6e4yPGRGwB1juDmu3AlP1/BOwQvkmoDrGuCZCgNVPjwGjdApcqca2bY0GZ8Sr+soe7fK5BtfgCLDV2+gMrC/SiHPVeTesUU/3L/22RLnXt41kzAaNmRF1wDw1wa8HhjrdA9Uyeh+40wpUV008XpQB9tWa9fUN74ZKGJjkGtaG7THZUWp4G+Zl+J+rJLMTGJGH/GAVe/aF4ljg5gWnDbgvQddTetcU86MWoEN/a4EJCU3B5ZUaMBK4K7Zn23WFsEi//wAu05VC2FoBU114XaTtF/piE5wRPyd8oDYX1eY4/zAfXBh0lzNggMKgRZUA68DfBAx38yyqICcOZB50dVhXYZhA8huno0Vjr8nRx7hA0Kw5w5zP9aCcESOAN9x8W9aLS8ytUwQKaNE/DUGgy2j33uqzC4HDnY6OeMNP1bVhrxsbDpwFXFvWEE3erHm75Bflaqh6yWzWs91QBXRdtbnftrXm25Vdb51LujO/YZ8bO0c+uC6NIRb3DV8DJ/RmQC+t0O8c8bDH47CtOETv1mpsvbaVGfGyxl7SnKGxRFraEHM+HZbMeSdlNUI6ri7h7JYcL5GPhcBxjfu/bQnG7nEB4To3ZnllOnBcKRIr8iYc4MkYmSW9hN+euxG6nbxZ28yc+vmwmnr/gWTWpCERckRjAT2vgNZYlXumu0SdXUF3s9PCdbnJPtQWiUaXVENYblIZYs77obaOL1GsJJmrlVgm2RcluzX4V5IR5kzVwhZXnuxwZc2W2Lzdqo5PAvbH3m2TTLirPz3qT+hG128/y9T3uLP8DS5PdMiffNY3Iy6NagHWy1LCfCFc3wE3iqgZtVTPK91KtmiVKr6ArQri5wngooQtOTc2p+Krvj6Du4rz6Mn+pfAvkq1XHjamiSgAAAAASUVORK5CYII="
          alt="admin" />
        <p className={'divMainLayout__header__nav__panel__button__p'}>admin</p>
      </button>
      { adminPanelError &&
        <div style={{ width: '15vw', height: '6vh', textAlign: 'center' }}><p style={{margin: 0, color: '#6e0707'}}>{adminPanelError}</p></div>
      }
    </div>
  )

};

export default AdminPanelComponent;