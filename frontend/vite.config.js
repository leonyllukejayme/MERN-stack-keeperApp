import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		server: {
			host: '127.0.0.1',
			proxy: {
				'/api': env.VITE_PROXY || 'http://localhost:8080',
			},
		},
		plugins: [react()],
	};
});







// export default ({mode}) => {
//   process.env = {...process.env, ...loadEnv(mode,process.cwd())}

//   return defineConfig({
//     server: {
//       host:'127.0.0.1',
//       proxy:{
//         '/api': process.env.VITE_PROXY || 'http://localhost:8080'
//       }
//     },
//     plugins: [react()],
//   })
// }
