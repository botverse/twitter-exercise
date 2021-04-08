import "./LoadScroller.css";
import { useEffect, useRef } from "react";
import { Spinner } from "reactstrap";

function LoadScroller({ loading, onScrolledTo, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!onScrolledTo) {
      return;
    }

    const onIntersection = (entries, observer) => {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          onScrolledTo();
          break;
        }
      }
    };
    const observerOptions = {
      //root: ref.current,
      rootMargin: '500px 0px 0px 0px',
      //threshold: 1.0
    }
    const observer = new IntersectionObserver(onIntersection, observerOptions);
    const spinner = ref.current;
    observer.observe(spinner);
    return () => {
      observer.disconnect(spinner);
    }

  }, [onScrolledTo]);

  return (
    <div ref={ref} className="load-scroller">
      {loading ? (
        <Spinner
          role="loading-spinner"
          className="loading-spinner"
          color="primary"
        />
      ) : null}
    </div>
  );
}

export default LoadScroller;
