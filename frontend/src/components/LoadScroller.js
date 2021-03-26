import "./LoadScroller.css";
import { useEffect, useRef } from "react";
import { Spinner } from "reactstrap";

function LoadScroller({ loading, onScrolledTo, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!onScrolledTo) {
      return;
    }
    const onScroll = (e) => {
      const cr = ref.current.getBoundingClientRect();
      if (cr.top <= window.innerHeight) {
        onScrolledTo(e);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
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
