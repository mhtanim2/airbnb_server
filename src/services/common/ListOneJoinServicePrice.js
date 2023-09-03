const ListOneJoinServicePrice = async (Request, DataModel, JoinStage) => {
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
          $facet: {
            Total: [{ $count: 'count' }],
            Rows: [],
          },
        },
      ]);
    } else {
      data = await DataModel.aggregate([
        JoinStage,
        {
          $facet: {
            Total: [{ $count: 'count' }],
            Rows: [],
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

module.exports = ListOneJoinServicePrice;
