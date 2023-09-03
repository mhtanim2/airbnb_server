const ListOneJoinServiceByDateTime = async (Request, DataModel, JoinStage, SearchArray) => {
  try {
    const searchValue = Request.params.searchKeyword;
    const { ChickIn, ChickOut } = Request.params;
    const startDate = new Date(ChickIn);
    const endDate = new Date(ChickOut);
    let data;
    if ((ChickIn !== '0' || ChickOut !== '0') && searchValue !== '0') {
      data = await DataModel.aggregate([
        JoinStage,
        {
          $match: {
            ChickIn: {
              $gte: startDate,
            },
            ChickOut: {
              $lte: endDate,
            },
          },
        },
        {
          $match: { $or: SearchArray },
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
                ChickIn: '$ChickIn',
                ChickOut: '$ChickOut',
              },
            },
          },
        },
      ]);
    } else if ((ChickIn !== '0' || ChickOut !== '0') && searchValue === '0') {
      data = await DataModel.aggregate([
        JoinStage,
        {
          $match: {
            ChickIn: {
              $gte: startDate,
            },
            ChickOut: {
              $lte: endDate,
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
                ChickIn: '$ChickIn',
                ChickOut: '$ChickOut',
              },
            },
          },
        },
      ]);
    } else if ((ChickIn === '0' || ChickOut === '0') && searchValue !== '0') {
      data = await DataModel.aggregate([
        JoinStage,
        {
          $match: { $or: SearchArray },
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
                ChickIn: '$ChickIn',
                ChickOut: '$ChickOut',
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
                      ChickIn: '$ChickIn',
                      ChickOut: '$ChickOut',
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

module.exports = ListOneJoinServiceByDateTime;
