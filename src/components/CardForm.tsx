import { useState, useEffect } from "react";

interface Card {
  id: number;
  title: string;
  description: string;
  category: string;
  image?: string;  // may be URL or uploaded file
}

interface CardFormProps {
  card?: Card;
  onSubmit: (card: Omit<Card, 'id'>) => void;
  onCancel: () => void;
}

const CardForm: React.FC<CardFormProps> = ({ card, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(card?.title || "");
  const [description, setDescription] = useState(card?.description || "");
  const [category, setCategory] = useState(card?.category || "");
  const [imageUrl, setImageUrl] = useState(card?.image || ""); 
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(card?.image || null);

  // Preview file on upload
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreview(url);
      return () => URL.revokeObjectURL(url); // cleanup
    }
  }, [imageFile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !category.trim()) return;

    // If image file uploaded, use its preview URL for now (you can convert to base64 or upload to server later).
    const image = imageFile ? preview || undefined : imageUrl.trim() || undefined;

    onSubmit({
      title,
      description,
      category,
      image
    });

    if (!card) {
      setTitle("");
      setDescription("");
      setCategory("");
      setImageUrl("");
      setImageFile(null);
      setPreview(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter card title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Enter card description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Category Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Select category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
          <option value="Ideas">Ideas</option>
        </select>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Image (Optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* OR paste image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Or Image URL
        </label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            setPreview(e.target.value);
            setImageFile(null); // reset upload if URL entered
          }}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Preview */}
      {preview && (
        <div className="mt-3 text-center">
          <img
            src={preview}
            alt="Preview"
            className="inline-block max-h-40 rounded shadow-md border border-gray-200"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex-1 transition"
        >
          {card ? "Update" : "Add"} Card
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md flex-1 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CardForm;
