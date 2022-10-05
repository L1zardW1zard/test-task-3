import Superhero from "./models/Superhero.js";

class SuperheroController {
  async create(req, res) {
    try {
      const {
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
        Images,
      } = req.body;
      const superhero = await Superhero.create({
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
        Images,
      });
      res.json(superhero);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAll(req, res) {
    try {
      const superheroes = await Superhero.find();
      return res.json(superheroes);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Id not found" });
      }
      const superhero = await Superhero.findById(id);
      return res.json(superhero);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async update(req, res) {
    try {
      const superhero = req.body;
      if (!superhero._id) {
        res.status(400);
        //res.status(400).json({ message: "Id not found" });
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
