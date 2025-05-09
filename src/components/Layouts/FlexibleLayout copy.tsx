// 📁 src/layouts/FlexibleLayout.tsx
import React from "react";
import Header from "../partiels/Header/Header";
import Footer from "../partiels/Footer/Footer";
import "./FlexibleLayout.css";
import "../../theme/styles/variables.css";

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
    <>
      <div className="layout">
        {showHeader && (          
          <div className="header-layout">
            <Header />
          </div>            
        )}

        <div className="content-layout"> 
          <div className="header-placeholder" />          
          <main className="main-wrapper">
            <div className="main-layout">            
                <div className={showHeader ? "content-layout-header" : undefined}>
                  {children}
                </div>
            </div>
          </main>

          {showFooter && (
          <div className="footer-layout">
            <Footer />
          </div>
          )}
        </div>  
      </div>
    </>
  );
}; 

export default FlexibleLayout;