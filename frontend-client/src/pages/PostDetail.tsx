import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Calendar, Eye, ArrowLeft, Tag } from 'lucide-react';
import { postsAPI } from '../api/client';

const demoPost = {
  id: 1,
  title: 'Nouvelles règles d\'indemnisation en 2025',
  slug: 'indemnisation-2025',
  content: `<h2>Introduction</h2><p>Les règles d'indemnisation des victimes d'accidents de la route ont connu des évolutions significatives en 2025. Voici ce que vous devez savoir pour faire valoir vos droits dans les meilleures conditions.</p><h2>Les nouveaux barèmes</h2><p>Le barème indicatif de la Gazette du Palais a été mis à jour pour mieux refléter les préjudices réels subis par les victimes. Ces nouvelles valeurs permettent une meilleure prise en compte du pretium doloris et du préjudice d'agrément.</p><h2>Vos droits</h2><p>En tant que victime, vous avez le droit à une indemnisation complète de tous vos préjudices : corporels, matériels et moraux. Il est essentiel de vous faire accompagner par un avocat spécialisé pour ne pas sous-évaluer votre dommage.</p>`,
  excerpt: 'Les changements importants concernant l\'indemnisation des victimes.',
  views: 234,
  created_at: '2025-01-15',
  tags: [{ id: 1, name: 'Indemnisation' }, { id: 2, name: 'Accidents' }],
};

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    postsAPI.detail(slug)
      .then((res) => setPost(res.data))
      .catch(() => setPost(demoPost))
      .finally(() => setLoading(false));
  }, [slug]);

  const p = post || demoPost;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="glass-card animate-pulse w-full max-w-3xl h-96 rounded-3xl" /></div>;
  }

  return (
    <>
      <Helmet>
        <title>{p.title} — Borgel & Associés</title>
        <meta name="description" content={p.excerpt} />
      </Helmet>

      <div className="min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/actualites" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition">
            <ArrowLeft size={16} /> Retour aux actualités
          </Link>

          {p.cover_image && (
            <div className="h-80 overflow-hidden rounded-3xl mb-8">
              <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover" />
            </div>
          )}

          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap gap-2 mb-4">
              {p.tags?.map((tag: any) => (
                <span key={tag.id} className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-orange-400 bg-orange-500/10 rounded-full px-3 py-1">
                  <Tag size={10} /> {tag.name}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{p.title}</h1>

            <div className="flex items-center gap-4 text-sm text-white/40 mb-8">
              <span className="flex items-center gap-1.5"><Calendar size={14} />{new Date(p.created_at).toLocaleDateString('fr-FR', { dateStyle: 'long' })}</span>
              <span className="flex items-center gap-1.5"><Eye size={14} />{p.views} vues</span>
            </div>

            <div
              className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed
                         prose-headings:text-white prose-headings:font-bold
                         prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                         prose-p:mb-5 prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: p.content }}
            />
          </motion.article>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-white/60 mb-4">Vous avez des questions sur votre situation ?</p>
            <Link to="/contact" className="btn-primary">Prendre rendez-vous</Link>
          </div>
        </div>
      </div>
    </>
  );
}
