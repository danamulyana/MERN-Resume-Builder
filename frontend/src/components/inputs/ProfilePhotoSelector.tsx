import { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

interface Props {
    image: File | null;
    setImage: (image: File | null) => void;
    setPreview?: (preview: string | null) => void;
    preview?: string;
}

const ProfilePhotoSelector = ({ image, setImage, setPreview, preview } : Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            
            const preview = URL.createObjectURL(file);
            if(setPreview) {
                setPreview(preview);
            }

            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        if (setPreview) {
            setPreview(null);
        }
        setPreviewUrl("");
    };

    const onChooseFile = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <div className="flex justify-center mb-6">
        <input 
            type="file" 
            ref={inputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
        />
        {!image ? (
            <div className="w-20 h-20 flex items-center justify-center bg-purple-50 rounded-full relative cursor-pointer">
                <LuUser className="text-4xl text-purple-500" />

                <button 
                    type="button"
                    className="w-8 h-8 bg-linear-to-r from-purple-500/85 to-purple-700 text-white rounded-full absolute -bottom-1 -right-1 flex items-center justify-center cursor-pointer hover:bg-purple-600 transition-colors duration-200"
                    onClick={onChooseFile}  
                >
                <LuUpload />
                </button>
            </div>
        ) : (
            <div className="relative">
                <img 
                    src={preview || previewUrl} 
                    alt="Profile Preview"
                    className="w-20 h-20 rounded-full object-cover"
                />
                <button 
                    type="button" 
                    className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 hover:bg-red-600 transition-colors duration-200" 
                    onClick={handleRemoveImage}
                >
                    <LuTrash />
                </button>
            </div>
        )}
        </div>
    )
}

export default ProfilePhotoSelector