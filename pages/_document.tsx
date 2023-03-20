import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      {/* xptmxm/dsa */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* 타이틀은 페이지내에서 공통사용하자 */}
        <title>next.js 시작하기</title>
        {/* <meta name="description" content=">next.js 시작하기" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
