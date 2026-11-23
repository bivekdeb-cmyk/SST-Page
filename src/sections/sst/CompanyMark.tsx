/**
 * A company as its mark and its name (the SSB faculty card's company line, made a part of its own):
 * the square mark (an app icon) in a rounded box, or a monogram tile in the brand's colour where we
 * have no mark, then the name. Used for every list of companies on the SST page, so they all read alike.
 */
export type Company = { name: string; mark?: string; mono?: string };

export function CompanyMark({ company: c, size = 'md', className }: { company: Company; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  return (
    <span className={`cmk${className ? ` ${className}` : ''}`} data-size={size}>
      <span className="cmk-box" style={c.mono ? { background: c.mono } : undefined} data-mono={c.mono ? '' : undefined} aria-hidden="true">
        {c.mark ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.mark} alt="" loading="lazy" decoding="async" />
        ) : (
          <span>{c.name.charAt(0)}</span>
        )}
      </span>
      <span className="cmk-name">{c.name}</span>
    </span>
  );
}
