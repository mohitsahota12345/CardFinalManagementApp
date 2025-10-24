interface Card {
  id: number;
  title: string;
  description: string;
  category: string;
  image?: string;  // ← Added
}

interface CardProps {
  card: Card;
  onEdit: (card: Card) => void;
  onDelete: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ card, onEdit, onDelete }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      Work: "bg-blue-100 text-blue-800",
      Personal: "bg-green-100 text-green-800",
      Shopping: "bg-purple-100 text-purple-800",
      Ideas: "bg-yellow-100 text-yellow-800",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden duration-500 ease-in-out hover:-translate-y-1 hover:scale-110">

      {/* Image Section */}
      {card.image && (
        <div className="w-full h-48 bg-gray-200">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
        </div>
      )}

      {/* ✅ Content Section with visible diagonal reflection */}
      <div className="relative group p-6 bg-linear-to-r from-gray-700 to-gray-400 ">

        {/* ✨ Diagonal reflection (now clearly visible) */}
        <span className="absolute inset-0 bg-linear-to-br from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-200 group-hover:translate-x-[50%] rotate-0 scale-100 transition-all duration-200 ease-in-out pointer-events-none"></span>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-[#f3f3f3]">{card.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(card.category)}`}>
              {card.category}
            </span>
          </div>

          <p className="text-gray-200 mb-3">{card.description}</p>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(card)}
              className="bg-[#C5E1A5] hover:bg-[#558B2F] hover:text-white focus:outline-[#C5E1A5] text-black text-sm px-3 py-1 rounded transition"
            >
              EDIT
            </button>
            <button
              onClick={() => onDelete(card.id)}
              className="bg-[#EF9A9A] hover:bg-[#C62828] hover:text-white focus:outline-[#EF9A9A] text-black  px-3 py-1 rounded text-sm transition"
            >
              DELETE CARD
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Card;
