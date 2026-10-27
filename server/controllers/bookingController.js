import Booking from "../models/Booking.js";
import Service from "../models/Service.js";

export const createBooking = async (req, res) => {
  try {
    const {
      serviceId,
      appointmentDate,
      notes = "",
    } = req.body;

    if (!serviceId || !appointmentDate) {
      return res.status(400).json({
        message:
          "Service and appointment date are required",
      });
    }

    const service = await Service.findById(serviceId);

    if (!service || !service.active) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    const date = new Date(appointmentDate);

    if (
      Number.isNaN(date.getTime()) ||
      date <= new Date()
    ) {
      return res.status(400).json({
        message:
          "Please select a future appointment date",
      });
    }

    const booking = await Booking.create({
      user: req.user._id,
      service: service._id,
      appointmentDate: date,
      notes,
    });

    await booking.populate("service");

    res.status(201).json(booking);
  } catch (error) {
    console.error("Create booking error:", error);

    res.status(500).json({
      message: "Unable to create booking",
    });
  }
};

export const getMyBookings = async (
  req,
  res
) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("service")
      .sort({ appointmentDate: 1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve bookings",
    });
  }
};

export const cancelBooking = async (
  req,
  res
) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        message: "Booking is already cancelled",
      });
    }

    booking.status = "cancelled";

    await booking.save();

    res.json({
      message: "Booking cancelled",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to cancel booking",
    });
  }
};