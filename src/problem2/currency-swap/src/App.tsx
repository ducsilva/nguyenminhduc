import './App.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SwapForm } from './components';
const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <SwapForm />
      </div>
    </QueryClientProvider>
  );
}

export default App;
