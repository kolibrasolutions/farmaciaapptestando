import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Após a montagem do componente, podemos renderizar com segurança
  // Isso evita problemas de hidratação no SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="theme-provider">
      {children}
    </div>
  );
}
