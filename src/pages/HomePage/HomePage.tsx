import shapes from '../../assets/shapes.svg';
import style from './style.module.css';
import { DonateButton, GithubButton } from '../../components';
import { useLang } from '../../hooks/useLang';

export function HomePage() {
  const { lang } = useLang();

  const translations = {
    h1: {
      ru: 'Бесплатный учебный REST API для работы с JSON',
      en: 'Free educational REST API for working with JSON',
    },
    p: {
      ru: 'Практика работы с JSON для вашего frontend’а',
      en: 'Practice working with JSON for your frontend',
    },
  };

  return (
    <section>
      <div className={style.container}>
        <div>
          <h1 className={style.title}>{translations.h1[lang]}</h1>
          <p className={style.subtitle}>{translations.p[lang]}</p>
          <div className={style.btns}>
            <GithubButton />
            <DonateButton />
          </div>
          <p className={style.powered}>Powered by <a href='https://react.dev/'>React</a></p>
        </div>
        <img src={shapes} alt="" />
        
      </div>
    </section>
  );
}
