import { Outlet } from "react-router";
import ErrorBoundary from "./components/ErrorBoundary";
import CommonLayout from "./components/layout/CommonLayout";

function App() {
  return (
    <ErrorBoundary>
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </ErrorBoundary>
  );
}

export default App;
