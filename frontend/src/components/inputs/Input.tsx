import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

interface InputProps {
  value: string;
  onChange: (target: HTMLInputElement) => void;
  label: string;
  type: string;
  placeholder: string;
}

const Input = ({ value, onChange, label, type, placeholder } : InputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
        <div>
            <label className='text-[13px] text-slate-800'>{label}</label>
            <div className="input-box">
                <input
                    value={value}
                    onChange={(e) => onChange(e.target)}
                    type={type === "password" ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    className='w-full bg-transparent outline-none'
                />
                {type === "password" && (
                    <>
                    {showPassword ? (
                        <FaRegEye 
                            size={22}
                            className='text-primary cusror-pointer'
                            onClick={handleTogglePasswordVisibility}
                        />
                    ) : (
                        <FaRegEyeSlash 
                            size={22}
                            className='text-slate-400 cursor-pointer'
                            onClick={handleTogglePasswordVisibility}
                        />
                    )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Input