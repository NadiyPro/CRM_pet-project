import { useNavigate } from 'react-router-dom';
import '../../styles/styles.scss';

const AdminPanelComponent = () => {
  const navigate = useNavigate();

  const goToAdminPanel = () => {
    navigate('/admin');
  }

  return(
    <div>
      <button type={'button'} onClick={goToAdminPanel}>
        <div>
          <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAErElEQVR4nO2ZaYyeUxTHf9PRjqKWWEpnpiaYqq2ICGJPRZEIQUIlEomILUhT4QMf0DTGlqCpRkXEGkXHEoqUD5Y0bVomlNAIQ4WozhidolHLyEn+Jzl5PO/6vG/vK+k/ucn73nvPec65957lngvbsR3/GxwHzAPeA74Cfgd+BQaBZ4GzaHEcDbwLjFXRngYm0oI4F/hDQm4A7tPK90jgnYCDgbnAiObZLi0G9qRFcEJQYiEwqcL804G1wN+i+QzYg8RoAz6WQA/USGs79IlonyIxZkqQ9cCOddD3yBnY7kwnIR6UIncW4PGoeNxOQnwgIezc14vzxeMtEuJ7CdFdgMfh4rGOhNgsIfYuwGMv8dgi55EEmyREVwEeO4jHP8A4EmG9hDioATtiu5sMb0uIMwrwmCYeP5AQD0mImwrwOE883iEhrmlAZL5XPO4mIW6WEJ8X4PFpnSlOQzEoIex41ItZ4jFEQmyRELsU4GGx40+533YSYUCKnF2Ax3Tx+JaEuENCfAFcVwf9xcBq8bBLVjLsLiXGdM2tFa+HGDKVxOjW+bbIPL4GuglKcewucgAtggGtrB2VanFJgZ1sGq6WUGuVBFbCRKXtRjObFsIE4EsJ9mQV6fgzmrsmZcZbCseHulUl2JwfgUNyxvbNqYNZ0NymqFYRU+JQ/Z6S2cFZOYrcGMbbRNMSirgSM4CNwHKgU323iIcVJa7X74c1tg+wTDRG23RFXilR3pkWLmGuhNMMA3eFy9oNwJn6/RPQp3jj85umjBcRvFn+tAiYrFvgAhW227T6rsSrWuVIOyKb6wwFDm/LVXFxBStVNmvCsaq8G/PHlW78Fa6wv2TKRqbMG+pbJs91rWLKZUBH4N2uktEK4FYlqJ5NPNIoBWzVlmj1jfH7IRM+IhSsPcZETFbBe0xKVIuFIcnctYjw4xXBV+R4FzNOMkbr7Z4cXk9ozOKKw+yoHxhVWwr05hQFzZ7qglXMb8uc2RE9IczR/63AaXpS8KPlzQzX3escHT+vi/UGJX7OWaCh4NVmB/tYJNfsvMuiTSs9HBhbBf4qYOcwry94Exfm/pCHeWKYFfKbwKNffa9J8K7gCOwIo2K521xsZWFn8M0w2bb15BJzx8kD+dx+fdSdgCvt45afnQjsFniM5hT8utVnwjuM11HARdUoYpNXatIG2UWlHGqSaFbq99zwIX9q8/+LdRmzJ7tylcsp6rMxxzGywZerUWSBJnwN7E/tsCz4u/AhP+PZI7FRSadhaXDJXVLiJfW9qDkdmUBaVpFeXZa2yo3WgwtKGLsFx1NkY+44LgzfHcoRcjg4hEtDn8WVc4D9SgnR14CA81hGGLvfl3K/8W2kU4a9SXbxXNhNw4ch8FaExwh7Wita8/K2LmNjR4ZHVLstVguvbm6Wuy6L6Gob2WaGoDoQgmG7jPcjHZ2YolimcIV2Yp5oXxDt6mBf/0FHk5SwtiqkJ4MhrVmV4wBmAAcCv2XG1ojG3+oPIzF6MsfPIvX8cJe/PMSJUdlTjPqmxKm0CKYqYD4fnu+ulKDz9Vo8plDgO9mvXSryANsUZO8TJ+UcSbORiCJPfdsM/hQXW4z+ufgX4ubmEBWgfpEAAAAASUVORK5CYII="
          alt="admin" />
          <p>admin</p>
        </div>
      </button>
    </div>
  )

};

export default AdminPanelComponent;