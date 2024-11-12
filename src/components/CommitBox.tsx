
type CommitBoxProps = {
    level: 0 | 1 | 2 | 3 | 4;
};

const CommitBox: React.FC<CommitBoxProps> = ({ level }) => {
    // Colores de acuerdo al nivel de actividad
    const colors = {
        0: 'bg-gray-200',    // Sin actividad
        1: 'bg-green-200',   // Bajo
        2: 'bg-green-400',   // Medio
        3: 'bg-green-600',   // Alto
        4: 'bg-green-800',   // Muy alto
    };

    return (
        <div className={`w-4 h-4 ${colors[level]} m-0.5 rounded-sm`}></div>
    );
};

export default CommitBox;
