import { MdArrowForward } from "@react-icons/all-files/md/MdArrowForward";
import Button from "./Button";

export default function Banner() {
  return (
    <section className="py-20 text-center bg-gradient-to-br from-blue-50 to-blue-100 shadow-inner mt-30">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-7xl font-extrabold text-blue-800 leading-tight mb-4">
          Welcome to the
          <span className="text-blue-600"> L*sha Framework App</span>
        </h1>
        {/* FIX ME: add spaces for texts ********* */}
        <p className="text-2xl text-gray-600 font-light max-w-2xl mx-auto">
          Unlock the power of
          <span className="font-medium text-blue-700">
            Linked Semantic Human Agents
          </span>
          a product from Politecnico di Milano.
        </p>
        <Button
          text="Get Started"
          icon={<MdArrowForward />}
          classes="text-white bg-blue-600 hover:bg-blue-700 font-bold"
        />
      </div>
    </section>
  );
}
