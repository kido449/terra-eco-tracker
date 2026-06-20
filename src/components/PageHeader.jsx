import PropTypes from 'prop-types';

/**
 * PageHeader
 * Consistent header structure across primary pages with a title and optional description.
 */
export default function PageHeader({ title, description, children }) {
  return (
    <div className="mb-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-black text-[var(--color-charcoal)] mb-2 leading-tight">{title}</h1>
          {description && (
            <p className="text-[16px] font-bold text-[var(--color-charcoal)]/60 max-w-2xl leading-relaxed">{description}</p>
          )}
        </div>
        {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
      </div>
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node
};
