import { useEffect, useState } from 'react';
import style from './style.module.css';
import { httpGet, httpPost } from 'shape-rq';
import { Copy } from '../../components';
import { useLang } from '../../hooks/useLang';

type ApiInfo = {
  title: string;
  url: string;
  methods: { name: string }[];
};

type UserResponse = {
  message: string;
  data: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    tokens: {
      refresh: string;
      access: string;
    };
  };
  meta: {
    api: string;
  };
};

export function AuthPage() {
  const [api, setApi] = useState<ApiInfo | null>(null);
  const [allowedMethods, setAllowedMethods] = useState<string[]>([]);
  const [email, setEmail] = useState('user@public.ru');
  const [password, setPassword] = useState('asd123@!');
  const [response, setResponse] = useState<UserResponse | null | { access: string }>();
  const [hasRequested, setHasRequested] = useState(false);
  const [token, setToken] = useState<string>();
  const METHODS = ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'] as const;
  const { lang } = useLang();

  const translations = {
    email: {
      ru: 'Почта',
      en: 'Email',
    },
    password: {
      ru: 'Пароль',
      en: 'Password',
    },
    signup: {
      ru: 'Зарегистрироваться',
      en: 'Signup',
    },
    getToken: {
      ru: 'Получить токен',
      en: 'Get a token',
    },
    refreshToken: {
      ru: 'Обновить токен',
      en: 'Update the token',
    },
  };

  const fetchInfo = async () => {
    const res = await httpGet<ApiInfo>('PrivateAPI', '2', { cache: true });
    if (res) {
      setApi(res);
      setAllowedMethods(res.methods.map((met) => met.name));
    }
  };

  const signup = async () => {
    const res = await httpPost<UserResponse>('AuthAPI', 'signup', {
      body: { email: email, password: password },
      xsrf: false,
    });
    setResponse(res);
    setHasRequested(true);
  };

  const getToken = async () => {
    const res = await httpPost<{ access: string; refresh: string }>('AuthAPI', 'token', {
      body: { email: email, password: password },
      xsrf: false,
    });
    if (res) {
      setToken(res?.refresh);
    }
    setResponse(res);
    setHasRequested(true);
  };

  const refreshToken = async () => {
    const res = await httpPost<UserResponse>('AuthAPI', 'token/refresh', {
      body: { refresh: token },
      xsrf: false,
    });
    setHasRequested(true);
    setResponse(res);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <section>
      <div className={style.container}>
        <h1 className={style.title}>AuthAPI</h1>
        <div className={style.info}>
          {api ? (
            <>
              <div className={style.urlContainer}>
                <div className={style.url} onClick={() => navigator.clipboard.writeText(api?.url)}>
                  {api?.url}
                  <Copy />
                </div>
                <div
                  className={style.url}
                  onClick={() =>
                    navigator.clipboard.writeText('http://127.0.0.1:8000/public/auth/token')
                  }>
                  http://127.0.0.1:8000/public/auth/token
                  <Copy />
                </div>
                <div
                  className={style.url}
                  onClick={() =>
                    navigator.clipboard.writeText('http://127.0.0.1:8000/public/auth/refressh')
                  }>
                  http://127.0.0.1:8000/public/auth/refressh
                  <Copy />
                </div>
              </div>
              <div className={style.methods}>
                {METHODS.map((method) => (
                  <div
                    key={method}
                    className={allowedMethods.includes(method) ? style.allowed : style.denied}>
                    {method}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>API недоступно</p>
          )}
        </div>
        <form action="">
          <label htmlFor="email">
            {translations.email[lang]}:
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            {translations.password[lang]}:
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </label>
          <div className={style.btns}>
            <button type="button" className={style.btn} onClick={() => signup()}>
              {translations.signup[lang]}
            </button>
            <button type="button" className={style.btn} onClick={() => getToken()}>
              {translations.getToken[lang]}
            </button>
            <button type="button" className={style.btn} onClick={() => refreshToken()}>
              {translations.refreshToken[lang]}
            </button>
          </div>
        </form>
        <div className={style.response}>
          {hasRequested && (
            <pre>
              <code>{JSON.stringify(response, null, 2)}</code>
            </pre>
          )}
        </div>
      </div>
    </section>
  );
}
