import { useState, useEffect } from "react";

interface MatchMediaValues {
	isMobile: boolean;
	isDesktop: boolean;
	isTablet: boolean;
}

const QUERIES: Array<string> = [
	"(max-width: 1023px)",
	"(min-width: 1024px) and (max-width: 1365px)",
	"(min-width: 1366px)",
];

const useMatchMedia = (): MatchMediaValues => {
	const mediaQueryLists: MediaQueryList[] = typeof window !== "undefined" ? QUERIES.map((query) => window?.matchMedia(query)) : [];

	const getValues = () => mediaQueryLists.map((list) => list.matches);

	const [values, setValues] = useState(getValues);

	useEffect(() => {
		const handler = () => setValues(getValues);

		mediaQueryLists.forEach((list) => list.addEventListener("change", handler));

		return () => {
			mediaQueryLists.forEach((list) => list.removeEventListener("change", handler));
		};
	}, []);

	return {
		isMobile: values[0],
		isDesktop: values[1],
		isTablet: values[2],
	};
};

export default useMatchMedia;
