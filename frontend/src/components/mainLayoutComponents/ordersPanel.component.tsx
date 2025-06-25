import { useNavigate } from 'react-router-dom';
import '../../styles/styles.scss';

const OrdersPanelComponent = () => {
  const navigate = useNavigate();
  const goToOrders = () => {navigate('/orders')}
  return(
    <div className={'divMainLayout__header__nav__panel'}>
      <button className={'divMainLayout__header__nav__panel__button'} type={'button'} onClick={goToOrders}>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE0klEQVR4nNWa228VVRTGhxYhakssxEbReAmmlcsLiSg8KK19wBgT0VDxDwBroQg+GEPgwUtMmoommvigDxgFJCohGlSUaLz75IuosQYFDQSvabQ16QGUn1n127gzHnr2zJ45PX7J5Jwzs9fa65vZe93mJEkkgE7gTmAr8CzwIfA18D0wApzSMaJzdu0Djd0q2c5YOzIDmA30AS8CP1AcTJfpvMvmKJPACuBloFLFgL3AILAG6AY6gMuANmC6jjad69SYtZLZW+WGVDTXiiIJLNNScPgTeF1GdxQ4jxE0nW9oDgebe2mM4nOBZ4DTUvgTcD9wcVHGTzL3XM1lcyIbnjabsiqaBXwkJePAg0BraZaf3Y5W4CHZgBzJrFDhacBrEjwOXFe6xbVtWipbDPvMxhAhc4eG34F5SYMAmAeMyrY7QgTe1eC7kwYD0C/b3gkZbE/CcEHSYOAfF274LWQw/wMihAx26E8aDMC6PERGG3izEyLg42fg+rpYGu5+JxAi5HBAn+MKSlMVEB/2AuKBPESagceqpChzpyhF2SabshFJPdZ00vimUvn5BRo/XzrfmixpzE0klca/VCWN/xF4BRhSLdEjoy6XuzxHh32/Qtd6ZPSQZN2ddxjXXP9J46OJeNfbVEvsTm/ASJiu3Url2/Lal33gv+OtiFoNbAG2ayl8BXyn8vakjhGds2vva+wWyQbXNWQlUmq5mRPAJXmIrE8aDMDGPETGiixlYwFcbcliHiKoKbCsLpZObtM18o5nECLksF+fFZW6LXWxOgWri+Qs8CrXTESmK7L/pd92R+4DLkrqCGCmCqoHgKbc7he4FvjEI3hKdbP5+6sijZxhZSvwAjAM/KHDvu/StRmT2RdMxDvfrSh8IrWPjgF7vAZdF7BAUXwiskv+PLujnr7bgW+pjW+A2zy5p6KIpFqma5VC/EI49qtD06TUxOEz4B6RP1/HQrnag964Qcmajj3RRFJjp6lD2Kt0eyfwnpbGr4rmp5V+tEtmyHMiff5TSkOG93v53aDO1+5tlRnZtZwcieUZ5Lo8MitDhRwGYow+y8Z2e6Ivol4/5PZdLYFSIrs8kNsTTTnkm4HPpWNViIAP28w35DU+pddSdMOGCB2bpGNnyGDfy7j1/EhsZNebKsOCCB0LpWM4ZLAf2bd5Zad5ns15Xyt4rZzWyGaEYTRk8AS830uAj6tE9v6MBVGRRMYyE/HOL9drsnRkP6pk7lFF9huBxcCVftu1oKW1SDoO5SaSiuxr9OIyJLLfKjnLnQwbI4jcKx07siyBmgFRkbdDkd2aeM/rtcSwahmL7E+k3O/BCPf7hXT0hghYilF4qauAaAlgrgY5MCDZw+aIQgRWl1XqWhbrufSuDHLd3t68JcmQCL5aVqmrLNaRsbSjucZyGvBIWCPvwiyTtXhLrNBSV/vKkUFpxyYFuxYdi7Sx3Z5wJNz49qxr+smySl3LYpUA1sJhW072JLxcKxsZTbhYncEySl3rCa9SHWMdyDGVukZwh7zhmY1txkeRkZIe1daVrKWu9p19n6NrtnlvTtfjISiETCog7iqgiW3r/nEVXHPqTqZKB7BXCeV2/c3iS+CI18Su6DWeLZlPgbeB57TnbgIuzTFvu0dmXTSRqYTITATXvwHzEtkWJGytlgAAAABJRU5ErkJggg=="
          alt="orders" />
        <p className={'divMainLayout__header__nav__panel__button__p'}>orders</p>
      </button>
    </div>
  )
};

export default OrdersPanelComponent;