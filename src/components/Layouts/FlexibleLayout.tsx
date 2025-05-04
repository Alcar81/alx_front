// 📁 src/layouts/FlexibleLayout.tsx
import React from "react";
import Header from "../partiels/Header/Header";
import Footer from "../partiels/Footer/Footer";
import "./FlexibleLayout.css";

interface FlexibleLayoutProps {
  showHeader?: boolean;
  showFooter?: boolean;
  children: React.ReactNode;
}

const FlexibleLayout: React.FC<FlexibleLayoutProps> = ({
  showHeader = true,
  showFooter = true,
  children,
}) => {
  return (
    <div className="layout">
      {showHeader && (
        <div className="header-layout">
          <Header />
        </div>
      )}

      <div className="content-layout">
        <div className="main-layout">
          <main className="main">
            <div className={showHeader ? "content-layout-with-header" : undefined}>
              {children}
            </div>
          </main>
        </div>

        {showFooter && (
        <div className="footer-layout">
          <Footer />
        </div>
        )}
      </div>  
    </div>
  );
};
export default FlexibleLayout;