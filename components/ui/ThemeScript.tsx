export default function ThemeScript() {
  const code = `
    (function() {
      try {
        var stored = localStorage.getItem('denzos-theme');
        if (stored === 'dark' || stored === 'light') {
          document.documentElement.setAttribute('data-theme', stored);
        } else {
          var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        }
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
