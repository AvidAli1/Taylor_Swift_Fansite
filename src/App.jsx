import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Timeline from './components/timeline';
import Footer from './components/footer';
import Posts from './components/posts';
import Post_detail from './components/post_details';

function HomePage() {
  return (
    <>
      <Header />
      <Timeline />
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
    </Routes>
  );
}

export default App;