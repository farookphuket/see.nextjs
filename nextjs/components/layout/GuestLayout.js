import { Footer } from "./Footer";
import { useAuth } from "../../hooks/auth";
import { GuestNav } from "./GuestNav";

export const GuestLayout = ({ children }) => {
  const { user } = useAuth({ middleware: "guest", kickTo: "/" });

  return (
    <>
      <div className="wrapper">
        <header className="sticky top-0 z-50">
          <GuestNav></GuestNav>
        </header>

        <main className="min-h-screen">{children}</main>




        <Footer>
          <div>
            <h3 className="text-2xl">contact</h3>
            <ul>
              <li>
                <span>phone</span>
                <span className="ml-2">
                  {process.env.NEXT_PUBLIC_MY_PHONE_NUMBER}
                </span>
              </li>

              <li>
                <span>email</span>
                <span className="ml-2">
                  {process.env.NEXT_PUBLIC_MY_EMAIL}
                </span>
              </li>
            </ul>


          </div>
        </Footer>
      </div>
    </>
  );
};

export default GuestLayout;
