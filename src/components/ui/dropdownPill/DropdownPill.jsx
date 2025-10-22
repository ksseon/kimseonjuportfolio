// DropdownPill.jsx
import './style.scss';
import { useEffect, useRef, useState } from 'react';

import { IoIosArrowDown } from 'react-icons/io';

export default function DropdownPill({
    value,
    onChange,
    options = ['목록1', '목록2', '목록3'],
    width = 140,
}) {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);

    // 바깥 클릭시 닫기
    useEffect(() => {
        const onClickOutside = (e) => {
            if (!wrapRef.current) return;
            if (!wrapRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, []);

    const current = value ?? options[0];

    const handleSelect = (opt) => {
        onChange?.(opt);
        setOpen(false);
    };

    return (
        <div className={`dropdown-pill ${open ? 'open' : ''}`} style={{ width }} ref={wrapRef}>
            <button
                type="button"
                className="dropdown-pill__button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
            >
                <span className="dropdown-pill__label">{current}</span>
                <span className="dropdown-pill__icon" aria-hidden>
                    <IoIosArrowDown />
                </span>
            </button>

            {open && (
                <ul className="dropdown-pill__menu" role="listbox">
                    {options.map((opt) => (
                        <li
                            key={opt}
                            role="option"
                            aria-selected={opt === current}
                            className={`dropdown-pill__item ${
                                opt === current ? 'is-selected' : ''
                            }`}
                            onClick={() => handleSelect(opt)}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') handleSelect(opt);
                            }}
                        >
                            {opt}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
