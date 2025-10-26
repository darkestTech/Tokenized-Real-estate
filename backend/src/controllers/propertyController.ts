import { Request, Response } from "express";

// Temporary in-memory property storage
let properties: any[] = [];
let idCounter = 1;

// Get all properties
export const getAllProperties = async (req: Request, res: Response) => {
  try {
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: "Error fetching properties" });
  }
};

// Get property by ID
export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const property = properties.find((p) => p.id === id);
    if (!property) return res.status(404).json({ error: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: "Error fetching property" });
  }
};

// Create a property
export const createProperty = async (req: Request, res: Response) => {
  try {
    const newProperty = { id: idCounter++, ...req.body };
    properties.push(newProperty);
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ error: "Error creating property" });
  }
};

// Delete a property
export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    properties = properties.filter((p) => p.id !== id);
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting property" });
  }
};
