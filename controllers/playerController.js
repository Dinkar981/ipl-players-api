const Player = require("../models/playerModel");

exports.listPlayers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      team,
      search,
      sortBy,
      order = "asc",
    } = req.query;
    const filter = {};
    if (team) filter.team = team;
    if (search) filter.name = { $regex: search, $options: "i" };

    const sortOptions = sortBy ? { [sortBy]: order === "asc" ? 1 : -1 } : {};

    const total = await Player.countDocuments(filter);
    const players = await Player.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ page: Number(page), limit: Number(limit), total, players });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPlayer = async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json({ message: "Player created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    await Player.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Player updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.json({ message: "Player deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPlayerDescription = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: "Error fetching player", error });
  }
};
