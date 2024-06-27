import Footer from '../components/layout/footer';
import '../globals.css'


export default function RootLayout({ children }) {
  return (
        <div id="root" className="flex flex-col min-h-screen">
          <div className="main-content flex-grow">
            {children}
          </div>
            <Footer />
        </div>
  );
}
