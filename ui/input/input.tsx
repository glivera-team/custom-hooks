import { useRef } from 'react';
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

export type InputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
> & {
	name: string;
	register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
};

export function Input({
	id,
	name,
	type,
	register,
	placeholder = 'Type something...',
	required,
}: InputProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { ref, ...rest } = register(name, {
		required: required ? `${name} field is required` : false,
	});

	return (
		<input
			id={id}
			type={type}
			placeholder={placeholder}
			className="w-full flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
			{...rest}
			ref={(e) => {
				ref(e);
				inputRef.current = e;
			}}
		/>
	);
}
