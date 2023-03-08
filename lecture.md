### next.js

#### SSR(Server Side Rendering)

![img](https://velog.velcdn.com/images%2Fjaewoneee%2Fpost%2Fc3c3138b-f876-458b-89ba-b704558b6dd2%2Fserver-side-rendering.png)

- 일부 블로그, 홈페이지 웹사이트, PHP/JAVA 서버 사이드 템플릿 엔진
- 예시 설명
- `완성된 HTML`
- 화면 깜빡임 있음, 초기 용량 작음
- 서버 부하 위험, 보안 유리
- SEO에 좋음
- **html은 요청시점에 생성된다.**

#### SSG(static site generation)

![img](https://velog.velcdn.com/images%2Fjaewoneee%2Fpost%2F6a1751f2-fb56-4751-bac6-04de30189f77%2Fstatic-generation.png)

- pre-rendering: 정적 html을 빌드 타임에 미리 만들어둔다 (SSR은 렌더링 타임에 생성)
- 서버 부하없음,HTML 캐시가능, SEO에 좋음
- 정적인 사이트에 사용
- **html은 빌드시 생선된다.각 요청에서 재사용된다.**

#### Next.js

Next.js의 장점은 각 페이지에 대한 렌더링 방식을 선택할 수 있다는거다.

![img](https://velog.velcdn.com/images%2Fjaewoneee%2Fpost%2F53360988-f9de-4b56-acca-bc8954f705cc%2Fper-page-basis.png)



- SSR, CSR, SSG의 장점만 고려하여 페이지를 자유롭게 routing/rendering 할 수 있도록 API를 제공함

  - SSR/SSG의 용량과 보안
  - CSR의 페이지 이동 속도, 깜빡임 없음
  - Next.js의 방향성

- pre-rendering -> JS disable: CRA vs Next.js

- Section 1: SSR/CSR/SSG, ISR(revalidate), next/link

  - getStaticProps(SSG)
  - getServerSideProps(SSR)
  - revalidate: Incremental Static Regeneration(ISR)
  - CSR

- `app` directory(현재 베타버전)

___

#### [Pre-rendering](https://nextjs.org/docs/basic-features/pages#pre-rendering)

기본적으로 next.js는 모든페이지를 프리렌더링한다. 이는 spa처럼 자바스크립트로 페이지를 생성하는것 대신 각 페이지에 대한 html을 사전에 생성한다.

- seo측면에서 유리
- 프리런데링은 성능적으로 조금 더 좋은 퍼모먼스를 가진다.

생성된 html은 해당 페이지에 필요한 최소한의 자바스크립트 코드로 되어있다.페이지가 브라우저에 의해 로드될때, 페이지의 자바스크립트 코드가 실행되고 페이지를 완벽히 인터렉티하게 만든다.

- 위과정이 **hydration**이다.

![img](https://velog.velcdn.com/images%2Fjaewoneee%2Fpost%2Fa86e0ea0-d242-472f-ad9b-a14794992d19%2Fpre-rendering.png)



Pre-rendering (Next.js 사용)

- Initial Load : 프리렌더링 된 HTML이 보여집니다.
- Hydration : 리액트 컴포넌트가 초기화되고 앱이 인터렉티브 상태가 됩니다.
- 만일 당신의 앱이 `<Link />`와 같은 인터렉티브한 컴포넌트를 가지고 있다면, 해당 요소는 JS가 로드된 후에 활성화됩니다.



No Pre-rendering (기본 리액트 앱)

- Initial Load : 앱이 렌더링되지 않습니다.
- Hydration : 리액트 컴포넌트가 초기화되고 앱이 인터렉티브 상태가 됩니다.

#### getStaticProps(SSG)

##### Static Generation with Data using 'getStaticProps'

`getStaticProps`는 페이지에서 (정적 사이트 생성)이라는 함수를 export하면 Next.js는 에서 반환된 소품을 사용하여 빌드시 이 페이지를 미리 렌더한다. 

빌드타임에 API를 한번만 불려온다면 SSG방식으로 사용가능하다.

사용시점

- 페이지를 렌더링하는데 필요한 데이터는 사용자 요청보다 앞서 **빌드 시간**에 사용된다.
- 데이터는 헤드리스 CMS에서 가져온다
- 페이지는 사전렌러딩 되어 매우 빠르다. 빌드 시점에 캐시 되어있다.

언제사용가능하나?

- getStaticProps는 페이지에서만 사용가능하다. 페이지가 아닌 파일에서는 사용 할 수 없다.
  - 이는 리액트는 페이지가 렌더링 되기 이전에 모든 필요한 데이터를 가지고 있어야 하기 때문이다.

- 페이지의 데이터가 자주 변경된다면 서버사이드 렌더링이나 프리렌더링을 하지말자!!

getStaticProps는 오직 서버에서만 작동한다.클라이언트에서는 사용되지 않고,브라우저를 위한 js번들에도 포함되지 않는다.

#### Incremental Static Regeneration(증분 정적 재생)

SSG로 생성된 페이지의 데이터를 실제 앱을 재배포하지않아도 주기적으로 업데이트 하는방식

- 이는 전체 사이트를 다시 빌드할 필요가 없다.
- revalidate로 정해진 시간후 프리렌더링된 페이지를 재생성한다.
- 하지만 만약 데이터가 변하지 않는다면 프리렌더링된 페이지를 재생성하지 않는다.



#### getServerSideProps(SSR)

getServerSideProps는 요청시에 호출되고, 파마메터는 요청에 대한 구체적인 변수를 포함한다.

- getServerSideProps는 요청시에 데이터를 가져와야 하는 페이지를 프리렌더링 할 때 사용한다.
- 서버 응답 시간([TTFB](https://web.dev/time-to-first-byte/))은 `getStaticProps`에 비해느리다.
- 서바가 요청을 요청에 대한 결과를 처리하고 페이지가 생성된다.
- 이는 CDN에 의해서 캐시에 저장되지 않는다.
- SSG보다 느리게 프리렌더링된다.
  - 이는 보안인증이 필요한곳
  - 로그인 처리로 유저정보?가 필요한곳에 사용 

```javascript
export async function getServerSideProps() {
  // 데이터가 처리 된후 프리렌더링 된다.
  // 데이터가 처리 되지 않는 상태이면 팬딩상태이다.
  const delayInSeconds = 3;
  const data = await new Promise((resolve) =>
    setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)
  );
  return {
    props: { data },
  };
}
```





### CSR

<img src="https://velog.velcdn.com/images%2Fjaewoneee%2Fpost%2F47f01281-ff8a-429e-981d-f1a44008f4c2%2FGroup%203.png" alt="img" style="zoom:50%;" />



데이터를 프리렌더링할 필요가 없을시 사용한다.

- 외부 데이터를 필요로 하지 않는 페이지의 일부분을 정적으로 생생(프리렌더링)한다.
- 페이지가 로드될 때, 클라이언트단의 자바스크립트를 사용하여 외부 데이터를 가져오고 나머지 부분을 구현한다.



#### Dynamic Routes

![img](https://velog.velcdn.com/images%2Fjaewoneee%2Fpost%2F07cde0a6-77a4-4559-a86a-e62e52b7e5e9%2FGroup%205.png)

```javascript
import Layout from '../../components/layout'

export default function Post() {
  return <Layout>...</Layout>
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}
```

ssg에서 페이지의 동적생성?

 `fallback` 에 대한 부분은 paths에서 리턴되지 않은 경로에 대해서 어떻게 처리할지를 정하는 것인데, 우선은 아래의 내용만 알고 넘어가도 무관하다.

- `false` : 404 를 전달하겠다.
- `true` : 404를 전달하지 않고, "fallback" 버전의 페이지를 첫 request에서 보여준 후, 페이지가 생성되고 나면 그 이후의 request부터는 생성된 페이지를 보여주겠다.
- `blocking` : 서버 사이드 렌더링을 통해 HTML이 생성되기 까지 기다리겠다.

#### LINK

link는 next.js에서 사용되는 라우터이다. link를 사용하면 spa처럼 페이지전환을 할 수 있다.

- 특이점은 link태그가 뷰포트에 보여졌을때 레이지한 페이지청크 파일의 다운이 시작된다.

#### useRouter

실제 페이지 이동시 사용

- 사용시 페이지를 프리패칭 하지않음.
- router.prefetch를 통해 페이지를 프리패칭 할 수 있음.



> #### 참조
>
> https://velog.io/@jaewoneee/NextJS-Next.JS-%EA%B3%B5%EC%8B%9D%EB%AC%B8%EC%84%9C-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-%EB%B2%88%EC%97%AD%ED%95%98%EB%A9%B0-%EA%B3%B5%EB%B6%80%ED%95%98%EA%B8%B0-2
>
> https://velog.io/@jwhan/nextjs-getStaticProps-getStaticPaths-getServerSideProps



#### next/img

next에서 사용하는 이미지를 static하게 import했다면 빌드타임에 이미지에 대한 정보를 가지고 있다.

만약에 동적이미지 소스를 사용한다면 반드시 넓이와 높이를 명시해야한다.

- 만약 이미지의 넓이와 높이를 알지 못한다면 fill속성을 사용해야한다.
- 이때 부모의 포지션 넓이 높이를 설정한다.

next이미지 컴퍼넌트의 사용 장점

- 자동으로 용량 최적화(webp로 자동 변환)
- lazy loading을 자동으로 적용
- 퀄리티 속성을 사용해서 이미지 최적화가능
- Placeholder bule를 통해 이미지를 다운로드하는동안 보여질 속성 사용가능











