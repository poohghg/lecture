// 기본적으로 서베에서 렌더링된어야한다.
// 하지만 서버에서는 window객체를 인지하지 못한다.
// 이때 다이나믹 임포트를 사용.
const NoSSR = () => {
  return <p>width:{window.innerWidth}</p>;
};

export default NoSSR;
