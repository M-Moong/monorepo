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
    'cursor-pointer border-0 bg-transparent px-1 py-2 text-3xs tracking-[0.2rem] text-fg/40 transition-opacity disabled:cursor-default disabled:opacity-25';

  return (
    <div className="mt-3 flex items-center justify-between">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1 || loading}
        className={btnClass}
      >
        <span>← 이전</span>
      </button>

      <span className="flex items-center font-serif text-sm text-gold tabular-nums">
        <span>{page}</span>
        <span className="mx-1.5 font-sans text-3xs text-fg/30">/</span>
        <span>{totalPages}</span>
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages || loading}
        className={btnClass}
      >
        <span>다음 →</span>
      </button>
    </div>
  );
}
