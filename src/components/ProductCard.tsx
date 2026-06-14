import { Link } from "../lib/router";
import { money, typeLabel } from "../lib/data";
import type { Product } from "../lib/types";
import { Stars, Badge } from "./ui";
import { TypeIcon } from "./Icons";

export default function ProductCard({
  product,
  external,
}: {
  product: Product;
  external?: boolean;
}) {
  const href = product.creator?.username
    ? `/@${product.creator.username}/${product.slug}`
    : `/product/${product.id}`;

  const cls =
    "group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/40";

  const Wrapper = external
    ? ({ children }: { children: React.ReactNode }) => (
        <a href={href} target="_blank" rel="noopener" className={cls}>
          {children}
        </a>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <Link to={href} className={cls}>
          {children}
        </Link>
      );

  const isFree = Number(product.price) === 0;

  return (
    <Wrapper>
      {/* Image container — fixed aspect ratio, never overflows */}
      <div className="relative w-full overflow-hidden bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-slate-800 dark:to-slate-700"
           style={{ aspectRatio: "16/10" }}>
        {product.cover_url ? (
          <img
            src={product.cover_url}
            alt={product.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain p-1 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-indigo-300/70 dark:text-slate-600">
            <TypeIcon type={product.type} className="h-14 w-14" />
          </div>
        )}

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Featured badge */}
        {product.featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold text-amber-950 shadow-sm">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="m12 2 2.9 6.3L22 9.3l-5 4.7 1.3 6.9L12 17.8 5.7 20.9 7 14 2 9.3l7.1-1Z" />
            </svg>
            FEATURED
          </span>
        )}

        {/* Type badge */}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
          <TypeIcon type={product.type} className="h-3.5 w-3.5" />
          {typeLabel(product.type)}
        </span>

        {/* Price pill on image */}
        <span className={`absolute bottom-3 right-3 rounded-full px-2.5 py-1 text-xs font-extrabold shadow-lg ${
          isFree
            ? "bg-emerald-500 text-white"
            : "bg-white/95 text-slate-900 backdrop-blur-sm dark:bg-slate-900/95 dark:text-white"
        }`}>
          {isFree ? "Free" : money(product.price)}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title — clamp to 2 lines, never overflows */}
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-slate-900 dark:text-white">
          {product.title}
        </h3>

        {/* Description — clamp to 2 lines */}
        <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {product.short_desc}
        </p>

        {/* Creator + rating row */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-[9px] font-bold text-white">
              {(product.creator?.username || "?").charAt(0).toUpperCase()}
            </span>
            <span className="truncate text-xs text-slate-400">
              @{product.creator?.username || "creator"}
            </span>
          </div>

          <div className="flex flex-shrink-0 items-center gap-1">
            {product.rating_count > 0 ? (
              <>
                <Stars value={product.rating} />
                <span className="text-[10px] text-slate-400">
                  ({product.rating_count})
                </span>
              </>
            ) : (
              <Badge color="slate">New</Badge>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
