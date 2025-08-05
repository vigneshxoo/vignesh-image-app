import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ALLImages = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    let api = process.env.REACT_APP_API_URL || "https://imagebackend-2.onrender.com";
    useEffect(() => {
        axios.get(`${api}/all`, { withCredentials: true })
            .then(res => {

                const result = res.data;
                console.log(result)
                if (Array.isArray(result)) {
                    setImages(result);
                }
                else if (result && Array.isArray(result.images)) {
                    setImages(result.images);
                } else {
                    setImages([]); // fallback if no array found
                }

                setLoading(false);
            })
            .catch(() => {
                setError("Could not load your photos");
                setLoading(false);
            });
    }, []);

    if (loading)
        return <p className="text-center mt-8">Loading your photos...</p>;

    if (error)
        return <p className="text-center mt-8 text-red-500">{error}</p>;

    if (images.length === 0)
        return <p className="text-center mt-8 text-gray-500">You haven't uploaded any photos yet.</p>

    // Open modal on image click
    const openModal = (img) => {
        setSelectedImage(img);
        setModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setSelectedImage(null);
        setModalOpen(false);
    };

    return (
        <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-8 py-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-8">
                Your Uploaded Photos
            </h1>
            <div className="
        grid gap-4
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
      ">
                {images?.map((img) => (
                    <div
                        key={img._id || img.url}
                        className="bg-white shadow rounded p-2 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
                        onClick={() => openModal(img)}
                    >
                        <img
                            src={img.img}
                            alt={img.imgName || img.title}
                            className="w-full aspect-square object-cover rounded"
                        />
                        <p className="mt-2 uppercase text-gray-700 text-center text-xs sm:text-sm">
                            {img.imgName || img.title}
                        </p>
                        <p className='font-popins tracking-wider'>{img.author?.username}</p>
                    </div>
                ))}
            </div>

            {/* Fullscreen Modal */}
            {modalOpen && selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <img
                        src={selectedImage.img}
                        alt={selectedImage.imgName || selectedImage.title}
                        className="max-w-full max-h-full rounded shadow-lg"
                        onClick={e => e.stopPropagation()} // Prevent modal close on image click
                    />
                    <button
                        className="absolute top-6 right-6 text-white text-3xl font-bold"
                        onClick={closeModal}
                        aria-label="Close fullscreen image"
                    >
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
};
