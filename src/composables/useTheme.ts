import { ref, watch, onMounted } from 'vue';

const THEME_KEY = 'han-theme';
type Theme = 'light' | 'dark';

export function useTheme() {
  const theme = ref<Theme>('light');

  const applyTheme = (t: Theme) => {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(THEME_KEY, t);
  };

  const setTheme = (t: Theme) => {
    theme.value = t;
    applyTheme(t);
  };

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light');
  };

  onMounted(() => {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    if (saved) {
      setTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  });

  watch(theme, (t) => applyTheme(t));

  return {
    theme,
    setTheme,
    toggleTheme,
  };
}
