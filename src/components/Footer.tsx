export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-6 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo com símbolos de código */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono text-sm">{"<"}</span>
            <span className="text-blue-400 font-mono font-bold">/</span>
            <span className="text-slate-400 font-mono text-sm">{">"}</span>
            <span className="text-slate-300 font-medium text-sm ml-2">
              GLEYBSON FERREIRA
            </span>
          </div>

          {/* Informações */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-500">
              &copy; {new Date().getFullYear()}
            </span>

            <a
              href="https://gleybsonferreiradev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-blue-400 transition-colors"
            >
              Portfólio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
