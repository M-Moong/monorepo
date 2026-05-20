interface GuestbookPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export function GuestbookPagination({
  page,
  totalPages,
  onPageChange,
  loading,
}: GuestbookPaginationProps) {
  if (totalPages <= 1) return null;

  const btnClass =
    'cursor-pointer border-0 bg-transparent px-1 py-2 text-[0.5625rem] tracking-[0.2rem] text-fg/40 transition-opacity disabled:cursor-default disabled:opacity-25';

  return (
    <div className="mt-3 flex items-center justify-between">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1 || loading}
        className={btnClass}
      >
        ← 이전
      </button>

      <span className="font-serif text-[0.875rem] text-gold italic tabular-nums">
        {page}
        <span className="mx-1.5 font-sans text-[0.5625rem] text-fg/30 not-italic">/</span>
        {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages || loading}
        className={btnClass}
      >
        다음 →
      </button>
    </div>
  );
}
