
import { Footer } from "flowbite-react";
import { px } from "framer-motion";

export function FooterComponent() {
  return (
    <Footer container className="bg-black rounded-none">
      <div className="w-full bg-black text-white text-center">
        <div className="bg-black text-white justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="/"
            src="./123.png"
            alt=".ocaz Logo"
            name=".ocaz"
            color="white"
          />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="https://www.linkedin.com/in/anshul-kardam-057841302/">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by=".ocaz™" year={2024} />
      </div>
    </Footer>
  );
}
