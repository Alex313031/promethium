import { ISettings } from '~/interfaces';
import { app } from 'electron';

export const DEFAULT_SEARCH_ENGINES = [
  {
    name: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q=%s',
    keywordsUrl: '',
    keyword: 'duckduckgo.com',
    icon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACT1BMVEUAAAD/gFXfWjbeWTPfWDTeWDTeWDPfYDXfWDPeWTT/bUngWDPfWTPfWDPjWTfeWTTjWzPeWTTeWDPkelzrnojvr53ywLLibEvxuKj77en66OPyvq/urJrrm4XgYj/ws6P88/HvsqHjdFbfYT/jclP65uHywrThaUjmgmf88e/rmoTlfmLxuKnxvK7tpZLibk/mhWruqZf88e7////3187haEfpk3v43NX88u/rmoPgZELywbPgY0H1zsP88/DmgWX43NT87+zgZ0XvsaDoj3bf5e7Gz+D2+PvW3em2wtjks6nwt6fN1eT9+ffgZUP0yr/5+vzv8vehsM3H0OHrnonywLNkfaxRbqL3+ftVcaSKncDxuqvurZuntdB+k7r+/v/eWjPmdinumx3wnxvlcyrojXT//vb/99P/87z2v1r0rRb8ywz90gr6xQ7ha0v//vj+5nP90w/90Qr1shXpgyXeWzP+42X90AvxphnzqRjypxnsjSLhZi/+42T3uRLuq5n//O/2uyL0rxbriSLsjiHwoRr7yg3iaC7niW/icFHiZy7zrBf5whD3uhLumR3jdlf66uXqlH3zxrrYXDTdWTPso4/d8da136bq9uX99fPeXDjcWTSkhzxquEa4dznlf2PB5LRlvEZmvUeHyXNuvlVouUh7qkKohTzmg2ffXjv+/fzG5rpas0ZkvEajiDz54NrQ68dftU1atEZit06npl+ApUKrgjvzx7vp9uV3xFy24Kj4/Pb55N/eWTXdeVfus6H77+v44Nr44Nn54tz76uYtKC1GAAAAEnRSTlMABkeVv9nzGJbxB4L0xy7jLfK6UobZAAACRklEQVQ4y4VT9XsTQRC9aKMEJsnFrb0kTbDSoUWKF5eixa24HO4Eihco7i6Lu7u35Q/jbu/2uLQfH/PTzs7bmdk3bzhOM4PRZLZYrRazyWjgOlqJzQ5en5/n/T4v2G0l7cIOpysQDIUj0VgsGgmHggGX01H03B1PJFOloFppKpkoc+uSdPII6UwWdJbNpAVPZ+29pzyXh67duvfo+ReSz5V71BwOt5CrAOhViYi9BQ1RkRPcSh/OeDovXVRVVfdB7NuvP0PE0nEnLeBK1Mj+gIFIbdBghsgkXHIRWyBJ+xuCqg0dxjpNBmwSf/ZgrewNxxEjR8nx0WPGshSpoN3AGSFE/z8Ox7MUE+oYHyEwciZvmDoTESdNpvEpU6tZirDXxJmnRei5HnH6jJkyYNbsOQwQ8Zk5iz9Kz3MR582nGRZgPSxsWLR4CUDUb+GsfIwClrIOli1fsXLValFc0yBRwVs1wFolvG79BlGyjZs2b5G54rtoJaCSAraK27bv2FnYpdzJJcw+pUlQiNwtNuqGKjfJvgl7KGDvPnF/4cDBQ41Nh9VvMqLgiNLE0ebCseNNJ042M6IkqlMUUKcATukqUKq1YcFpCjijkxUdljzuDPXPUoA8+nPn9eNmgoELePHSZbxy9dr1Gzep6NJlTr3k4BbeJnfu3rv/gJCHRZKTRPtIEi08fvKUkGeEPCfkRZFoFdnXZOHlK0Jev3n77j35UCx7dXFqP376/OUr4rfvP362Wxy2er9aWtvaWlt+d1y9/y/vv9f/DzYRmYvARwKBAAAAAElFTkSuQmCC',
  },
  {
    name: 'Google',
    url: 'https://www.google.com/search?q=%s',
    keywordsUrl: 'http://google.com/complete/search?client=chrome&q=%s',
    keyword: 'google.com',
    icon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACDVBMVEUAAAD+/v7+/v79/f39/f39/f39/f39/f3+/v7+/v79/f39/f39/f39/f3+/v7////9/f39/f39/f39/f3+/v7+/v79/f39/f3+/v7+/v79/f39/f3////+/v79/f3////9/f3+/v7+/v79/f39/f39/f3+/v7////9/f3+/v79/f39/f39/f3////9/f3////+/v7////85uT1pZ7wdGrsVUjqRjjqRTfsU0bvcmj1oZr85OL85+XxgXjqRDbqQzXxf3b3urXrSz7rTD/4v7r1p6DyioHuZVn0m5P3tK73ta/0m5TuZlryjob//v7rSj3tXFD5zMj5y8fsWEzzlIz0kG3vbGH+8vL+9fT+9t37uQfxdyD98O7934b7vAX1kxXrSTT3uLP8zUb5riH/+/v7whz801lChfS/1fv7vQf93H2lxfqfwfn80liqyPr8zkfkwi76/fve6v3B1/v934iztSE8qFCw3byox/rn8P7+9t/2vAmGsDM0qFNGsGLs9+/z9/5UkPVgmfaPx4JcuXXw+fL6/P93p/epyPrm9Oo+rFtMsmfC5cza7+BjsahChfH2+f634MJUtm6Nzp+q2rer27iV0qVkvHs1qFQ3oHdBiePD2Pyj2LE1pWA+jsq54cQ+rFw3qVab0rHn9et7xo82qVRnvn7X7t2h169swIJJsWU4qlZGsGNlvX3Y7t5rzgcKAAAAMXRSTlMADlqcy+367Fknn/f2nSUKjfz7iwkm1dIkMuvqMAuKD/UNV5nI+VYMmiOH09AI6CIvZ7+SkQAAAe5JREFUOMtjYIADRiZmFlY2NnYWZg5GBkzAycVtCAc8vHxo0vwCgoYoQEhYBFleVMwQA4hLIOQlpcBCRsYmpmbmFpZW1mCutAxcP1jextbOHgrsHGzAKqBmyILNd3SyRwLOLmBbIO4QALFd7VGBG9gWObD/QO53hAi7e3h6efsAGb5+EL+ALOECOc8fJB0QCHF/UHAIzCvMDAzyoPAJBcmHhcOEI+B+VVBkYAJSkVHR9vamMYZYgBIDM5CMjYuLT0jEJm+ozMACJJPi4uKSU7AqUGFgBZKpQAVpUJF0BMgABRYDG5DMBCrIwlSQDeSq4lOQA1bADrUiF1NBHtgKkCPzgQoKCpHdVgRSUAx2JMibJXFxpWXlyAoqQAoqwd7kAJJV1TW1tXX1CPmGRqB8E4ilxsDIA6Saa4GgpRUm39YOMqADFNTqDAy8QLqzC6Siuwci39vXD5RvnABkagBjk08IyJhYCwaTJk+ZOm36jNqZs9LTZwOF2TRBCUIYpGtOLQqYOw8UCIZakCSvDWLPX4CsYOEikJiOLiRRSkiDeIuXLIXLL1sOEtHThyVrGbAKw84VK1etXrhm7bR1YK6eASJjSIhjRrSOPnLWEpETQpVm09JFy50SzAoIaQUNTSz5W1FJWUVaVVVaRVlNHSEKACBb24XRQm7rAAAAAElFTkSuQmCC',
  },
  {
    name: 'Brave',
    url: 'https://search.brave.com/search?q=%s',
    keywordsUrl: '',
    keyword: 'brave.com',
    icon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAnFBMVEVHcEwXBgA3DQl/HBF5HBLeMCmwKBLXMyC6KQ3dMBLbMxjuOijgLgviKwHwOiryOyXwMAv5PST0LwnuLQD7QiXwLQD1LQD7LwjxNQr4Myf5OR/yPxf4OS3/Pyb/QivxTCj+SjD/VT7xXT35alL6d2L8iHb4loX5o5f7sKX0w73/zMb00s//1M754uH76+z18PT39ff/9fT8+vz///96nB6rAAAAFXRSTlMAAw0ZJDRIWGV2kKSuwcLT1e3v+/wkomRQAAABoklEQVR42nWT2WKCMBBFi6DgUpUlasUgCGGPIPz/v3WSkECV3hce7snMnUz4mkhT+pqVfnQGHfVZ/3BVOizeTG1pGvvbRPuludQm/vZ2+/nQVhv9IMDX6xmEk8Rj3ytyXXcniTX4OHq+6rzsurYpsuJJ7wi0HoAVAEHdcwHAVV0AWA3Awg5w1r9oTQVQFRVtMoQcOYsZBHHflyTEUd61+R1d4qJpHgiZKqNo8Moj0rXEzyhvgtBOU0ApEuSsQipSFAxQLSLKgaTu2uouUvoIWUMGA6bgRIlfEPKSg8/mdA05xYHfQ9+T8Nm11I+Fj45yCm0DAI4hZYqj8JRQNgJoo+7aZEDUsyaRxxo0/CLNcdMeACmPmREeMQXf1cdt7iWQ43Mqge/JvjcAhHVPSUiIHxcwo4wg14UDIOIwgzGfqf+4ILkqtS4MCoZlUfDVqsYQbJCSAQXUHyPIN4OFsq7NTuCOr0Xetj0QhJwE4Bh/n7XlDcRZAK6lvT38lT0FnJX0x9/O2I3Azpj7+xaWLQDH4hN+CoowQB2fL6KO/1NE19+O/wIwPEoAZi8ATQAAAABJRU5ErkJggg==',
  },
  {
    name: 'Bing',
    url: 'https://www.bing.com/search?q=%s',
    keywordsUrl: '',
    keyword: 'bing.com',
    icon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAANlBMVEUAfX3k8/MAiop7trYAgoL6//8AdXULhIT///+exMQ4l5ew0dFLoaG929v0+/vQ5+eVwsIcjo4kKiufAAAAZElEQVQYlY2QyQ6AMAhEpy0Fuqr//7NWo108OQcSHsMSICJEMoSWR8sLQNCCD/A/AEALYFMy3+wFQdWkg0aLNaoaMM3gbQaV3eVww9HKajL60KbqmJ61QrvXBPQ7WrCRp0vXB5xZ6wZZjwmZbQAAAABJRU5ErkJggg==',
  },
  {
    name: 'Yahoo!',
    url: 'https://search.yahoo.com/search?p=%s',
    keywordsUrl: '',
    keyword: 'yahoo.com',
    icon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAABnklEQVQokZWSPUyTYRSFn/t+rTX9EFp/SICwqIumMUwaJxdlYHAgBJwMCa5sLMaITizGARYSNTGROOAAokMHYggLBBIGCIHESBggwfJTQGgLL/3e61CxVWOa3ukO59xz7z1HOmWBSspUhAZCZREZdSfoGSQqprzCgQa945dHT5qef7mSVVdUCFQtapCICGBVAzSE1MUjibvngOSrrTDyixCoXm+P3u6Ipb7akcdbBlp6LzQ2nZ14nW7uugjsb+Qnh/fOSwiQTllQRZC3mgAeyWIO915vAA9l8Z0mgKEn68m+dEE8BIiQ0WD20+7N+/HWwUu5Hw6YGdu99zSmeeyh+9i3U316rRR8cKqx2nB/6lomHdicizeEu2X5zoua/e/5Dy+36ynsX/JWI7K2efxtJnP1lu/jrc5lE93Rtp56YH36eGUq550yim/1McPPNgr9WH9q6XPWHuj2ql2ZOjK/5/9lXN4qkE0HE0N7MbwH1fMGqvCkiC8hHKFdA41A8s2mjzEiNXj/Wiml4TtUZ3E+JiL/TcAfK1WJKRuWitP6EzoWnEvW4UekAAAAAElFTkSuQmCC',
  },
  {
    name: 'Ecosia',
    url: 'https://www.ecosia.org/search?q=%s',
    keywordsUrl: '',
    keyword: 'ecosia.org',
    icon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAylJREFUOI1Nk01sVFUYhp9z7r1zO1NK25ShtkxmSqE0VisWf0KbatkQ0USnEhPiwh+SGgkkLowQ6EKKWGgTNi4ICxtQMNFEMG1iMBqURKNMgtYwtKkUq20tFFoYxjudmc7ce+5xgdZ+2zfPu3m/R7Ds9P44oGOoYg9uoQ2IACaaG1jWMDJwDNNMiCODS4xYgg90gqFP4nk7/a1dyOZWCFffD527MDYMX5+CRecCwtr6X4lYgnEv6ujGLeKNwzjeON/+keTjiTBKCxrLVxBfH+Op2jD68+OIy0NTWKV14sgghu7uBJMPdHXjDrGnj/6fL1NMvc71tM25+QaigRlGnRzvX5tjau4W255/CSPtVIjZa+097U1nhD4Qh0VH03uexO2zdP+imSpGsKTHm2suEK89Q8EvI6dWEJJTmIEXWBs7idnzMixmn5Yo9yjtO/hLC1p/qCCjwqw0XJ4ovcGW8DdkvBqUH8IWPp6Oks0P8fdCAv+ZLvAKb0vcQhvNm/ny+gwNpkQIjRQeu+pPYwnNWKYJV5sAGMJDimrS6S/QjY+DKrZItFrtV0boqBxgQ/Aeed8iaqeIhS4hhKZ5ZRJLuBS1yW+ZjdhGDuVeRVeWAyIi0WitIWQoDj/4Hg+HZpnIV7MnOcBsPgZA0EzRO/4Wxye3c2pyF8l0C4YGwJdI4yZz09glLVhinptuGbZUjOVqmMnHsKXDuZmdjGZrcVSQT+ceQ5mPIu7eBpiWBEouyl+/Y1XVc7wz2o/jBZFoTOFTai6QV2Us+JqQ9JBocn6OhppnYeRHMAOJ+zPm04p3z8rTsw77hq8SswMoLVgXvIMpFFeyayiVLvOuxyt1EQ5tfgS644C5VuJrKK/az4l9vNpUz7FNDzFRcMn6HqPZKq4srEbrAr8XinSti3KorQX94UEwjU+QYvLfV34RDP8jQlWvsbufW8EKvhr/k5FUGuVrNlSUsW19HfW2RA/0IKaTCQi0ir7BZTJ1d4L291LI9PFkp2RTB6yqASnh3h0YuQTffwYloRN47BZHl8n0v87bQShwCwdRbgdaPQBCIEQKI/ATpr0XA0Tv0BLzDxefVnicNn0wAAAAAElFTkSuQmCC',
  },
  {
    name: 'Ekoru',
    url: 'https://www.ekoru.org/?ext=wexond&q=%s',
    keywordsUrl: 'http://ac.ekoru.org/?ext=wexond&q=%s',
    keyword: 'ekoru.org',
    icon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAABTVBMVEVHcEwGoc4fq68HodEirbQ/v78RmcxNsqIupbJOsVAZocIHntchqb0KoNgZqL0LoNk2r38HoNYaq71Ss0VVt1BZtEJUsj+fyjtuwGUXms8Poc0HnNMFpM8JotISoMgRn9UQn9EInNVdulhyuUIYqLMHp8p4vUAZo8mKxD4Gn9YNpcsGoNSMxj8Wq751uj8Fpdo0r3sFpNwsrotUtEiTyk1SsjtSskVQtWJItGmMxTyHxUgmsLAsqaI0q4kOmNQ9sG4yr4Jvu0krsakcpbRjuk6Dwz0KqMtBsm4Upr6AwkBCsW4NqMcurpM9sHaUyFhwvEdIsVSSylUwsKWizkqkzkBdt0lct0Iqrq5fuER/wT6Bwj8lrbNwwHC21UNPt4cPpMRIt49Zu38Up7szspglrKdEtHc8solGt5BavH5OuIB3xFqAxVMFp9hAsn9lv3FSuK/uAAAAaHRSTlMA/P6dPgQPCxUwIcYubZRWYLpdQthwTGn6GlGl9O6AOefX9SDzzpbvtqz54uCdRvjxyfuV2Thg9+166sJzeVmu3Mrw2tqi27Xz0W+p6aJdu4mYolKqrX+WyVqKgrEqx/bYvP///////rhNcOkAAAD4SURBVBiVJY9VQ8IAGAC/jSUrxpKUkO4uu7u7XQPq/3904r3dvR0AACGUKghSKQkkLFgS3612s9lG47HgwtPosKPSPfViw2D8QomoLFFhvpbE6HUjQAJXHqrsxPU8d4un9w8EaFm3wcnPuFiszs2adCJCw1HCXrWOQ3Z3hoZPy/Bl9+9nT+T1GZk9dI+PDD8oV/PHV+3mEs9Pc6FlaHx3nvURgNal8tM9P7TMB+xjPNK6L9S5mQttA2dk+tibrn+y9YwRWOUhwpgyTWAYQW+a8egKCxBNOLLSk+52HCRAEv4LziUsezCwLSQW+b/F15hUoZBKJ6k/+wXyrSm5N9MsrwAAAABJRU5ErkJggg==',
  },
  {
    name: 'Ask',
    url: 'https://www.ask.com/web?q=%s',
    keywordsUrl: '',
    keyword: 'ask.com',
    icon:
      'data:image/png;base64,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',
  },
  {
    name: 'Yandex',
    url: 'https://yandex.com/search/?text=%s',
    keywordsUrl: '',
    keyword: 'yandex.com',
    icon:
      'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAAAAAAsAAAAUwAAAF8AAABfAAAAXwAAAF8AAABfAAAAXwAAAF8AAABfAAAAXwAAADjBwcEAwcHBAMHBwQDBwcEAAAAAUbq6uurExMT/xMTE/8TExP/ExMT/xMTE/8TExP/ExMT/xMTE/8TExP9ubm6QAAAALcTExADExMQAxMTEAAAAAFrHx8f/x8fH/8fHx/+7u8j/AADS/wAA0v+wsMj/x8fH/8fHx//Hx8f/vr6+7h4eHmQAAAAQx8fHAMfHxwAAAABXy8vL/8vLy//Ly8v/v7/M/wAA2/8AANv/s7PN/8vLy//Ly8v/y8vL/8vLy/+kpKS6AAAAM8vLywDLy8sAAAAAU9DQ0P/Q0ND/0NDQ/8TE0f8AAOX/AADl/7i40v/Q0ND/0NDQ/9DQ0P/Q0ND/0NDQ/2VlZXsAAAAk0NDQAAAAAE/U1NT/1NTU/9TU1P/IyNb/AADw/wAA8P+7u9f/1NTU/9TU1P/U1NT/1NTU/9TU1P/JycnkDw8PUwAAAAcAAABL2dnZ/9nZ2f/Z2dn/np7i/wAA+f8AAPn/goLm/9nZ2f/Z2dn/2dnZ/9nZ2f/Z2dn/2dnZ/6ioqKYAAAAqAAAASOLi4v/i4uL/4uLi/0hI9v8AAP//BQX+/yAg+//f3+L/4uLi/+Li4v/i4uL/4uLi/+Li4v/g4OD7AAAARgAAAETx8fH/8fHx/9jZ8v8LD///HiL+/3h6+P8IDP//lJX3//Hx8f/x8fH/8fHx//Hx8f/x8fH/7+/v+wAAAEIAAABA9vb2//b29v+Ah/v/Ex///3N6+//Z2vf/FiL//ys2/v/r7Pb/9vb2//b29v/29vb/9vb2/8jIyKMAAAAkAAAAPPn5+f/09Pn/NEf+/yA0///Gy/r/+fn5/1hn/f8gNP//jpj8//n5+f/5+fn/+fn5//Dw8OMXFxdBAAAABgAAADj7+/v/tb/8/y5K//9GX///+/v7//v7+/+zvfz/Lkr//zhS///l6Pv/+/v7//v7+/+Tk5NnAAAAGfv7+wAAAAA1/f39/3OM/v85Xf//mqz+//39/f/9/f3/9vf9/0do//85Xf//fpX+//39/f/c3NysAAAAH/39/QD9/f0AAAAAMv7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v+VrP//QWn//0Fp///T3PrtPj4+PgAAAAn+/v4A/v7+AAAAACn39/fi////////////////////////////////////////////////tbW1cgAAABf///8A////AP///wAAAAAVAAAAKAAAAC4AAAAuAAAALgAAAC4AAAAuAAAALgAAAC4AAAAuAAAALgAAABv///8A////AP///wD///8AAA8AAAAHAAAAAwAAAAMAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAMAAAADAAAABwAAAA8AAA==',
  },
];

export const DEFAULT_SETTINGS: ISettings = {
  theme: 'promethium-dark',
  darkContents: true,
  shield: true,
  multrin: true,
  animations: true,
  bookmarksBar: true,
  suggestions: true,
  themeAuto: false,
  searchEngines: DEFAULT_SEARCH_ENGINES,
  searchEngine: 1,
  startupBehavior: {
    type: 'continue',
  },
  tab: {
    image: '',
    topSites: true,
    pinned: true,
  },
  warnOnQuit: false,
  version: 2,
  downloadsDialog: false,
  downloadsPath: app
    ? app.getPath('downloads')
    : process.type !== 'browser' && process.type !== 'renderer'
    ? require('@electron/remote').app.getPath('downloads')
    : app
    ? app.getPath('downloads')
    : '',
  doNotTrack: true,
  globalPrivacyControl: true,
  topBarVariant: 'default',
  defaultBrowser: false
};
