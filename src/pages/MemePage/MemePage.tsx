import { useEffect, useState } from 'react';
import style from './style.module.css';
import { httpGet } from 'shape-rq';
import { Copy } from '../../components';

type ApiInfo = {
  title: string;
  url: string;
  methods: { name: string }[];
};

type Meme = {
  id: number;
  title: string;
  image: string;
};

export function MemePage() {
  const [api, setApi] = useState<ApiInfo | null>(null);
  const [allowedMethods, setAllowedMethods] = useState<string[]>([]);
  const [memes, setMemes] = useState<Meme[]>([]);
  const METHODS = ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'] as const;
  const [hasRequested, setHasRequested] = useState(false);

  const fetchInfo = async () => {
    const res = await httpGet<ApiInfo>('PrivateAPI', '1', { cache: true });
    if (res) {
      setApi(res);
      setAllowedMethods(res.methods.map((met) => met.name));
    }
  };
  const getMeme = async () => {
    const res = await httpGet<{ data: Meme[] }>('MemeAPI', '', { cache: true });
    if (res) {
      setMemes(res.data);
    }
    setHasRequested(true);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <section>
      <div className={style.container}>
        <h1 className={style.title}>Мемы</h1>
        <div className={style.info}>
          {api ? (
            <>
              <div className={style.urlContainer}>
                <div className={style.url} onClick={() => navigator.clipboard.writeText(api?.url)}>
                  {api?.url}
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
                <button className={style.gimme} onClick={() => getMeme()}>
                  gimme
                </button>
              </div>
            </>
          ) : (
            <p>API недоступно</p>
          )}
        </div>
        <div className={style.memeContainer}>
          <div className={style.memeCardContainer}>
            {memes.map((meme) => (
              <div key={meme.id} className={style.memeCard}>
                <img src={meme.image} alt="" className={style.memeImg} />
                <div className={style.memeTitle}>{meme.title}</div>
              </div>
            ))}
          </div>
          {hasRequested && (
            <pre>
              <code>{JSON.stringify(memes, null, 2)}</code>
            </pre>
          )}
        </div>
      </div>
    </section>
  );
}
