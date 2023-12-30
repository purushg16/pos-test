export default {
  data: [
    {
      _id: "658d3385a8c96935b2f09bfb",
      crDr: "dr",
      customerId: {
        _id: "65801dc9d3c12b45ab048459",
        name: "Rajan",
      },
      amount: 15,
      cartId: {
        _id: "658d3384a8c96935b2f09bea",
        product: [
          {
            productId: {
              _id: "658c3259a411b335ed303020",
              itemName: "சம்பார் வடை",
              code: 1002,
              unit: "கிலோகிராம்",
              topUnit: "மூட்டை",
            },
            stock: 1,
            salesPrice: 17,
            selectedUnit: 1,
            _id: "658d3384a8c96935b2f09beb",
          },
        ],
      },
      money: "pending",
      createdAt: "2023-12-28T08:36:21.232Z",
      __v: 0,
      description: "1002",
    },
    {
      _id: "658d33c0a8c96935b2f09c07",
      crDr: "dr",
      customerId: {
        _id: "65801dc9d3c12b45ab048459",
        name: "Rajan",
      },
      amount: 15,
      cartId: null,
      description: "15",
      money: "paid",
      createdAt: "2023-12-28T08:37:20.376Z",
      __v: 0,
    },
    {
      _id: "658d33e8a8c96935b2f09c21",
      crDr: "cr",
      supplierId: {
        _id: "65801e86d3c12b45ab048462",
        name: "Seyad Home Industries Private Limited",
      },
      amount: 100,
      cartId: {
        _id: "658d33e8a8c96935b2f09c18",
        product: [
          {
            productId: {
              _id: "658c3259a411b335ed303036",
              itemName: "பால் பொடி",
              code: 1013,
              unit: "கிலோகிராம்",
              topUnit: "மூட்டை",
            },
            stock: 1,
            purchasePrice: 100,
            _id: "658d33e8a8c96935b2f09c19",
          },
        ],
      },
      description: "1234",
      money: "pending",
      createdAt: "2023-12-28T08:38:00.688Z",
      __v: 0,
    },
    {
      _id: "658d3400a8c96935b2f09c28",
      crDr: "cr",
      supplierId: {
        _id: "65801e86d3c12b45ab048462",
        name: "Seyad Home Industries Private Limited",
      },
      amount: 100,
      cartId: null,
      description: "1234",
      money: "paid",
      createdAt: "2023-12-28T08:38:24.210Z",
      __v: 0,
    },
    {
      _id: "658d451d392838d3608b2c37",
      crDr: "dr",
      customerId: {
        _id: "65801dc9d3c12b45ab048459",
        name: "Rajan",
      },
      amount: 8,
      cartId: {
        _id: "658d451d392838d3608b2c26",
        product: [
          {
            productId: {
              _id: "658c3259a411b335ed303028",
              itemName: "மிக்ஸர் பொடி",
              code: 1006,
              unit: "கிலோகிராம்",
              topUnit: "மூட்டை",
            },
            stock: 1,
            salesPrice: 9,
            selectedUnit: 1,
            _id: "658d451d392838d3608b2c27",
          },
        ],
      },
      description: "5009",
      money: "pending",
      createdAt: "2023-12-28T09:51:25.983Z",
      __v: 0,
    },
  ],
};
