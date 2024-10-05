import SearchBar from "./_components/searchbar";
import Categories from "./_components/categories";
import Footer from "./_components/footer";
import Posts from "./(pages)/posts/page";

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-col min-h-screen">
        <SearchBar />
        <Categories />
        <Posts/>
      </div>
    </main>
  );
}
