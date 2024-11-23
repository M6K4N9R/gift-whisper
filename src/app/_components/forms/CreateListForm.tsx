import { useState, useEffect } from "react";

interface CreateListFormProps {
  onClose: () => void;
}

type ListType = "Gift List" | "Event";

interface FormData {
  title: string;
  eventDate: string;
  description: string;
}

const CreateListForm: React.FC<CreateListFormProps> = ({ onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [listType, setListType] = useState<ListType | "">("");
  const [formData, setFormData] = useState<FormData>({
    title: "",
    eventDate: "",
    description: "",
  });
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);
  }, []);

  const handleTypeSelect = (type: ListType) => {
    setListType(type);
    setStep(2);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ listType, ...formData });
    onClose();
  };
// ================ Refacture later. Put in root Layout or global.css
  const themeClasses = isDarkMode
    ? "bg-dark-accent-800 text-foreground"
    : "bg-background text-dark-accent-900";

  const buttonClasses = isDarkMode
    ? "bg-primary-700 hover:bg-primary-600 text-foreground"
    : "bg-primary-400 hover:bg-primary-500 text-dark-accent-900";

  const inputClasses = isDarkMode
    ? "bg-dark-accent-700 border-dark-accent-600 text-foreground"
    : "bg-background border-dark-accent-300 text-dark-accent-900";
//===================================================================
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className={`rounded-lg p-6 w-full max-w-md ${themeClasses}`}>
        {step === 1 ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Choose List Type
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleTypeSelect("Gift List")}
                className={`px-4 py-2 rounded ${buttonClasses}`}
              >
                Gift List
              </button>
              <button
                onClick={() => handleTypeSelect("Event")}
                className={`px-4 py-2 rounded ${buttonClasses}`}
              >
                Event
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">List Details</h2>
              <button type="button" onClick={onClose} className="text-2xl">
                &times;
              </button>
            </div>
            <div className="mb-4">
              <span>{listType}</span>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="ml-2 text-secondary-900 hover:text-secondary-700"
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
                className={`w-full p-2 border rounded ${inputClasses}`}
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
                className={`w-full p-2 border rounded ${inputClasses}`}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${inputClasses}`}
                rows={3}
              ></textarea>
            </div>
            <button
              type="submit"
              className={`w-full px-4 py-2 rounded ${buttonClasses}`}
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
