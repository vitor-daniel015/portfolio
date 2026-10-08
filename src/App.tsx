import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const Portfolio = lazy(() =>
  import("./components/Portfolio").then((module) => ({
    default: module.Portfolio,
  })),
);
const AllWork = lazy(() =>
  import("./components/AllWork").then((module) => ({
    default: module.AllWork,
  })),
);
const Linktree = lazy(() =>
  import("./components/Linktree").then((module) => ({
    default: module.Linktree,
  })),
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <p className="route-loading" role="status">
            Carregando portfólio…
          </p>
        }
      >
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/trabalhos" element={<AllWork />} />
          <Route path="/links" element={<Linktree />} />
          <Route path="/bio" element={<Linktree />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route
            path="/tech"
            element={<Navigate to="/portfolio#desenvolvimento" replace />}
          />
          <Route
            path="/audiovisual"
            element={<Navigate to="/portfolio#criacao" replace />}
          />
          <Route path="/admin" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
