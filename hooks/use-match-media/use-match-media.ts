import { useState, useLayoutEffect } from "react";

const QUERIES: Array<string> = [
	"(max-width: 1023px)",
	"(min-width: 1024px)",
	"(max-width: 767px)",
];

export const useMatchMedia = (): {
	[key: string]: boolean,
} => {
	const mediaQueryLists: MediaQueryList[] = typeof window !== 'undefined' ? QUERIES.map((query) => window?.matchMedia(query)) : [];

	const getValues = () => mediaQueryLists.map((list) => list.matches);

	const [values, setValues] = useState(getValues);

	useLayoutEffect(() => {
		const handler = () => setValues(getValues);

		mediaQueryLists.forEach((list) => list.addEventListener("change", handler));

		return () =>
			mediaQueryLists.forEach((list) =>
				list.removeEventListener("change", handler)
			);
	}, []);

	return ["isMobile", "isDesktop", "isTablet"].reduce(
		(acc, screen, index) => ({
			...acc,
			[screen]: values[index]
		}),
		{}
	);
};
