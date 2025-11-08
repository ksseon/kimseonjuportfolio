import './style.scss';

const TabButton2 = ({ label, onClick, isActive }) => {
    return (
        <button className={`tab-button-2 ${isActive ? 'on' : ''}`} onClick={onClick}>
            {label || '빈칸'}
        </button>
    );
};

export default TabButton2;
