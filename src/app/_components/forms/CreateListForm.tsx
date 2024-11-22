import { useState } from 'react';

interface CreateListFormProps {
  onClose: () => void;
}

type ListType = 'Gift List' | 'Event';

interface FormData {
  title: string;
  eventDate: string;
  description: string;
}

const CreateListForm: React.FC<CreateListFormProps> = ({ onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [listType, setListType] = useState<ListType | ''>('');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    eventDate: '',
    description: '',
  });

  const handleTypeSelect = (type: ListType) => {
    setListType(type);
    setStep(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // ======================== Continue after backend is set up!

    console.log({ listType, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {step === 1 ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Choose List Type</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleTypeSelect('Gift List')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Gift List
              </button>
              <button
                onClick={() => handleTypeSelect('Event')}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Event
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">List Details</h2>
              <button type="button" onClick={onClose} className="text-2xl">&times;</button>
            </div>
            <div className="mb-4">
              <span>{listType}</span>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="ml-2 text-blue-500 hover:text-blue-600"
              >
                Change
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Event Date</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create List
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateListForm;
