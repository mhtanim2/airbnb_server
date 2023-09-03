const express = require('express');
const ItemCategoryController = require('../controllers/MenuItem/ItemCategoryController');

const ItemController = require('../controllers/MenuItem/ItemController');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/status', ItemController.status); // Checking Status
// Item Category
router.post('/category/create', ItemCategoryController.CreateItemCategory);
router.get('/category/:id', ItemController.GetMenuItemById);
router.post('/category/update/:id', ItemCategoryController.UpdateItemCategory);
router.get(
  '/category/:pageNo/:perPage/:searchKeyword',
  ItemCategoryController.ItemCategoryList,
);
router.get('/categories', ItemCategoryController.CategoryTypesDropDown);
router.get('/category/number/places', ItemCategoryController.categoryWiseNumOfMenuItem);
router.get('/category/delete/:id', ItemCategoryController.deleteCategory);
// router.get('/MenuItemTypesDetailsByID/:id', ItemCategoryController.MenuItemTypesDetailsByID);

// Menu Item
router.post('/place/create', ItemController.CreateItem);
router.post('/place/update/:id', ItemController.UpdateItem);
router.get('/place/list/:searchKeyword', ItemController.ItemList);
router.get('/places/category/:searchKeyword', ItemController.categoryWiseItems);
router.get('/places/items/:ChickIn/:ChickOut/:searchKeyword', ItemController.getByRegionAndDate);
router.get('/places/items/:minPrice/:maxPrice', ItemController.filterPrices);
router.get('/place/delete/:id', ItemController.deleteItem);
router.get('/place/get/:id', ItemController.GetMenuItemById);
router.get('/place/details/:id', ItemController.GetItemDetailsById);
router.get('/items/price/:minPrice/:maxPrice', ItemController.countItemFilterList);

module.exports = router;
