// src/components/pagination/Pagination.jsx
import './style.scss';
import {
    MdOutlineFirstPage,
    MdOutlineLastPage,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
} from 'react-icons/md';

const DOTS = '…';
const range = (s, e) => Array.from({ length: e - s + 1 }, (_, i) => s + i);

const makeRange = ({ totalPages, page, siblingCount = 1, boundaryCount = 1 }) => {
    if (totalPages <= 1) return [1];

    const startPages = range(1, Math.min(boundaryCount, totalPages));
    const endPages = range(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages);

    const leftSibling = Math.max(page - siblingCount, boundaryCount + 2);
    const rightSibling = Math.min(page + siblingCount, totalPages - boundaryCount - 1);

    const showLeftDots = leftSibling > boundaryCount + 2;
    const showRightDots = rightSibling < totalPages - boundaryCount - 1;

    if (!showLeftDots && showRightDots) {
        const leftCount = boundaryCount + 1 + 2 * siblingCount;
        return [...range(1, leftCount + 1), DOTS, ...endPages];
    }
    if (showLeftDots && !showRightDots) {
        const rightCount = boundaryCount + 1 + 2 * siblingCount;
        return [...startPages, DOTS, ...range(totalPages - rightCount, totalPages)];
    }
    if (showLeftDots && showRightDots) {
        return [...startPages, DOTS, ...range(leftSibling, rightSibling), DOTS, ...endPages];
    }
    return range(1, totalPages);
};

const Pagination = ({
    page,
    total,
    pageSize = 5,
    onPageChange,
    visibleCount = 5,
    boundaryCount = 1,
    siblingCount,
    className = '',
}) => {
    // **안전 보장**: 외부에서 문자열로 들어와도 내부에서는 숫자 사용
    const currentPage = Number(page) || 1;
    const totalPages = Math.max(1, Math.ceil((Number(total) || 0) / Number(pageSize)));

    const effSibling =
        typeof siblingCount === 'number'
            ? Math.max(0, Math.floor(siblingCount))
            : Math.max(
                  0,
                  Math.floor((Math.max(1, visibleCount) - 1 - 2 * Math.max(0, boundaryCount)) / 2)
              );

    const items = makeRange({
        totalPages,
        page: currentPage,
        siblingCount: effSibling,
        boundaryCount: Math.max(0, boundaryCount),
    });

    const go = (p) => {
        const clamped = Math.max(1, Math.min(totalPages, Number(p)));
        if (clamped !== currentPage) onPageChange?.(clamped);
    };

    const Btn = ({ type, disabled, onClick, label, children }) => (
        <button
            type="button"
            className={`pagination-btn ${type} ${disabled ? 'is-disabled' : ''}`}
            onClick={onClick}
            aria-label={label}
            disabled={disabled}
        >
            {children}
        </button>
    );

    return (
        <nav className={`pagination ${className}`} role="navigation" aria-label="pagination">
            <ul className="pagination-list">
                <li>
                    <Btn
                        type="first"
                        disabled={currentPage === 1}
                        onClick={() => go(1)}
                        label="첫 페이지"
                    >
                        <MdOutlineFirstPage />
                    </Btn>
                </li>
                <li>
                    <Btn
                        type="prev"
                        disabled={currentPage === 1}
                        onClick={() => go(currentPage - 1)}
                        label="이전 페이지"
                    >
                        <MdKeyboardArrowLeft />
                    </Btn>
                </li>

                {items.map((it, idx) =>
                    it === DOTS ? (
                        <li key={`dots-${idx}`} className="pagination-ellipsis" aria-hidden="true">
                            {DOTS}
                        </li>
                    ) : (
                        <li key={it}>
                            <button
                                type="button"
                                className={`pagination-page ${
                                    currentPage === it ? 'is-active' : ''
                                }`}
                                onClick={() => go(it)}
                                aria-current={currentPage === it ? 'page' : undefined}
                            >
                                {it}
                            </button>
                        </li>
                    )
                )}

                <li>
                    <Btn
                        type="next"
                        disabled={currentPage === totalPages}
                        onClick={() => go(currentPage + 1)}
                        label="다음 페이지"
                    >
                        <MdKeyboardArrowRight />
                    </Btn>
                </li>
                <li>
                    <Btn
                        type="last"
                        disabled={currentPage === totalPages}
                        onClick={() => go(totalPages)}
                        label="마지막 페이지"
                    >
                        <MdOutlineLastPage />
                    </Btn>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
