import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IconArrowRight, IconEye, IconCalendar, IconStar } from '@tabler/icons-react';

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
      className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden hover:border-[#00d4b8] hover:shadow-lg transition group"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
    >
      {post.cover_image && (
        <div className="h-44 overflow-hidden">
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
          <span className="inline-block text-[10px] uppercase tracking-widest text-[#1e40af] bg-[#eff6ff] rounded-full px-2.5 py-0.5 mb-3 font-semibold">
            {post.expertise.name}
          </span>
        )}
        <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-[#1e40af] transition text-sm">
          {post.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-3 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <IconCalendar size={11} />
              {new Date(post.created_at).toLocaleDateString('fr-FR')}
            </span>
            <span className="flex items-center gap-1">
              <IconEye size={11} /> {post.views}
            </span>
          </div>
          <Link
            to={`/actualites/${post.slug}`}
            className="text-xs text-[#00b8a0] hover:text-[#007a6b] flex items-center gap-1 font-medium transition"
          >
            Lire <IconArrowRight size={11} />
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
        <div className="relative mb-4 overflow-hidden rounded-2xl aspect-[3/4] bg-[#f0fdfa]">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1e40af] to-[#00b8a0] flex items-center justify-center">
              <span className="text-4xl font-bold text-white/80">{member.name[0]}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
          <div className="absolute bottom-4 left-0 right-0 opacity-0 group-hover:opacity-100 transition duration-300 flex justify-center">
            <span
              className="text-xs text-white px-3 py-1 rounded-full"
              style={{ background: "linear-gradient(90deg, #00d4b8, #00b0f0)" }}
            >
              Voir le profil
            </span>
          </div>
        </div>
        <h3 className="font-semibold text-slate-900 group-hover:text-[#00b8a0] transition text-sm">{member.name}</h3>
        <p className="text-sm text-slate-500">{member.role}</p>
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
      whileHover={{ y: -5, scale: 1.01 }}
      className="bg-white rounded-2xl border border-[#e2e8f0] p-6 hover:border-[#00d4b8] hover:shadow-lg transition group cursor-pointer"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
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
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition"
          style={{ background: "#eff6ff" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#ccfbf1")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#eff6ff")}
        >
          <span className="text-xl">{expertise.icon}</span>
        </div>
        <h3 className="font-bold text-slate-900 mb-2 group-hover:text-[#1e40af] transition text-sm">{expertise.name}</h3>
        <p className="text-sm text-slate-500 line-clamp-3 mb-4">{expertise.summary}</p>
        <span className="inline-flex items-center gap-1 text-xs text-[#00b8a0] font-semibold hover:text-[#007a6b] transition">
          Découvrir <IconArrowRight size={11} />
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
      whileHover={{ y: -3, scale: 1.005 }}
      className="bg-white rounded-2xl border border-[#e2e8f0] p-5 hover:border-[#00d4b8] hover:shadow-md transition"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
    >
      <div className="flex items-center gap-3 mb-4">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={review.name}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
            style={{ background: "#f0fdfa", color: "#00b8a0" }}
          >
            {review.name[0]}
          </div>
        )}
        <div>
          <p className="font-semibold text-slate-900 text-sm">{review.name}</p>
          <p className="text-xs text-slate-400">
            {review.source} · {new Date(review.published_at).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <IconStar
            key={i}
            size={13}
            className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}
          />
        ))}
      </div>
      <p className="text-sm text-slate-600 italic line-clamp-4">"{review.content}"</p>
      {review.external_link && (
        <a
          href={review.external_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-xs text-[#00b8a0] hover:underline font-medium"
        >
          Voir l'avis original →
        </a>
      )}
    </motion.div>
  );
}
