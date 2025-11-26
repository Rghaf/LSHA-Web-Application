import Header from "./Header";

export default function Container({ children }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800">
      <Header />
      <main className="pt-24">{children}</main>
    </div>
  );
}
