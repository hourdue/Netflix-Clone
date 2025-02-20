import Footer from '../components/Footer'
import CardList from '../components/CardList'
import NavBar from '../components/NavBar'

const Movies = () => {
  return (
    <div className="bg-zinc-900">
      <NavBar />
      <CardList nTitle="Movies" />
      <CardList nTitle="Trending" />
      <CardList nTitle="Your Favorites" />
      <Footer />
    </div>
  )
}

export default Movies
