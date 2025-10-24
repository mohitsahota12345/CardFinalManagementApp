import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import CardForm from "./components/CardForm";
import Card from "./components/Card";

interface CardType {
  id: number;
  title: string;
  description: string;
  category: string;
  image?: string;
}

function App() {
  // Load from localStorage on initial mount
  const [cards, setCards] = useState<CardType[]>(() => {
    const savedCards = localStorage.getItem('cards');
    if (savedCards) {
      return JSON.parse(savedCards);
    }
    return [
      { 
        id: 1, 
        title: "Sample Card", 
        description: "This is a sample card with an image", 
        category: "Work",
        image: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400"
      }
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CardType | null>(null);

  // Save to localStorage whenever cards change
  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  // Add new card
  const handleAddCard = (newCard: Omit<CardType, 'id'>) => {
    const card = {
      ...newCard,
      id: Math.max(0, ...cards.map(c => c.id)) + 1
    };
    setCards([...cards, card]);
    setIsModalOpen(false);
  };

  // Edit existing card
  const handleEditCard = (updatedCard: Omit<CardType, 'id'>) => {
    if (editingCard) {
      setCards(cards.map(card => 
        card.id === editingCard.id 
          ? { ...updatedCard, id: editingCard.id }
          : card
      ));
      setEditingCard(null);
      setIsModalOpen(false);
    }
  };

  // Delete card
  const handleDeleteCard = (id: number) => {
    if (confirm("Are you sure you want to delete this card?")) {
      setCards(cards.filter(card => card.id !== id));
    }
  };

  // Open add modal
  const openAddModal = () => {
    setEditingCard(null);
    setIsModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (card: CardType) => {
    setEditingCard(card);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCard(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Card Management App" addUser={openAddModal} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            My Cards ({cards.length})
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(card => (
            <Card
              key={card.id}
              card={card}
              onEdit={openEditModal}
              onDelete={handleDeleteCard}
            />
          ))}
        </div>

        {cards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No cards yet!</p>
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Add Your First Card
            </button>
          </div>
        )}
      </main>

      {/* Modal for Add/Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCard ? "Edit Card" : "Add New Card"}
      >
        <CardForm
          card={editingCard || undefined}
          onSubmit={editingCard ? handleEditCard : handleAddCard}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}

export default App;
