import Image from "next/image";
import type { ExposeListing } from "@/lib/expose-listings";

export default function ExposeCard({ listing }: { listing: ExposeListing }) {
  return (
    <a
      href={listing.url}
      target="_blank"
      rel="noopener noreferrer"
      className="expose-card"
    >
      <div className="expose-card-header">
        <Image
          src="/images/plan-a-logo.png"
          alt="Plan A Immobilien"
          width={220}
          height={95}
          style={{ height: "40px", width: "auto", objectFit: "contain", mixBlendMode: "screen" }}
        />
      </div>

      {listing.cover && (
        <div className="expose-card-cover">
          <Image
            src={listing.cover}
            alt={listing.titel}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      <div className="expose-card-body">
        <h3 className="expose-card-title">{listing.titel}</h3>
        <p className="expose-card-desc">{listing.kurzbeschreibung}</p>
        <span className="expose-card-action">
          <span>{listing.buttonLabel ?? "Exposé ansehen"}</span>
          <span className="expose-card-arrow" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3.5 8h9M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
      </div>
    </a>
  );
}
