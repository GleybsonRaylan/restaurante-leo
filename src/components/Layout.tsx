import { ReactNode } from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export default function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pb-24 md:pb-20">
        {" "}
        {/* Aumentei o padding-bottom */}
        {children}
        {showFooter && <Footer />}
      </main>
      <BottomNav />
    </div>
  );
}
