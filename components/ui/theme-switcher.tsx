"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const themes = [
	{
		key: "light",
		icon: Sun,
		label: "Light theme",
	},
	{
		key: "dark",
		icon: Moon,
		label: "Dark theme",
	},
];

export type ThemeSwitcherProps = {
	className?: string;
};

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	const handleThemeClick = useCallback(
		(themeKey: "light" | "dark" | "system") => {
			setTheme(themeKey);
		},
		[setTheme],
	);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div
			className={cn(
				"relative isolate flex h-8 bg-background p-1 ring-1 ring-border w-fit",
				className,
			)}
		>
			{themes.map(({ key, icon: Icon, label }) => {
				const isActive = theme === key;

				return (
					<button
						aria-label={label}
						className="relative h-6 w-6"
						key={key}
						onClick={() => handleThemeClick(key as "light" | "dark" | "system")}
						type="button"
					>
						{isActive && key !== "system" && (
							<motion.div
								className="absolute inset-0 bg-secondary"
								layoutId="activeTheme"
								transition={{ type: "spring", duration: 0.5 }}
							/>
						)}
						<Icon
							className={cn(
								"relative z-10 m-auto h-4 w-4",
								isActive ? "text-foreground" : "text-muted-foreground",
							)}
						/>
					</button>
				);
			})}
		</div>
	);
};
