import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebarLayout from './components/SidebarLayout';
import { ToastContainer } from './components/Alert';
import LoginAdmin from './pages/LoginAdmin';
import ContactsAdmin from './pages/ContactsAdmin';

const Dashboard      = lazy(() => import('./pages/Dashboard'));
const PostsAdmin     = lazy(() => import('./pages/PostsAdmin'));
const TeamAdmin      = lazy(() => import('./pages/TeamAdmin'));
const ReviewsAdmin   = lazy(() => import('./pages/ReviewsAdmin'));
const VideosAdmin    = lazy(() => import('./pages/VideosAdmin'));
const NewsletterAdmin= lazy(() => import('./pages/NewsletterAdmin'));
const GalleryAdmin   = lazy(() => import('./pages/GalleryAdmin'));
const FaqAdmin       = lazy(() => import('./pages/FaqAdmin'));
const MediaAdmin     = lazy(() => import('./pages/MediaAdmin'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex gap-1.5">
        {[0,1,2].map(i=>(
          <div key={i} className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{animationDelay:`${i*0.15}s`}}/>
        ))}
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!localStorage.getItem('access_token')) return <Navigate to="/login" replace/>;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <Routes>
        <Route path="/login" element={<LoginAdmin/>}/>
        <Route path="/*" element={
          <ProtectedRoute>
            <AdminSidebarLayout>
              <Suspense fallback={<PageLoader/>}>
                <Routes>
                  <Route index                    element={<Dashboard/>}/>
                  <Route path="posts"             element={<PostsAdmin/>}/>
                  <Route path="team"              element={<TeamAdmin/>}/>
                  <Route path="contacts"          element={<ContactsAdmin/>}/>
                  <Route path="contacts/archives" element={<ContactsAdmin archived={true}/>}/>
                  <Route path="reviews"           element={<ReviewsAdmin/>}/>
                  <Route path="videos"            element={<VideosAdmin/>}/>
                  <Route path="newsletter"        element={<NewsletterAdmin/>}/>
                  <Route path="gallery"           element={<GalleryAdmin/>}/>
                  <Route path="faq"              element={<FaqAdmin/>}/>
                  <Route path="media"             element={<MediaAdmin/>}/>
                  <Route path="*"                 element={<Navigate to="/" replace/>}/>
                </Routes>
              </Suspense>
            </AdminSidebarLayout>
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}
