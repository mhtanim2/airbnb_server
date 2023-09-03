const ListOneJoinServiceForPrice = async (Request, DataModel, JoinStage) => {
  try {
    const { minPrice, maxPrice } = Request.params;
    const minPriceInt = parseInt(minPrice, 10);
    const maxPriceInt = parseInt(maxPrice, 10);
    let data;
    if (minPrice !== '0' || maxPrice !== '0') {
      data = await DataModel.aggregate([
        JoinStage,
        {
          $match: {
            UnitPrice: {
              $gte: minPriceInt,
              $lte: maxPriceInt,
            },
          },
        },
        {
          $unwind: '$category',
        },
        {
          $group: {
            _id: '$category._id',
            ItemCategory: { $first: '$category.ItemCategory' },
            Items: {
              $push: {
                _id: '$_id',
                ItemName: '$ItemName',
                Description: '$Description',
                UnitPrice: '$UnitPrice',
                Discount: '$Discount',
                ItemImage: '$ItemImage',
                CreatedDate: '$CreatedDate',
                RoomCount: '$RoomCount',
                BathRoomCont: '$BathRoomCont',
                GuestCount: '$GutterCount',
                Region: '$Region',
                minPrice: '$minPrice',
                maxPrice: '$maxPrice',
              },
            },
          },
        },
      ]);
    } else {
      data = await DataModel.aggregate([
        JoinStage,
        {
          $unwind: '$category',
        },
        {
          $facet: {
            itemsGroup: [
              {
                $group: {
                  _id: '$category._id',
                  ItemCategory: { $first: '$category.ItemCategory' },
                  Items: {
                    $push: {
                      _id: '$_id',
                      ItemName: '$ItemName',
                      Description: '$Description',
                      UnitPrice: '$UnitPrice',
                      Discount: '$Discount',
                      ItemImage: '$ItemImage',
                      CreatedDate: '$CreatedDate',
                      RoomCount: '$RoomCount',
                      BathRoomCont: '$BathRoomCont',
                      GuestCount: '$GutterCount',
                      LocationValue: '$LocationValue',
                      Region: '$Region',
                      minPrice: '$minPrice',
                      maxPrice: '$maxPrice',
                    },
                  },
                },
              },
            ],
            totalCount: [
              {
                $count: 'count',
              },
            ],
          },
        },
      ]);
    }
    return {
      status: 'success', data,
    };
  } catch (error) {
    return { status: 'fail', data: error };
  }
};

module.exports = ListOneJoinServiceForPrice;
