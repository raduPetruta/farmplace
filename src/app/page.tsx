import SearchBar from "./_components/searchbar";
import Categories from "./_components/categories";
import Footer from "./_components/footer";

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-col min-h-screen">
        <SearchBar />
        <Categories />
        {/* Add any other content */}
      </div>
    </main>
  );
}
