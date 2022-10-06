import Superhero from "../models/Superhero.js";
import HeroService from "../services/HeroService.js";

class SuperheroController {
  async create(req, res) {
    try {
      console.log(req.body);
      const superhero = await HeroService.create(req.body);
      res.json(superhero);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page);
      const superheroes = await HeroService.getAll(page);
      res.json(superheroes);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getOne(req, res) {
    try {
      const superhero = await HeroService.getOne(req.params.id);
      res.json(superhero);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getTotalAmount(req, res) {
    try {
      const totalHeroAmount = await HeroService.getTotalAmount();
      res.json(totalHeroAmount);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async update(req, res) {
    try {
      const superhero = req.body;
      if (!superhero._id) {
        res.status(400).json({ message: "Id not found" });
      }
      const updatedSuperhero = await Superhero.findByIdAndUpdate(
        superhero._id,
        superhero,
        { new: true }
      );
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

export default new SuperheroController();
