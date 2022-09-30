import LoadMore from "./LoadMore";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import InfiniteScroll from "./InfiniteScroll";
import Paginate from "./Paginate";

function App() {
  console.log("Henlo");
  return (
    <>
      <BrowserRouter>
        <div className="flex items-center gap-4 justify-around pt-14">
          <div className="text-blue-500 underline hover:text-blue-700 ">
            <Link to="/">/Load More</Link>
          </div>
          <div className="text-blue-500 underline hover:text-blue-700 ">
            <Link to="/infinite">/Infinite Scroll</Link>
          </div>
          <div className="text-blue-500 underline hover:text-blue-700 ">
            <Link to="/paginate">/Paginate</Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<LoadMore />} />
          <Route path="/infinite" element={<InfiniteScroll />} />
          <Route path="/paginate" element={<Paginate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
