import type { Metadata } from "next";
import "./global.css";

import Header from "@/components/Header";
import ContextProvider from "@/context";
import { headers } from "next/headers"; // added

export const metadata: Metadata = {
	title: "AppKit Example App",
	description: "Powered by Reown",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const headersObj = await headers();
	const cookies = headersObj.get("cookie");

	return (
		<html lang="en">
			<body>
				<Header />
				<ContextProvider cookies={cookies}>{children}</ContextProvider>
			</body>
		</html>
	);
}
