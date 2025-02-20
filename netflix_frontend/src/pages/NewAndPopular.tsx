import NavBar from "../components/NavBar";
import CardList from "../components/CardList";
import Footer from "../components/Footer";

const NewAndPopular = () => {
  return (
    <div className="bg-zinc-900">
      <NavBar />
      <CardList nTitle="New and Popular" />
      <CardList nTitle="Trending" />
      <CardList nTitle="Your Favorites" />
      <Footer />
    </div>
  )
}

export default NewAndPopular
