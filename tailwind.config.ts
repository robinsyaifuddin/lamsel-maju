
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Custom color palette based on your specifications
				lamsel: {
					// Primary green variations
					'green-dark': '#1a503a',
					'green-light': '#9cd3bc',
					'green-50': '#f0f9f5',
					'green-100': '#d1f0e1',
					'green-200': '#a8e3c8',
					'green-300': '#7dd6af',
					'green-400': '#5ccc9a',
					'green-500': '#4fb584',
					'green-600': '#3d9b6d',
					'green-700': '#2d7a52',
					'green-800': '#1a503a',
					'green-900': '#0f3626',
					
					// Red accent
					'red': '#d82329',
					'red-50': '#fef2f2',
					'red-100': '#fee2e2',
					'red-200': '#fecaca',
					'red-300': '#fca5a5',
					'red-400': '#f87171',
					'red-500': '#ef4444',
					'red-600': '#dc2626',
					'red-700': '#d82329',
					'red-800': '#b91c1c',
					'red-900': '#991b1b',
					
					// Yellow accent
					'yellow': '#f0e814',
					'yellow-50': '#fefce8',
					'yellow-100': '#fef3c7',
					'yellow-200': '#fde68a',
					'yellow-300': '#fcd34d',
					'yellow-400': '#fbbf24',
					'yellow-500': '#f0e814',
					'yellow-600': '#d69e2e',
					'yellow-700': '#b7791f',
					'yellow-800': '#975a16',
					'yellow-900': '#744210',
					
					// Neutral tones for balance
					'neutral-50': '#fafafa',
					'neutral-100': '#f5f5f5',
					'neutral-200': '#e5e5e5',
					'neutral-300': '#d4d4d4',
					'neutral-400': '#a3a3a3',
					'neutral-500': '#737373',
					'neutral-600': '#525252',
					'neutral-700': '#404040',
					'neutral-800': '#262626',
					'neutral-900': '#171717',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out': {
					'0%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'pulse-slow': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.8'
					}
				},
				'slide-in': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(0)'
					}
				},
				'slide-in-bottom': {
					'0%': {
						transform: 'translateY(20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'slide-in-right': {
					'0%': {
						transform: 'translateX(20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'zoom-in': {
					'0%': {
						transform: 'scale(0.8)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'rotate-in': {
					'0%': {
						transform: 'rotate(-5deg) scale(0.9)',
						opacity: '0'
					},
					'100%': {
						transform: 'rotate(0) scale(1)',
						opacity: '1'
					}
				},
				'bounce-soft': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'scale-in': 'scale-in 0.5s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
				'slide-in': 'slide-in 0.5s ease-out',
				'slide-in-bottom': 'slide-in-bottom 0.5s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'zoom-in': 'zoom-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
				'rotate-in': 'rotate-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
				'bounce-soft': 'bounce-soft 2s ease-in-out infinite'
			},
			backgroundImage: {
				'hero-pattern': "url('/lovable-uploads/52981017-1492-4aa2-8101-27cb3682b072.png')",
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-primary': 'linear-gradient(135deg, #1a503a 0%, #9cd3bc 100%)',
				'gradient-accent': 'linear-gradient(135deg, #d82329 0%, #f0e814 100%)',
				'gradient-hero': 'linear-gradient(135deg, #1a503a 0%, #2d7a52 50%, #9cd3bc 100%)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
