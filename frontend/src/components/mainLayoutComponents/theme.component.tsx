import React, { useEffect, useState } from 'react';

export const ThemeComponent: React.FC  = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const theme_dark = localStorage.getItem('theme');
    if(theme_dark === 'dark'){
      setIsDark(true)
    }
  }, []) // при завантаженні сторінки зчитуємо тему з localStorage (orders та admin)

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark? 'dark' : 'light')
  }, [isDark]) // додаємо/знімаємо клас 'dark' у body та записуємо/оновлюємо значення в localStorage

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
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADjElEQVR4nO2ZSWyNURiGj6IsjBU10xBKWRJE1LwQU7ARYlpItEWiWAjCho3YlJhiSEiIBVKJIUEIEpoYSmJWImrWmufhkaNv47RR979T77lJ39W9//m+77zn/Od8029MHergJ4A0YDFwFzhpkg1Aa2Az8Im/KDbJAqAeMAN4SVX8AoaZJHoLpxzydjGX9XuLSQYAWUCJs/vrgQ7AM+AzkG58B5ANvNEiyoAxep6rZ1uN7wB6AeUifAPIcMYu6nmW8RlAW+CByF63/6st0OK2SQLvdEpk7wNtqo3P11iB8RnAHBH9AvT9x/g+jU8yvgJoB7wW0bwaZIo13s/4CmCjSNrLnFKDzGPJdDI+AmgJfFCsGPwfufdaSBPjI4AlIngihNwLyfkZCIE7IjgloFwv4xuAzk70bhRC9ohkxxvfAMwUuQMBZNdJdqXxDcBOkVsUQHaCZE8b3wAUidzgALItgK/Ad+8uPBUpuUX3gPIHJb/Q+ATgo4ilBZQfK/mHQEPjC4AfItYgjMTymnRyjS8A3olU0zB0xkunvHqGnDAApSLVMUy9Q9I7WlNuVqsAzonQkAiy5UpHsSZ+DAMC2CEyORHojgC+BY1DcQWQIyJ7ItSfCvyUjdUJO2ZApkg8jZSEFmMDpcWxWDsAKjo6V4DjJmBWOzKKyYY7d8ZWmnlAaqT2nEbINtVJoZsewIpojle1iQtlqzJo5of7hoA+wHb1Dlzkh1Ls6ORQXaNZjOyNA646BKzdM8AqYKI6mOnK3ToBA4DJwAZ1+HGO+yX9thVsiyCT21dosSvahTgZwBhbHvxjZ0OhCJir9uwrPdsQdOIM5V32PGbHYjGO7WZ6S2uBw8At4LnuUqm6M3uBeUBPR2+T0zhvFc6Ey6R4D2huEggqktPKSz4rXOVU4IKU9ycqJgBdnR7bCXtMIzGSofrdYn1cmP5//vY6eujit4rGWH95iT+XrLbeDNBGjXOLt0DvWBgd7RRdB+N9Z6jYPBt3kKcaGEvjg5xjVhJrb6Y5UoAFTopj58k0cZioi+MArBfZDXSLke2hzvdIi5NxLdRsbQ4sdY7ad/n9UUD9MG01BqbZlpKzgDJgdkTeKYqu5FbnGKDAtlffFocp5fiTSliPo+x6iPrLhY5bRWV2QcLKZaUOy202SmS4aQuxRAfdKgB6KC+yudpZ4JGz6/YzxBPgvLLZ6XYTqlqoQx2Mb/gNmU1H6MuRGbYAAAAASUVORK5CYII="
            alt="do-not-disturb-2" />
        }
        <p className={'divMainLayout__header__nav__panel__button__p'}>theme</p>
      </button>
    </div>
  )
}