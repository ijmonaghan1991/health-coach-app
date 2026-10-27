import Service from "../models/Service.js";

export const getServices = async (req, res) => {
  try {
    const services = await Service.find({
      active: true,
    }).sort({ createdAt: -1 });

    res.json(services);
  } catch (error) {
    res.status(500).json({
      message: "Unable to load services",
    });
  }
};

export const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json(service);
  } catch (error) {
    res.status(404).json({
      message: "Service not found",
    });
  }
};

export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({
      message: "Unable to create service",
    });
  }
};