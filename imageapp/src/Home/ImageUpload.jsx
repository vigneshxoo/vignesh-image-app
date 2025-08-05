import React from 'react'
import { useState } from 'react';
import { AiTwotoneCloseCircle } from "react-icons/ai";
import axios from 'axios';
import { AiOutlineCloudUpload } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";


export const ImageUpload = () => {

    const [image, setImage] = useState(null);       // Stores the selected image file
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const[text,setText]=useState()

    // console.log(preview)
  let api = process.env.REACT_APP_API_URL || "https://imagebackend-2.onrender.com";
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            console.log(file);
            setImage(file); // Store image in state

            // Preview setup
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); // Convert to base64 for preview
            };
            reader.readAsDataURL(file);
        } else {
            console.log("No file selected");     // Reset preview if no file is selected
        }
        e.target.value = null;
    };

    const handleUpload = async () => {
        if(!text){
           setError("pls fill tha image Name")
           return
        }
        if (!image) return;
        setError('');
        setUploading(true);
        if (image) {
            try {
                const formdata = new FormData();
                formdata.append("imgName", text);
                formdata.append("profileImg", image);
                // const fileup = await axios.post("http://localhost:4000/img", formdata, {

                // },);
                const response = await axios.post(
                    `${api}/img`,
                    formdata, // ✅ pass FormData directly
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        withCredentials: true
                    }
                );
                console.log(response.data)
                alert("Image uploaded successfully!");
                setText('');
                setImage(null);
                setPreview(null);; // Reset preview after upload
            } catch (error) {
                console.error("Upload failed:", error);

                setError(error?.response?.data?.message || "Image upload failed");
            } finally {
                setUploading(false);
            }
            console.log("Uploading image:", image);
        }
    };
    const clearPreview = () => {
        setImage(null);
        setPreview(null);
        setError('');
    };

    return (
        <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg relative">
          <div className='flex flex-col mb-4'>
                    <label htmlFor="imgName" className='font-medium uppercase tracking-wider text-sm pb-1 text-pink-600 flex items-center gap-2'>
                        Img Name <AiOutlineEdit />

                    </label>
                    <input
                        id="imgName"
                        name="imgName"
                        value={text}
                        onChange={(e)=>{setText(e.target.value)}}
                        type="text"
                        className='text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300'
                        placeholder='image Details'
                        autoComplete='current-password'
                    />
                </div>
            {/* Clear Preview Button */}
            {preview && (
                <button
                    onClick={clearPreview}
                    aria-label="Clear selected image"
                    title="Clear selected image"
                    className="absolute top-3 right-3 text-gray-600 hover:text-red-600 focus:outline-none"
                    type="button"
                >
                    <AiTwotoneCloseCircle size={24} />
                </button>
            )}

            {/* Hidden File Input */}
            <input
                type="file"
                id="imageInput"
                accept="image/png, image/jpeg, image/jpg, image/gif"
                onChange={handleImageChange}
                className="hidden"
            />

            {/* File Input Label (Clickable Area) */}
            <label
                htmlFor="imageInput"
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition relative min-h-[14rem]"
            >
                {preview ? (
                    <>
                        <img
                            src={preview}
                            alt="Selected preview"
                            className="max-h-80 w-auto object-contain rounded-lg"
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // prevent triggering file input
                                handleUpload();
                            }}
                            disabled={uploading}
                            type="button"
                            aria-disabled={uploading}
                            className={`mt-4 bg-blue-500 text-white font-poppins flex items-center gap-3 py-2 px-6 rounded hover:bg-blue-600 transition focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed absolute bottom-4 right-4`}
                        >
                            {uploading ? "Uploading..." : "Upload "} <AiOutlineCloudUpload />
                        </button>
                    </>
                ) : (
                    <>
                        {/* SVG upload icon */}
                        <svg
                            className="w-12 h-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 15a4 4 0 001 7h16a4 4 0 001-7M12 11V3m0 8l3-3m-3 3l-3-3"
                            />
                        </svg>
                        <p className="mt-2 text-gray-600 font-medium">Click to upload image</p>
                        <p className="text-sm text-gray-400">PNG, JPG, JPEG, GIF only</p>
                    </>
                )}
            </label>

            {/* Error Message */}
            {error && (
                <p className="mt-3 text-sm text-red-600 font-medium text-center" role="alert">
                    {error}
                </p>
            )}
        </div>
    )
}
