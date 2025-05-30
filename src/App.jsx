import { Routes, Route, useSearchParams } from 'react-router-dom';
import Header from './components/header';
import Timeline from './components/timeline';
import Footer from './components/footer';
import Posts from './components/posts';
import Post_detail from './components/post_details';
import SearchResults from './components/search_results';

function HomePage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <>
      <Header />
      {query ? <SearchResults /> : <Timeline />}
      <Footer />
    </>
  );
}

function PostsPage() {
  return (
    <>
      <Posts />
    </>
  )
};

function PostDetailPage() {
  return (
    <>
      <Post_detail />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/post_details" element={<PostDetailPage />} />
      <Route path="/timeline" element={<HomePage />} />
    </Routes>
  );
}

export default App;