import React from "react";
import { Board } from "./components/board";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="board-container">
        <Board />
      </div>
    </QueryClientProvider>
  );
}

export default App;
