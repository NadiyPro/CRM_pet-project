import { useNavigate } from 'react-router-dom';
import { TbDatabaseSearch } from "react-icons/tb";

const OrdersPanelComponent = () => {
  const navigate = useNavigate();
  const goToOrders = () => {navigate('/orders')}
  return(
    <div>
      <button type={'button'} onClick={goToOrders}>
        <div>
          <TbDatabaseSearch size={20} color={'white'} />
          {/*<img*/}
          {/*src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEmElEQVR4nNWa34tVVRTHP3PVkWwmuhMOlpGFkZa+BOWPB9PJhyKCVBr1D8ifWdqDhOiDPxCGUYOCHuzBqBwHNaTQsqRI7ceTL/6iGTQritSKQR2hUdMjK74bNoc73X1+zb1+YcOdc/Zee61z9lrftdYZyI4JwEJgHfA+8C3QC/wK9AE3NPp0ze4d1dx1WmsyhhwtwBJgN3AeiHIaJstkLtYeheE5YC8wUEGBfUAH8ArQBjwGPASUgeEaZV2boDmLtGZfhQcyoL1sz9wwXUfBbfIv8JmUNoXzghloMj/XHm4/23taFsF3Ae8BtyTwIvAmcD/F4wHtdVF7mw7bpVMi3AN8JyH/ABuAZoYezcBG6RApkJhuQWgADmjhH8BUao9p0sV02i8dq2KhFlwGxlM/GA9ckW7zQxZ8o8lLqT8sk25fh0y+rMn3Un8oS7dLIZOjO8CQKGSym2ivsd6wPI0hV+rY2aOQBX6q8Ccwg/oKv1FSQw55hLixhoS4ySPEQ2kMGQZsq5CiWPpQixRlq3RKbIj/WuNJ4xdK5R/PUXmTZTK/rJI0pjbEwVLqPRXS+AvAJ0CnaonZUmqcwuUIDfv9sO7NltKdWuuefOQd5z2DpPGZDXEoq5boruCAWYbJ6lYqX86gX/KJgtUkC4C1wA4dhR+BX1TeXtfo0zW7d0Rz12ptkromSmpIoeVmSoxNY8ir1B9WpjGkP+dSNismKllMxeznVbPXGk8pOqZi9oNeR8NK3SZqg6UKFpFXuSYyZLiY/abHF6uBMQwtRioTXw+UsoTfKcAP3vUbqpst3j+aUclGla27gB7gqob97tK9xir6BRvi0CYWvhY7q78DH3sNulnAE2Jxx+yGUXqiDvOAnwKI8iww11v3bl6E2CJmtxTirwTMfVDdj5JSE3f9OPC6jL9bY5JC7QlvXofWNujBZTbER4M6hO1Kt3cCh3U0/hab31L60ao1nV4QWRJ7S3GU5B8DnjGE9raKZPZ5nhEzE6yb5RkzJ3SRM2QF+aLR8wl7E2nr9TOe39WE2ed7PvF/x2kwWFF1UjJeJgC+g5ozP0M+6JbM1zLIWCUZ5oupmH1zDszeK3kWndJikmRYMEnE7Fu9stMiz5oMnxVcKydLE6NZMkxW4vD7NPB9BWZfltCH8jSkPwuPzNRnsjiz/6ZkbouY/VngSeCRWNs1j6M12YtcqQ1xaJHCuwOZ/SWt69Lfxthp8YZkfJTkCIQQYknHq11NvA/1WaJHtYwx+9ux8HsiQ/g9JRm2X1UcLqjUbVQCmLZBvkJrzykQVcWCAkvduV5It7QjFG2eb75IgkTw0wJL3Q7PmOU6MoNhmN6EM8IaeaOTbNbkHbG8S92SZ0yktGOVyK5JY7Ic2/mEM8LNd5l08Jl+p8BSd47CaLWod07HabSXayU2BnHCkYJK3RFKAHeqA9mvUveMQmx7zLFbsxqDGs+7KjSxQ0rdBv2+T/fMeV+oUI+HIBdjfELsyqGJbef+LRVcZuSQGxPvALYrodyhf7M4DfzsNbEH9BnPjswx4CvgA/nc88CDKfZt9Yyx6HdHw4z5j1xvA+2OKElb0y0kAAAAAElFTkSuQmCC"*/}
          {/*alt="orders" />*/}
          <p>orders</p>
        </div>
      </button>
    </div>
  )
};

export default OrdersPanelComponent;