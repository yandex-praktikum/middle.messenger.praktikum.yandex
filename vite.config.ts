import { defineConfig, Plugin } from 'vite'
import { resolve } from 'path'
import handlebars from 'vite-plugin-handlebars'

export default defineConfig({
	plugins: [
		handlebars({
			partialDirectory: resolve(__dirname, 'src/partials'),
			context: {
				login: {
					inputs: [
						{
							type: 'text',
							placeholder: 'Пользователь',
							name: 'login',
						},
						{
							type: 'password',
							placeholder: 'Пароль',
							name: 'password',
						},
					],
				},
				registration: [
					{
						type: 'text',
						placeholder: 'Почта',
						name: 'email',
					},
					{
						type: 'text',
						placeholder: 'Логин',
						name: 'login',
					},
					{
						type: 'text',
						placeholder: 'Имя',
						name: 'first_name',
					},
					{
						type: 'text',
						placeholder: 'Фамилия',
						name: 'second_name',
					},
					{
						type: 'text',
						placeholder: 'Телефон',
						name: 'phone',
					},
					{
						type: 'password',
						placeholder: 'Пароль',
						name: 'password',
					},
					{
						type: 'password',
						placeholder: 'Пароль(еще раз)',
						name: 'password',
					},
				],

				user: [
					{ field: 'Почта', name: 'email', value: 'london@gmail.com' },
					{ field: 'Логин', name: 'login', value: 'JLondon' },
					{ field: 'Имя', name: 'first_name', value: 'Jack' },
					{ field: 'Фамилия', name: 'second_name', value: 'London' },
					{ field: 'Имя в чате', name: 'display_name', value: 'JackLo' },
					{ field: 'Телефон', name: 'phone', value: '+7777777' },
				],
			},
		}) as unknown as Plugin,
	],

	build: {
		rollupOptions: {
			input: {
				index: resolve(__dirname, 'index.html'),
				login: resolve(__dirname, 'src/pages/login/login.html'),
				signup: resolve(__dirname, 'src/pages/signup/signup.html'),
				profile: resolve(__dirname, 'src/pages/profile/profile.html'),
				page404: resolve(__dirname, 'src/pages/404/error.html'),
				page500: resolve(__dirname, 'src/pages/500/error.html'),
			},
		},
	},
	server: {
		open: 'index.html',
	},
})
