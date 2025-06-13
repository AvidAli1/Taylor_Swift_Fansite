import { Routes, Route, useSearchParams } from 'react-router-dom';
import Header from './components/header';
import Timeline from './components/timeline';
import Footer from './components/footer';
import Posts from './components/posts';
import Post_detail from './components/post_details';
import SearchResults from './components/search_results';
import CookiePolicy from './components/cookie_policy';
import PrivacyPolicy from './components/privacy_policy';
import CookieConsent from "react-cookie-consent";

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

function CookiePolicyPage() {
  return (
    <>
      <CookiePolicy />
    </>
  )
}

function PrivacyPolicyPage() {
  return (
    <>
      <PrivacyPolicy />
    </>
  )
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/post_details" element={<PostDetailPage />} />
        <Route path="/timeline" element={<HomePage />} />
        <Route path="/cookie_policy" element={<CookiePolicy />} />
        <Route path="/privacy_policy" element={<PrivacyPolicy />} />
      </Routes>
      <CookieConsent
        buttonText="Accept All Cookies"
        declineButtonText="Reject Non-Essential"
        enableDeclineButton
        cookieName="websiteCookieConsent"
        style={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "40px", // space from bottom
          background: "rgba(255, 255, 255, 0.7)", // translucent background for blur
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)", // Safari support
          color: "#6b7db3",
          fontSize: "14px",
          padding: "20px",
          border: "2px solid #ffcaca",
          borderRadius: "12px",
          maxWidth: "600px",
          width: "90%",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          zIndex: "9999",
        }}
        buttonStyle={{
          background: "#b91c1c",
          color: "white",
          fontSize: "13px",
          borderRadius: "6px",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
          fontWeight: "600"
        }}
        declineButtonStyle={{
          background: "#8a9ac7",
          color: "white",
          fontSize: "13px",
          borderRadius: "6px",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
          marginRight: "10px",
          fontWeight: "600"
        }}
        expires={365}
        onAccept={() => {
          console.log("Cookies accepted");
        }}
        onDecline={() => {
          console.log("Non-essential cookies declined");
        }}
      >
        🍪 We use cookies to improve your experience on our site. By continuing to browse, you agree to our use of cookies.
        <span style={{ fontSize: "12px", display: "block", marginTop: "8px" }}>
          <a href="/privacy_policy" style={{ color: "#b91c1c", textDecoration: "underline", fontWeight: "500" }}>
            Privacy Policy
          </a>
          {" | "}
          <a href="/cookie_policy" style={{ color: "#b91c1c", textDecoration: "underline", fontWeight: "500" }}>
            Cookie Policy
          </a>
        </span>
      </CookieConsent>
    </>
  );
}

export default App;