import Footer from '../components/Footer'
import CardList from '../components/CardList'
import NavBar from '../components/NavBar'

const MyList = () => {
  return (
    <div className="bg-zinc-900">
      <NavBar />
      <CardList nTitle="My List" />
      <CardList nTitle="Trending" />
      <CardList nTitle="Your Favorites" />
      <Footer />
    </div>
  )
}

export default MyList
