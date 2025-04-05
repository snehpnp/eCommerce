import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import * as Config from "../../utils/Config";

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false); // Modal open/close

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${Config.react_domain}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${Config.react_domain}/api/categories`, { name, description });
      setName("");
      setDescription("");
      fetchCategories();
    } catch (err) {
      console.error("Failed to add", err);
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setDescription(category.description || "");
    setEditId(category._id);
    setOpen(true); // open modal
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${Config.react_domain}/api/categories/${editId}`, {
        name,
        description,
      });
      setName("");
      setDescription("");
      setEditId(null);
      setOpen(false); // close modal
      fetchCategories();
    } catch (err) {
      console.error("Failed to update", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Config.react_domain}/api/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  return (
    <div className="container py-4">
      <h2>📁 Manage Categories</h2>

      {/* Form to Add */}
      <form onSubmit={handleSubmit} className="d-flex gap-2 my-3">
        <TextField
          label="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Category Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </form>

      {/* Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Description</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((cat, index) => (
            <tr key={cat._id}>
              <td>{index + 1}</td>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td>
                <IconButton color="primary" onClick={() => handleEdit(cat)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(cat._id)}>
                  <Delete />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Edit */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent className="d-flex flex-column gap-3 mt-2">
          <TextField
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Category Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CategoryManager;
