import { Outlet } from 'react-router-dom';

const OrdersLayout = () => {

return(
  <div>
    <div>
      <div>
        <p>NadiyPro</p>
      </div>
      <div>
        <button>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEmElEQVR4nNWa34tVVRTHP3PVkWwmuhMOlpGFkZa+BOWPB9PJhyKCVBr1D8ifWdqDhOiDPxCGUYOCHuzBqBwHNaTQsqRI7ceTL/6iGTQritSKQR2hUdMjK74bNoc73X1+zb1+YcOdc/Zee61z9lrftdYZyI4JwEJgHfA+8C3QC/wK9AE3NPp0ze4d1dx1WmsyhhwtwBJgN3AeiHIaJstkLtYeheE5YC8wUEGBfUAH8ArQBjwGPASUgeEaZV2boDmLtGZfhQcyoL1sz9wwXUfBbfIv8JmUNoXzghloMj/XHm4/23taFsF3Ae8BtyTwIvAmcD/F4wHtdVF7mw7bpVMi3AN8JyH/ABuAZoYezcBG6RApkJhuQWgADmjhH8BUao9p0sV02i8dq2KhFlwGxlM/GA9ckW7zQxZ8o8lLqT8sk25fh0y+rMn3Un8oS7dLIZOjO8CQKGSym2ivsd6wPI0hV+rY2aOQBX6q8Ccwg/oKv1FSQw55hLixhoS4ySPEQ2kMGQZsq5CiWPpQixRlq3RKbIj/WuNJ4xdK5R/PUXmTZTK/rJI0pjbEwVLqPRXS+AvAJ0CnaonZUmqcwuUIDfv9sO7NltKdWuuefOQd5z2DpPGZDXEoq5boruCAWYbJ6lYqX86gX/KJgtUkC4C1wA4dhR+BX1TeXtfo0zW7d0Rz12ptkromSmpIoeVmSoxNY8ir1B9WpjGkP+dSNismKllMxeznVbPXGk8pOqZi9oNeR8NK3SZqg6UKFpFXuSYyZLiY/abHF6uBMQwtRioTXw+UsoTfKcAP3vUbqpst3j+aUclGla27gB7gqob97tK9xir6BRvi0CYWvhY7q78DH3sNulnAE2Jxx+yGUXqiDvOAnwKI8iww11v3bl6E2CJmtxTirwTMfVDdj5JSE3f9OPC6jL9bY5JC7QlvXofWNujBZTbER4M6hO1Kt3cCh3U0/hab31L60ao1nV4QWRJ7S3GU5B8DnjGE9raKZPZ5nhEzE6yb5RkzJ3SRM2QF+aLR8wl7E2nr9TOe39WE2ed7PvF/x2kwWFF1UjJeJgC+g5ozP0M+6JbM1zLIWCUZ5oupmH1zDszeK3kWndJikmRYMEnE7Fu9stMiz5oMnxVcKydLE6NZMkxW4vD7NPB9BWZfltCH8jSkPwuPzNRnsjiz/6ZkbouY/VngSeCRWNs1j6M12YtcqQ1xaJHCuwOZ/SWt69Lfxthp8YZkfJTkCIQQYknHq11NvA/1WaJHtYwx+9ux8HsiQ/g9JRm2X1UcLqjUbVQCmLZBvkJrzykQVcWCAkvduV5It7QjFG2eb75IgkTw0wJL3Q7PmOU6MoNhmN6EM8IaeaOTbNbkHbG8S92SZ0yktGOVyK5JY7Ic2/mEM8LNd5l08Jl+p8BSd47CaLWod07HabSXayU2BnHCkYJK3RFKAHeqA9mvUveMQmx7zLFbsxqDGs+7KjSxQ0rdBv2+T/fMeV+oUI+HIBdjfELsyqGJbef+LRVcZuSQGxPvALYrodyhf7M4DfzsNbEH9BnPjswx4CvgA/nc88CDKfZt9Yyx6HdHw4z5j1xvA+2OKElb0y0kAAAAAElFTkSuQmCC"
            alt="orders" /> <p>orders</p>
        </button>
        <button>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAErElEQVR4nO2ZaYyeUxTHf9PRjqKWWEpnpiaYqq2ICGJPRZEIQUIlEomILUhT4QMf0DTGlqCpRkXEGkXHEoqUD5Y0bVomlNAIQ4WozhidolHLyEn+Jzl5PO/6vG/vK+k/ucn73nvPec65957lngvbsR3/GxwHzAPeA74Cfgd+BQaBZ4GzaHEcDbwLjFXRngYm0oI4F/hDQm4A7tPK90jgnYCDgbnAiObZLi0G9qRFcEJQYiEwqcL804G1wN+i+QzYg8RoAz6WQA/USGs79IlonyIxZkqQ9cCOddD3yBnY7kwnIR6UIncW4PGoeNxOQnwgIezc14vzxeMtEuJ7CdFdgMfh4rGOhNgsIfYuwGMv8dgi55EEmyREVwEeO4jHP8A4EmG9hDioATtiu5sMb0uIMwrwmCYeP5AQD0mImwrwOE883iEhrmlAZL5XPO4mIW6WEJ8X4PFpnSlOQzEoIex41ItZ4jFEQmyRELsU4GGx40+533YSYUCKnF2Ax3Tx+JaEuENCfAFcVwf9xcBq8bBLVjLsLiXGdM2tFa+HGDKVxOjW+bbIPL4GuglKcewucgAtggGtrB2VanFJgZ1sGq6WUGuVBFbCRKXtRjObFsIE4EsJ9mQV6fgzmrsmZcZbCseHulUl2JwfgUNyxvbNqYNZ0NymqFYRU+JQ/Z6S2cFZOYrcGMbbRNMSirgSM4CNwHKgU323iIcVJa7X74c1tg+wTDRG23RFXilR3pkWLmGuhNMMA3eFy9oNwJn6/RPQp3jj85umjBcRvFn+tAiYrFvgAhW227T6rsSrWuVIOyKb6wwFDm/LVXFxBStVNmvCsaq8G/PHlW78Fa6wv2TKRqbMG+pbJs91rWLKZUBH4N2uktEK4FYlqJ5NPNIoBWzVlmj1jfH7IRM+IhSsPcZETFbBe0xKVIuFIcnctYjw4xXBV+R4FzNOMkbr7Z4cXk9ozOKKw+yoHxhVWwr05hQFzZ7qglXMb8uc2RE9IczR/63AaXpS8KPlzQzX3escHT+vi/UGJX7OWaCh4NVmB/tYJNfsvMuiTSs9HBhbBf4qYOcwry94Exfm/pCHeWKYFfKbwKNffa9J8K7gCOwIo2K521xsZWFn8M0w2bb15BJzx8kD+dx+fdSdgCvt45afnQjsFniM5hT8utVnwjuM11HARdUoYpNXatIG2UWlHGqSaFbq99zwIX9q8/+LdRmzJ7tylcsp6rMxxzGywZerUWSBJnwN7E/tsCz4u/AhP+PZI7FRSadhaXDJXVLiJfW9qDkdmUBaVpFeXZa2yo3WgwtKGLsFx1NkY+44LgzfHcoRcjg4hEtDn8WVc4D9SgnR14CA81hGGLvfl3K/8W2kU4a9SXbxXNhNw4ch8FaExwh7Wita8/K2LmNjR4ZHVLstVguvbm6Wuy6L6Gob2WaGoDoQgmG7jPcjHZ2YolimcIV2Yp5oXxDt6mBf/0FHk5SwtiqkJ4MhrVmV4wBmAAcCv2XG1ojG3+oPIzF6MsfPIvX8cJe/PMSJUdlTjPqmxKm0CKYqYD4fnu+ulKDz9Vo8plDgO9mvXSryANsUZO8TJ+UcSbORiCJPfdsM/hQXW4z+ufgX4ubmEBWgfpEAAAAASUVORK5CYII="
              alt="admin" /> <p>admin</p>
          </button>
          <button>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNklEQVR4nO3aMU4DMRCF4R8KWiRofRHEwWi3gcBNOEEaxAEoAhR0tCzXcGTJkdAqGzyJgt4MfpJLS/NpdtdrywBnwAPwDWSRMQKLWltz7gUKnxt3FshYJ12hk+sfnWnORq+WbK2rQ46c3Dsiltw7IpabKB0pGQgCMaVDjphHYAmce+/Iqtb0YsEoQhLwWesqqAuvkL0wqpAp5vU3jDLEhFGHbMNc4hTShPECmWLephhPkJ0Yb5BZzCGQE+Bd4NhodSjktL547iFhHi2pz3B2BEm71hIvkBRhQUwt/1vqkNT6O68MSZY9iSokRdhYpShb3Y8ohw/PwFOE46C90iF/kCFCRwZrXaqQ3CFiyb0jYsn/tiNjnVAusqhdqvmyTFoIHOfMjVsLpFzuKphNZxRG6URBNF88WwOccZGxk5w4qAAAAABJRU5ErkJggg=="
              alt="logOut" />
            {/*<img alt={'logOut'} src={''} />*/}
          </button>
      </div>
    </div>

    <div>
      <Outlet />
    </div>
  </div>
)
};

export default OrdersLayout;