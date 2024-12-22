const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema(
  {
    tripID: {
      type: String,
      required: true,
    },
    tripName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    tripImage: {
      type: String,
    },
    startingTime: {
      type: Date,
      required: true,
    },
    endingTime: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    groupSize: {
      type: Number,
      required: true,
    },
    cancellationPolicy: {
      type: Array,
      default: [{ 15: 100, 7: 50, 0: 0 }],
    },
    duration: {
      type: String,
    },
    organizerEmail: {
      type: String,
      required: true,
    },
    slots: [
      {
        start: {
          type: Date,
          required: true,
        },
        end: {
          type: Date,
          required: true,
        },
        seats: {
          type: Number,
          required: true,
        },
      },
    ],
    accommodations: [
      {
        name: {
          type: String,
        },
        description: {
          type: String,
        },
        imageUrl: {
          type: String,
        },
        amenities: [
          {
            type: String,
          },
        ],
      },
    ],
    // diningExperiences: [
    //   {
    //     name: {
    //       type: String,
    //     },
    //     description: {
    //       type: String,
    //     },
    //     imageUrl: {
    //       type: String,
    //     },
    //   },
    // ],
    galleryCategories: [
      {
        title: {
          type: String,
        },
        images: [
          {
            url: {
              type: String,
            },
            alt: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Trip = new mongoose.model("trip", TripSchema);
module.exports = Trip;
