import routes from "./routes";

//res.locals.~~ 는 뷰에서 변수를 사용가능하게 해준다.
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};
//이 미들웨어는 코드 사이에 있기 때문에 next를 호출 해야한다.
//다음 함수로 넘어간다는 뜻
