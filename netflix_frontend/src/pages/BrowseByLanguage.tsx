import NavBar from '../components/NavBar'
import CardList from '../components/CardList'
import Footer from '../components/Footer'

const BrowseByLanguage = () => {
  return (
    <div className="bg-zinc-900">
      <NavBar />
      <CardList nTitle="Browse by Language" />
      <CardList nTitle="Trending" />
      <CardList nTitle="Your Favorites" />
      <Footer />
    </div>
  )
}

export default BrowseByLanguage
