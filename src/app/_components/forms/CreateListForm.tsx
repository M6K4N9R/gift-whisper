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
    ? "bg-dark-accent-700 hover:bg-dark-accent-600 text-foreground rounded-lg"
    : "bg-dark-accent-100 hover:bg-dark-accent-200 text-dark-accent-900 rouunded-lg";

  const inputClasses = isDarkMode
    ? "bg-dark-accent-700 border-dark-accent-600 text-foreground"
    : "bg-background border-dark-accent-300 text-dark-accent-900";
  //===================================================================
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className={`rounded-lg p-6 w-full max-w-md ${themeClasses}`}>
        {step === 1 ? (
          <div className="w-full max-w-sm relative">
            <h2 className="font-gelica text-2xl font-bold mb-4 text-center">
              Choose List Type
            </h2>
            <button
              onClick={onClose}
              className="flex justify-center items-center absolute text-2xl -top-2 -right-6 bg-dark-accent-600 hover:bg-dark-accent-500 rounded-xl w-7 h-7"
            >
              &times;
            </button>
            <div className="flex flex-col justify-center items-center gap-4 p-8">
              <button
                onClick={() => handleTypeSelect("Gift List")}
                className={`w-full px-5 py-2 rounded ${buttonClasses}`}
              >
                <div className="flex justify-between items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="8" width="18" height="4" rx="1" />
                    <path d="M12 8v13" />
                    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
                  </svg>
                  <div className="text-left ml-5 w-full">
                    <h3 className="text-lg font-semibold">Gift List</h3>
                    <p className="text-sm opacity-50">
                      Birthday, Christmas, etc.
                    </p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => handleTypeSelect("Event")}
                className={`w-full px-5 py-2 rounded ${buttonClasses}`}
              >
                <div className="flex justify-between items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                    <path d="m14 14-4 4" />
                    <path d="m10 14 4 4" />
                  </svg>
                  <div className="text-left ml-5 w-full">
                    <h3 className="text-lg font-semibold">Event</h3>
                    <p className="text-sm opacity-50">
                      Wedding, Baby shower, etc.
                    </p>
                  </div>
                </div>
              </button>
            </div>
            <div className="opacity-30 text-center my-1 text-sm">
              Select a list type to continue
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
