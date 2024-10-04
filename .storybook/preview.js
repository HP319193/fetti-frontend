import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import 'antd/dist/antd.compact.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: '',
      order: [
        'Getting Started',
        'Installation',
        'Basic',
        ['General', 'Navigation', 'Data Entry']
      ],
      locales: ''
    },
  },
}