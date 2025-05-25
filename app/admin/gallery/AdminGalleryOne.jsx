"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModalToAdd from "./ModalToAdd";
import DeleteProduct from "./DeleteProduct";

const AdminGalleryOne = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState({ productId: "", instagramLink: "" });

  useEffect(() => {
    const getInstagramPosts = async () => {
      try {
        const response = await axios.get(`/api/gallery`);
        if (response.data && Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    getInstagramPosts();
  }, []);

  useEffect(() => {
    if (posts.length === 0) return;

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [posts]);

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (post) => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/api/gallery/${selectedPost.productId}`);
      setPosts(posts.filter((p) => p.productId !== selectedPost.productId));
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4 text-gray-600">Our Gallery</h1>

      {isModalOpen && (
        <ModalToAdd
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productId={selectedPost.productId}
          instagramLink={selectedPost.instagramLink}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteProduct
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDeleteConfirm}
        />
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading posts...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="p-3">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={post.instagramLink}
                  data-instgrm-version="14"
                  style={{
                    background: "#FFF",
                    border: "0",
                    borderRadius: "3px",
                    boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
                    margin: "1px",
                    maxWidth: "540px",
                    minWidth: "326px",
                    padding: "0",
                    width: "99.375%",
                  }}
                ></blockquote>

                <div className="flex justify-center gap-4 mt-4">
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-700 transition-all"
                    onClick={() => handleEditClick(post)}
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all"
                    onClick={() => handleDeleteClick(post)}
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No posts available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminGalleryOne;
