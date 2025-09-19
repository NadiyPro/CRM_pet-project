import React, { useEffect, useState } from 'react';

export const ThemeComponent: React.FC  = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const theme_dark = localStorage.getItem('theme');
    if(theme_dark === 'dark'){
      setIsDark(true)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark? 'dark' : 'light')
  }, [isDark])

  const handleClick = () => {
    setIsDark(value => !value);
  }
  return(
    <div className={'divMainLayout__header__nav__panel'}>
      <button className={'divMainLayout__header__nav__panel__button'} type={'button'} onClick={handleClick}>
        {isDark ? <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACNUlEQVR4nO2ZvU4bQRRGx5btIsYyUqSEB3CDgAeAggew8gBRFKdIkQJR2bKCXGAjIURLR0NPQZIibVo/QjANTp2CxkCFxIlGuiuu1ljsenaxh+yRRrK01nfvN397Z9aYjIyMVABqwFBazfgG0OGBjvENoKcM9Ixv8AIMdOZmCgFlYA/YBvJpLWIgLzFsrLJz4kq4q3rzJKqJmDHyoh3QTVLc9gppmWA8ecu2STlAI0H9RpodNMnEmAFgUZL5BvwGRsA1MAC+A5+A6hMGTtKYokGgHPBRWi707A3wl6e5AlpAKYruswFsEo8+sGTmBZliR8Av6eFVoCJbsP3dlKmk+QO8Nb4AFMTIXWgkSsYngHrIRGsWPbkPHAOvp9SwI6EX9tjulBrABxX8wKETBmm8V6IEP1WBmw46LaVzllRytghrA1+ltcPFGHCpAq86xFpTOoO4eUwS1ckFXIb+c6OevXIwUFE6o7h5uBiwJUJAxcHAgtK5TsqAHbpd4FDa7iNT6EKJrjgYWFY6w7h5TI0Ua0ks4s9K50ciyUUMbKvKALsVFqbU+aJ0tpLPdHLgqrx8nEYBKAI70orJZxp9D7dlQd34BFCSQkybaE47nWaCLYWlJCa0JoJyekHKabvbvAc2zJya6BONe2B9lsnmHjv6yXRqhRb2JN5F1Z3Fob6qDvXncqC/lbfqT7meyT37oR7fr1V4ARdbXd+vFsteX+56f73+v37g6PluoOP7FKp5/Zk1I8P4wT8Ed//VakhLHgAAAABJRU5ErkJggg=="
            alt="sun" /> :
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADSElEQVR4nO2a24tNURzHlzSY8YZBM4YY8qIxI2EmmlyK5F3+AIlEeHPJbVJyiSSXv4A8yv3yINfE8EDMkY48ySWXGZrCR7/Oku04Z2bvtX97n73H/tSu02nt3/qu39rrt37rYkxGRkZGRkbFAa7KY/5XgFdA3qQdYCEwJuA7o4Ef9qk1aQRoAS4BTxze3c0fdpo0AVQBe23vCRsC9nwH8N3jAPm9KxVfAjABuMPfTPQZ8PIep5Xihy2TzMAItAIfikR3+Xw33Q4A5gKfS4g+EdBOrYz5EkNgR2KHADAP+FKm19Y62pQx/5vtJqkADcDbPj7bBY52kz8NUoj2xQGvmEkh7OcTnQgBB+mfUQMyFQamFwWqcgwxAxHgso/GV8wBwCCgG+iR39rGl+GfkaqV+9dY59FQp238RgAH9JsFRgHQ7tHQrml4CvAzgAPmq1UeTOc2j4Ytmob3EIzVapX71zgcyHk0dAE1mpsUQTiuUnGwxp8poeN0aCdQWOkF5Zla68rrqrdjfivwog8tOVtGyta7VLQCN8ZF0vKCJpnmXOkJWtkRx4o2DhQHXHOsqDMqBxQNgc024JXjuS3jPAQe4U5rJK3/V2ONDXjFnAKqwxp/HcIBZ9Va6c8JuaKer9Yw/DWEAyR5mqXSQn9aJdrrJkJAL+G4DwxWEVOJVBh4R3jWqYipxGIIeKnggG9As4ogf8vhbrXlMO7TYDEyVY0waQM4hh53JW83aQJYhS4X1FZpcQBMRZ97YTZOY4dwyVBfMaHFpAHgANEgs8P6uPIEZ4BmouUBMMckGeA20XMOaItA+9i4t8XD8hjYBIwPobfR2njqelZZKsuS6B03EixPAmvsvaPJklDJ4QswVGYT+98iSbltWe8W2XmjBTDT59FYUhCtTWoOEIDDpIcOow2Fz06idtKRI/wqdQd4Torek1xkCd9gogSYbZedSeNjbLtQwJKQW9TafIo9oQLaEjIc3sS1C10uJjysYONvOu35awIMAw7FnCdIXfsii/YuADN83CLT4CIwzSQVYClwS7nRcs5wHVhs0gLQBOx3uGPgJW9vkzeaNEMhWK4Ejtr7gDk7g/TaEyjZeeoErtiUe3nkCU1GRkZGhsn4Bb1KSQrVUQaOAAAAAElFTkSuQmCC"
            alt="moon" />
        }
        <p className={'divMainLayout__header__nav__panel__button__p'}>theme</p>
      </button>
    </div>
  )
}