import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.css';
import { useLang } from '../../hooks/useLang';
import { Logo } from '../icons/Logo';
import { Theme } from '../icons/Theme';
import { Lang } from '../icons/lang';

export function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'dark',
  );
  const { lang, setLang } = useLang();

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <div className={style.links}>
          <Link to={'/'} className={style.logo}>
            <Logo />
          </Link>
          <div>
            <Link to={'/auth-api'}>AuthAPI</Link>
            <Link to={'/meme-api'}>MemeAPI</Link>
          </div>
        </div>
        <div className={style.actions}>
          <button onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}>
            <Theme />
          </button>
          <button onClick={() => setLang(lang == 'en' ? 'ru' : 'en')}>
            <Lang />
          </button>
        </div>
      </nav>
    </header>
  );
}
