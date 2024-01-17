import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Icons from "../components/Icons";

// 判斷 Button 是否顯示的間隔：判斷兩次 scroll event 的發生時間間隔是否超過延遲時間
export const createThrottle = (callback, delay, thisArg) => {
  let lastInvokeTime = Date.now(); // 紀錄最後一次觸發時間
  const _delay = Number(delay) || 200;
  return (...args) => {
    const now = Date.now();
    // 判斷現在距離上次觸發時間是否小於延遲時間
    if (now - _delay <= lastInvokeTime) {
      return;
    }
    // 更新觸發時間
    lastInvokeTime = now;
    callback.call(thisArg, ...args);
  };
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const listener = createThrottle(() => {
      const shouldIsShow = window.scrollY > 300;
      shouldIsShow !== isShow && setIsShow(shouldIsShow);
    }, 500);
    document.addEventListener("scroll", listener);
    return () => document.removeEventListener("scroll", listener);
  }, [isShow]);

  return (
    <div
      className={`scroll-to-top fixed right-7 bottom-[5.9rem] lg:right-10 transition-opacity duration-300 rotate-45 p-1.5 rounded-sm bg-neutral-500 fill-white${
        isShow ? " cursor-pointer opacity-1" : " opacity-0"
      }`}
      onClick={() => isShow && window.scrollTo({ top: 0, behavior: "smooth" })}
      tabIndex={0}
    >
      <Icons.Upward className="w-6 h-6 -rotate-45" />
    </div>
  );
};

export default ScrollToTop;
