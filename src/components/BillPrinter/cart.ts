export default {
  data: [
    {
      _id: "659e18f3dda3f80f5b81612e",
      billNo: 1001,
      customer: {
        _id: "659e14ccdda3f80f5b8160b6",
        name: "கருப்பையா சகாயம்",
      },
      billAmount: 20,
      cart: {
        _id: "659e18f3dda3f80f5b81612b",
        product: [
          {
            productId: {
              _id: "659d6b438589151dfa375f74",
              itemName: "23 ரூ மஞ்சள்தூள் (சக்தி ) 50கி",
              code: 192,
              unit: "pcs",
              topUnit: "சரம்",
              mrp: 12,
            },
            stock: 2,
            salesPrice: 10,
            selectedUnit: 1,
            _id: "659e18f3dda3f80f5b81612c",
          },
        ],
      },
      gstinNo: "Test",
      billType: "retail",
      billerName: "யாதவகுமார்",
      itemHandled: true,
      handler: "சந்தியா",
      delivery: true,
      paymentMode: "cash",
      payment: "no-credit",
      partialAmount: null,
      createdAt: "2024-01-10T04:11:31.483Z",
      __v: 0,
    },
    {
      _id: "659e19bbdda3f80f5b81615e",
      billNo: 1002,
      customer: {
        _id: "659e1894dda3f80f5b816127",
        name: "அங்காள பரமேஸ்வரி ",
      },
      billAmount: 15,
      cart: {
        _id: "659e19bbdda3f80f5b81615b",
        product: [
          {
            productId: {
              _id: "659d6b438589151dfa376115",
              itemName: "18 ரூ மெரூன் சிகப்பு 50கி",
              code: 609,
              unit: "pcs",
              topUnit: "சரம்",
              mrp: 20,
            },
            stock: 1,
            salesPrice: 15,
            selectedUnit: 1,
            _id: "659e19bbdda3f80f5b81615c",
          },
        ],
      },
      gstinNo: "Test",
      billType: "retail",
      billerName: "யாதவகுமார்",
      itemHandled: true,
      handler: "சந்தியா",
      delivery: true,
      paymentMode: "cash",
      payment: "credit",
      partialAmount: 10,
      createdAt: "2024-01-10T04:14:51.548Z",
      __v: 0,
    },
  ],
};