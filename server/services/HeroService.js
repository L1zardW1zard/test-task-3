import Superhero from "../models/Superhero.js";

class HeroService {
  async create(hero) {
    const createrHero = await Superhero.create(hero);
    return createrHero;
  }

  async getAllOnPage(page = 1) {
    const PAGE_SIZE = 5;
    const skip = (page - 1) * PAGE_SIZE;
    return await Superhero.find({}).skip(skip).limit(PAGE_SIZE);
  }

  async getAll() {
    return await Superhero.find({});
  }

  async getTotalAmount() {
    const amount = (await Superhero.find()).length;
    return amount;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("ID not found");
    }
    const superhero = await Superhero.findById(id);
    return superhero;
  }

  async update(req, res) {
    try {
      const superhero = req.body;
      if (!superhero._id) {
        res.status(400).json({ message: "Id not found" });
      }
      const updatedSuperhero = await Superhero.findByIdAndUpdate(superhero._id, superhero, { new: true });
      return res.json(updatedSuperhero);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Id not found" });
      }
      const superhero = await Superhero.findByIdAndDelete(id);
      return res.json(superhero);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new HeroService();
