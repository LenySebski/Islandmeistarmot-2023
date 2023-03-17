import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./App";
import { UserContextProvider } from "./context/UserContext";
import "@fontsource/lato/900.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/100.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<UserContextProvider>
				<RouterProvider router={router} />
			</UserContextProvider>
			{import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
	</React.StrictMode>
);
