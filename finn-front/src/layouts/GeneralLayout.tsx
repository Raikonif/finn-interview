import {Outlet} from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function GeneralLayout() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet/>
      </main>
      <Footer />
    </div>
  )
}
