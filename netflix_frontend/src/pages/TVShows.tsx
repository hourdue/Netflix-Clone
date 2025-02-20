import CardList from "../components/CardList"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

const TVShows = () => {
  return (
    <div className="bg-zinc-900">
      <NavBar />
      <CardList nTitle="TV Shows" />
      <CardList nTitle="Trending" />
      <CardList nTitle="Your Favorites" />
      <Footer />
    </div>
  )
}

export default TVShows
