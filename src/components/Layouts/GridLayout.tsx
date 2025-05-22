// 📁 src/layouts/GridLayout.tsx
import React from "react";
import Header from "../partiels/Header/Header";
import Footer from "../partiels/Footer/Footer";
import "./GridLayout.css";

interface GridLayoutProps {
  showHeader?: boolean;
  showFooter?: boolean;
  children: React.ReactNode;
}

const GridLayout: React.FC<GridLayoutProps> = ({
  showHeader = true,
  showFooter = true,
  children,
}) => {
  return (
    <div className="grid-layout">
      {showHeader && (
        <header className="grid-header">
          <Header />
        </header>
      )}
    

      <main className="grid-main">
        {children}
      </main>

      {showFooter && (
        <footer className="grid-footer">
          <Footer />
        </footer>
      )}
    </div>
  );
};

export default GridLayout;
