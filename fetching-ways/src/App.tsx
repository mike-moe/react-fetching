import { useState, Suspense } from "react";
import "./App.css";
import Posts from "./api/posts";
function App() {
  const [search, setSearch] = useState<string>("");
  return (
    <>
      <header style={{ height: "150px" }}>
        <div>
          <h3>Fetching Ways</h3>
          <input
            value={search}
            type="text"
            placeholder="Search"
            style={{ width: "100%", padding: "10px" }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Posts search={search} />
      </Suspense>
    </>
  );
}

export default App;
