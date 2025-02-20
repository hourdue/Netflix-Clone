import NavBar from "../components/NavBar";
import CardList from "../components/CardList";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-zinc-900 hide-horizontal-scrollbar">
      <NavBar />
      <CardList nTitle="Home" />
      <CardList nTitle="Trending" />
      <CardList nTitle="Your Favorites" />
      <Footer />
    </div>
  );
};

export default Home;
