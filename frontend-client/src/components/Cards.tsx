import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Calendar, Star } from 'lucide-react';

// ─── CardPost ───────────────────────────────────────────────────────────────

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image?: string;
  views: number;
  created_at: string;
  expertise?: { name: string; slug: string };
  tags?: { id: number; name: string }[];
}

export function CardPost({ post }: { post: Post }) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      className="glass-card overflow-hidden hover:border-orange-500/30 transition group"
    >
      {post.cover_image && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.cover_image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
      )}
      <div className="p-5">
        {post.expertise && (
          <span className="inline-block text-[10px] uppercase tracking-widest text-orange-400 bg-orange-500/10 rounded-full px-2 py-0.5 mb-3">
            {post.expertise.name}
          </span>
        )}
        <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition">
          {post.title}
        </h3>
        <p className="text-sm text-white/60 line-clamp-3 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-white/40">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(post.created_at).toLocaleDateString('fr-FR')}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={12} /> {post.views}
            </span>
          </div>
          <Link
            to={`/actualites/${post.slug}`}
            className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 transition"
          >
            Lire <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ─── CardTeam ───────────────────────────────────────────────────────────────

interface TeamMember {
  id: number;
  name: string;
  role: string;
  photo?: string;
}

export function CardTeam({ member }: { member: TeamMember }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="group text-center">
      <Link to={`/equipe/${member.id}`}>
        <div className="relative mb-4 overflow-hidden rounded-2xl aspect-[3/4]">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-deep to-navy flex items-center justify-center">
              <span className="text-4xl font-bold text-orange-400">{member.name[0]}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
          <div className="absolute bottom-4 left-0 right-0 opacity-0 group-hover:opacity-100 transition duration-300 flex justify-center">
            <span className="text-xs bg-orange-500 text-white px-3 py-1 rounded-full">Voir le profil</span>
          </div>
        </div>
        <h3 className="font-semibold text-white group-hover:text-orange-400 transition">{member.name}</h3>
        <p className="text-sm text-white/60">{member.role}</p>
      </Link>
    </motion.div>
  );
}

// ─── CardExpertise ──────────────────────────────────────────────────────────

interface Expertise {
  id: number;
  name: string;
  slug: string;
  icon: string;
  summary: string;
  hero_image?: string;
}

export function CardExpertise({ expertise }: { expertise: Expertise }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card p-6 hover:border-orange-500/30 transition group cursor-pointer"
    >
      <Link to={`/expertises/${expertise.slug}`} className="block">
        {expertise.hero_image && (
          <div className="h-40 overflow-hidden rounded-xl mb-4">
            <img
              src={expertise.hero_image}
              alt={expertise.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>
        )}
        <div className="w-12 h-12 rounded-xl bg-orange-500/15 flex items-center justify-center mb-4 group-hover:bg-orange-500/25 transition">
          <span className="text-orange-400 text-xl">{expertise.icon}</span>
        </div>
        <h3 className="font-bold text-white mb-2 group-hover:text-orange-400 transition">{expertise.name}</h3>
        <p className="text-sm text-white/60 line-clamp-3 mb-4">{expertise.summary}</p>
        <span className="inline-flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 transition">
          Découvrir <ArrowRight size={12} />
        </span>
      </Link>
    </motion.div>
  );
}

// ─── CardReview ─────────────────────────────────────────────────────────────

interface Review {
  id: number;
  avatar?: string;
  name: string;
  rating: number;
  content: string;
  published_at: string;
  source: string;
  external_link?: string;
}

export function CardReview({ review }: { review: Review }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="glass-card p-5 hover:border-orange-500/30 transition"
    >
      <div className="flex items-center gap-3 mb-4">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={review.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold flex-shrink-0">
            {review.name[0]}
          </div>
        )}
        <div>
          <p className="font-semibold text-white text-sm">{review.name}</p>
          <p className="text-xs text-white/40">
            {review.source} · {new Date(review.published_at).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-white/20'}
          />
        ))}
      </div>
      <p className="text-sm text-white/70 italic line-clamp-4">"{review.content}"</p>
      {review.external_link && (
        <a
          href={review.external_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-xs text-orange-400 hover:underline"
        >
          Voir l'avis original →
        </a>
      )}
    </motion.div>
  );
}
