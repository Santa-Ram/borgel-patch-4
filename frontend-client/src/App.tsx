import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const Team = lazy(() => import('./pages/Team'));
const TeamMember = lazy(() => import('./pages/TeamMember'));
const Posts = lazy(() => import('./pages/Posts'));
const PostDetail = lazy(() => import('./pages/PostDetail'));
const Expertises = lazy(() => import('./pages/Expertises'));
const ExpertiseDetail = lazy(() => import('./pages/ExpertiseDetail'));
const Honoraires = lazy(() => import('./pages/Honoraires'));
const Videos = lazy(() => import('./pages/Videos'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const FAQ   = lazy(() => import('./pages/FAQ'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-orange-500 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0d1435',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Login — no layout */}
          <Route path="/login" element={<Login />} />
          {/* Client pages */}
          <Route
            path="/"
            element={
              <ClientLayout>
                <Home />
              </ClientLayout>
            }
          />
          <Route
            path="/equipe"
            element={
              <ClientLayout>
                <Team />
              </ClientLayout>
            }
          />
          <Route
            path="/equipe/:id"
            element={
              <ClientLayout>
                <TeamMember />
              </ClientLayout>
            }
          />
          <Route
            path="/actualites"
            element={
              <ClientLayout>
                <Posts />
              </ClientLayout>
            }
          />
          <Route
            path="/actualites/:slug"
            element={
              <ClientLayout>
                <PostDetail />
              </ClientLayout>
            }
          />
          <Route
            path="/expertises"
            element={
              <ClientLayout>
                <Expertises />
              </ClientLayout>
            }
          />
          <Route
            path="/expertises/:slug"
            element={
              <ClientLayout>
                <ExpertiseDetail />
              </ClientLayout>
            }
          />
          <Route
            path="/honoraires"
            element={
              <ClientLayout>
                <Honoraires />
              </ClientLayout>
            }
          />
          <Route
            path="/videos"
            element={
              <ClientLayout>
                <Videos />
              </ClientLayout>
            }
          />
          <Route
            path="/avis"
            element={
              <ClientLayout>
                <Reviews />
              </ClientLayout>
            }
          />
          <Route
            path="/galerie"
            element={
              <ClientLayout>
                <Gallery />
              </ClientLayout>
            }
          />
          <Route
            path="/faq"
            element={
              <ClientLayout>
                <FAQ />
              </ClientLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <ClientLayout>
                <Contact />
              </ClientLayout>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
