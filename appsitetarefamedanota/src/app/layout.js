import './globals.css'; // Importar estilos globais

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <header>
          <h1>Meu App</h1>
        </header>
        <main>
          {children}
        </main>
        <footer>
          <p>&copy; homicideo doloso</p>
        </footer>
      </body>
    </html>
  );
}