import { Request, Response } from 'express';

// Dummy data for illustration
let items: string[] = ["item1", "item2", "item3"];

// GET /api/items
export const getItems = (req: Request, res: Response) => {
  res.status(200).json({ items });
};

