"use client";

import { useState } from "react";
import { FaEdit, FaTrash, FaFire, FaPlus } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MdFastfood } from "react-icons/md";
import Skeleton from "@mui/material/Skeleton";

interface FoodData {
  id: string;
  title: string;
  desc: string;
  price: number;
  oldprice: number;
  url: string;
}

const API_URL = "https://6777b7b280a79bf91902b4ff.mockapi.io/Food";

export default function Products() {
  const queryClient = useQueryClient();
  const [editingFood, setEditingFood] = useState<FoodData | null>(null);
  const [newFood, setNewFood] = useState<Partial<FoodData>>({
    title: "",
    desc: "",
    price: 0,
    oldprice: 0,
    url: "",
  });

  const { data, isLoading } = useQuery<FoodData[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (newFood: Partial<FoodData>) => axios.post(API_URL, newFood),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setNewFood({ title: "", desc: "", price: 0, oldprice: 0, url: "" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedFood: FoodData) =>
      axios.put(`${API_URL}/${updatedFood.id}`, updatedFood),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setEditingFood(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.delete(`${API_URL}/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const [hoveredCards, setHoveredCards] = useState<Record<string, boolean>>({});

  const handleMouseEnter = (id: string) => {
    setHoveredCards((prev) => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id: string) => {
    setHoveredCards((prev) => ({ ...prev, [id]: false }));
  };

  const handleEdit = (food: FoodData) => {
    setEditingFood(food);
    document.documentElement.scrollTop = 0;
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingFood) {
      updateMutation.mutate(editingFood); // Faqat tahrirlanayotgan ma’lumotni yuboradi
    } else {
      createMutation.mutate(newFood); // Faqat yangi ma’lumotni yuboradi
    }

    setNewFood({ title: "", desc: "", price: 0, oldprice: 0, url: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingFood) {
      setEditingFood((prev) => (prev ? { ...prev, [name]: value } : null));
    } else {
      setNewFood((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <section className="container mx-auto py-12">
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white p-6 rounded-lg shadow-md w-1/2 mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4 text-red-700">
          {editingFood ? "Edit Product" : "Add New Product"}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={editingFood ? editingFood.title : newFood.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="desc"
            value={editingFood ? editingFood.desc : newFood.desc}
            onChange={handleInputChange}
            placeholder="Description"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={editingFood ? editingFood.price : newFood.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="oldprice"
            value={editingFood ? editingFood.oldprice : newFood.oldprice}
            onChange={handleInputChange}
            placeholder="Old Price"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="url"
            value={editingFood ? editingFood.url : newFood.url}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="border p-2 rounded"
            required
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 ease-in-out flex items-center"
          >
            <FaPlus className="mr-2" /> {editingFood ? "Update" : "Add"} Product
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingFood(null);
              setNewFood({
                title: "",
                desc: "",
                price: 0,
                oldprice: 0,
                url: "",
              });
            }}
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 ease-in-out flex items-center"
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="w-full">
                <Skeleton variant="rounded" width="100%" height={288} />
                <Skeleton width="60%" height={30} />
                <Skeleton width="80%" height={20} className="mt-2" />
              </div>
            ))
          : data?.map((food) => (
              <div
                key={food.id}
                className="w-full bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-[1.02]"
                onMouseEnter={() => handleMouseEnter(food.id)}
                onMouseLeave={() => handleMouseLeave(food.id)}
              >
                <div className="relative">
                  <img
                    src={food.url}
                    alt={food.title}
                    className="w-full h-72 object-cover transition-all duration-300 ease-in-out hover:brightness-110"
                  />
                  <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 rounded-br-lg">
                    <MdFastfood className="inline-block mr-1" />
                  </div>
                  {hoveredCards[food.id] && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-300 ease-in-out">
                      <FaFire className="text-6xl text-yellow-400 animate-pulse" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-red-700 min-h-10">
                    {food.title}
                  </h2>
                  <p className="text-gray-700 text-base mb-4 min-h-20 line-clamp-4">
                    {food.desc}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-2xl font-bold text-green-600">
                        ${food.price}
                      </span>
                      {food.oldprice && (
                        <span className="text-lg text-gray-500 line-through ml-2">
                          ${food.oldprice}
                        </span>
                      )}
                    </div>
                    <div className="bg-yellow-400 text-red-700 font-bold py-1 px-2 rounded-full animate-bounce">
                      Hot Deal!
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(food)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 ease-in-out flex items-center"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(food.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 ease-in-out flex items-center"
                    >
                      <FaTrash className="mr-2" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}
