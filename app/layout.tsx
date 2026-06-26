import { PokedexFooter, PokedexHeader } from "./Composants/borders";
import { CallProvider } from "./context/Callcontext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body style={{ margin: 0, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden',background:"#07111f"  }}>
        <CallProvider>
          <PokedexHeader/>
            <main style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
              {children}
            </main>
          <PokedexFooter/>
        </CallProvider>
      </body>
    </html>
  );
}