const ListOneJoinServiceCategory = async (Request, DataModel, SearchArray, JoinStage) => {
  try {
    const searchValue = Request.params.searchKeyword;
    let data;

    (searchValue !== '0') ? data = await DataModel.aggregate([
      JoinStage,
      {
        $unwind: '$category',
      },
      { $match: { $or: SearchArray } },
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
    ]) : data = await DataModel.aggregate([
      JoinStage,
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
              LocationValue: '$LocationValue',
              Region: '$Region',
              ChickIn: '$ChickIn',
              ChickOut: '$ChickOut',
            },
          },
        },
      },
    ]);

    return { status: 'success', data };
  } catch (error) {
    return { status: 'fail', data: error };
  }
};

module.exports = ListOneJoinServiceCategory;
