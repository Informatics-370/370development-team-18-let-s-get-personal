using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using IPKP___API.Controllers.Models.Entities;
using IPKP___API.Controllers.Models.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace IPKP___API.Controllers.Models.Repository
{
    public class IPKPRepository : IIPKPRepository
    {
        private readonly AppDbContext _appDbContext;
        public IPKPRepository(AppDbContext appDbContext)
        {
          _appDbContext = appDbContext;
        }
        public void Add<T>(T entity) where T : class
        {
          _appDbContext.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
          _appDbContext.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }

        public void Update<T>(T entity) where T : class
        {
            _appDbContext.Update(entity);
        }

//admins
        public async Task<Admin[]> GetAllAdminssAsync()
        {
            IQueryable<Admin> query = _appDbContext.Admin;
            return await query.ToArrayAsync();
        }
        public async Task<Admin> GetAdminDetailsAsync(Guid admin_ID)
        {
            IQueryable<Admin> query = _appDbContext.Admin
                      .Where(u => u.Admin_ID == admin_ID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Admin> GetAdmin(string username)
        {
            return await _appDbContext.Admin
                .FirstOrDefaultAsync(x => x.Username == username);
        }

 //Customers
        public async Task<Customer[]> GetAllCustomersAsync()
        {
          IQueryable<Customer> query = _appDbContext.Customers;
          return await query.ToArrayAsync();
        }
        public async Task<Customer> GetCustomerDetailsAsync(Guid customer_ID)
        {
            IQueryable<Customer> query = _appDbContext.Customers
                      .Where(u => u.Customer_ID == customer_ID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Customer> GetUser(string username)
        {
            return await _appDbContext.Customers
                .FirstOrDefaultAsync(x => x.Username == username);
        }

//employees
        public async Task<Employee[]> GetAllEmployeesAsync()
        {
            IQueryable<Employee> query = _appDbContext.Employees;
            return await query.ToArrayAsync();
        }
        public async Task<Employee> GetEmployeeDetailsAsync(Guid employee_ID)
        {
            IQueryable<Employee> query = _appDbContext.Employees
                      .Where(u => u.Employee_ID == employee_ID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Employee> GetEmployee(string username)
        {
            return await _appDbContext.Employees
                .FirstOrDefaultAsync(x => x.Username == username);
        }

//users
        public async Task<User[]> GetAllUsersAsync()
        {
            IQueryable<User> query = _appDbContext.Users;
            return await query.ToArrayAsync();
        }
        public async Task<User> GetUserDetailsAsync(Guid user_ID)
        {
            IQueryable<User> query = _appDbContext.Users
                      .Where(u => u.User_ID == user_ID);
            return await query.FirstOrDefaultAsync();
        }

//user role
        public async Task<User_Role> GetUserRoleDetailsAsync(int user_Role_ID)
        {
            IQueryable<User_Role> query = _appDbContext.User_Roles
                      .Where(u => u.User_Role_ID == user_Role_ID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<User_Role[]> GetAllUserRolesAsync()
        {
            IQueryable<User_Role> query = _appDbContext.User_Roles;
            return await query.ToArrayAsync();
        }

//deliveries
        public async Task<Delivery[]> GetAllDeliveriesAsync()
        {
          IQueryable<Delivery> query = _appDbContext.Deliveries;
          return await query.ToArrayAsync();
        }
        public async Task<Delivery> GetDeliveryDetailsAsync(Guid delivery_ID)
        {
            IQueryable<Delivery> query = _appDbContext.Deliveries
                      .Where(u => u.Delivery_ID == delivery_ID);
            return await query.FirstOrDefaultAsync();
        }
        public object GetDeliveryByCompany(string company)
        {
            List<DeliveryVM> deliveries = (
                from com in _appDbContext.Delivery_Companies.ToList()
                join d in _appDbContext.Deliveries.ToList()
                on com.Delivery_Company_ID equals d.Delivery_Company_ID
                join a in _appDbContext.Delivery_Address.ToList()
                on d.Delivery_Address_ID equals a.Delivery_Address_ID


                select new DeliveryVM
                {
                    Delivery_Price = com.Delivery_Price,
                    Delivery_Status = d.Delivery_Status,
                    DateDelivered = d.DateDelivered,

                    Delivery_Company_Name = com.Delivery_Company_Name,

                    StreetName = a.StreetName,
                    StreetNumber = a.StreetNumber,
                    City = a.City,
                    Dwelling_Type = a.Dwelling_Type,
                    Unit_Number = a.Unit_Number,
                    Province = a.Province,
                    AreaCode = a.AreaCode,
                }
                ).ToList();

            //return deliveries;
            IEnumerable<DeliveryVM> query = deliveries.Where(x => x.Delivery_Company_Name == company);
            return query;
        }
        public object GetAllDeliveries()
        {
            List<DeliveryVM> deliveries = (
                from com in _appDbContext.Delivery_Companies.ToList()
                join d in _appDbContext.Deliveries.ToList()
                on com.Delivery_Company_ID equals d.Delivery_Company_ID
                join a in _appDbContext.Delivery_Address.ToList()
                on d.Delivery_Address_ID equals a.Delivery_Address_ID

                select new DeliveryVM
                {
                    Delivery_Price = com.Delivery_Price,
                    Delivery_Status = d.Delivery_Status,

                    Delivery_Company_Name = com.Delivery_Company_Name,

                    StreetName = a.StreetName,
                    StreetNumber = a.StreetNumber,
                    City = a.City,
                    Dwelling_Type = a.Dwelling_Type,
                    Unit_Number = a.Unit_Number,
                    Province = a.Province,
                    AreaCode = a.AreaCode,
                }
                ).ToList();

            return deliveries;
        }
        public object GetDeliveryBySatus(string status)
        {
            List<DeliveryVM> deliveries = (
                from com in _appDbContext.Delivery_Companies.ToList()
                join d in _appDbContext.Deliveries.ToList()
                on com.Delivery_Company_ID equals d.Delivery_Company_ID
                join a in _appDbContext.Delivery_Address.ToList()
                on d.Delivery_Address_ID equals a.Delivery_Address_ID


                select new DeliveryVM
                {
                    Delivery_Price = com.Delivery_Price,
                    Delivery_Status = d.Delivery_Status,
                    DateDelivered = d.DateDelivered,

                    Delivery_Company_Name = com.Delivery_Company_Name,

                    StreetName = a.StreetName,
                    StreetNumber = a.StreetNumber,
                    City = a.City,
                    Dwelling_Type = a.Dwelling_Type,
                    Unit_Number = a.Unit_Number,
                    Province = a.Province,
                    AreaCode = a.AreaCode,
                }
                ).ToList();

            //return deliveries;
            IEnumerable<DeliveryVM> query = deliveries.Where(x => x.Delivery_Status == status);
            return query;
        }
        public object GetDeliveryByID(Guid deliveryID)
        {
            List<DeliveryVM> deliveries = (
                from com in _appDbContext.Delivery_Companies.ToList()
                join d in _appDbContext.Deliveries.ToList()
                on com.Delivery_Company_ID equals d.Delivery_Company_ID
                join a in _appDbContext.Delivery_Address.ToList()
                on d.Delivery_Address_ID equals a.Delivery_Address_ID

                select new DeliveryVM
                {
                    Delivery_ID = d.Delivery_ID,
                    Delivery_Price = com.Delivery_Price,
                    Delivery_Status = d.Delivery_Status,

                    Delivery_Company_Name = com.Delivery_Company_Name,

                    StreetName = a.StreetName,
                    StreetNumber = a.StreetNumber,
                    City = a.City,
                    Dwelling_Type = a.Dwelling_Type,
                    Unit_Number = a.Unit_Number,
                    Province = a.Province,
                    AreaCode = a.AreaCode,
                }
                ).ToList();

            //return deliveries;
            IEnumerable<DeliveryVM> query = deliveries.Where(x => x.Delivery_ID == deliveryID);
            return query;
        }

//delivery company
        public async Task<Delivery_Company[]> GetAllDeliveryCompaniesAsync()
        {
          IQueryable<Delivery_Company> query = _appDbContext.Delivery_Companies;
          return await query.ToArrayAsync();
        }
        public async Task<Delivery_Company> GetDeliveryCompanyDetailsAsync(Guid delivery_Company_ID)
        {
            IQueryable<Delivery_Company> query = _appDbContext.Delivery_Companies
                      .Where(u => u.Delivery_Company_ID == delivery_Company_ID);
            return await query.FirstOrDefaultAsync();
        }
        
//orders
        public async Task<Order[]> GetAllOrdersAsync()
        {
          IQueryable<Order> query = _appDbContext.Orders;
          return await query.ToArrayAsync();
        }
        public async Task<Order> GetOrderDetailsAsync(Guid order_ID)
        {
            IQueryable<Order> query = _appDbContext.Orders
              .Where(u => u.Order_ID == order_ID);
            return await query.FirstOrDefaultAsync();
        }
        public object GetOrderByCustomerAsync(Guid customer_ID)
        {
            List<SalesVM> orders =
                (
                    from o in _appDbContext.Orders.ToList()
                    join c in _appDbContext.Customers.ToList()
                    on o.Customer_ID equals c.Customer_ID
                    join s in _appDbContext.Stock_Items.ToList()
                    on o.Stock_Item_ID equals s.Stock_Item_ID

                    select new SalesVM
                    {
                        Customer_ID = c.Customer_ID,
                        FirstName = c.FirstName,
                        UserName = c.Username,

                        Stock_Item_Name = s.Stock_Item_Name,
                        Stock_Item_ID = s.Stock_Item_ID,
                        
                        Order_Line_Item_Quantity = o.Order_Quantity,
                        Order_Completed_Date = o.Order_Completed_Date,
                    }

                ).ToList();

            IEnumerable<SalesVM> query = orders.Where(x => x.Customer_ID == customer_ID);
            return query;
        }

//order requests
        public async Task<Order_Request> GetOrderRequestAsync(Guid order_Request_ID)
        {
            IQueryable<Order_Request> query = _appDbContext.Order_Requests
                      .Where(u => u.Order_Request_ID == order_Request_ID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Order_Request[]> GetAllOrderRequestsAsync()
        {
            IQueryable<Order_Request> query = _appDbContext.Order_Requests;
            return await query.ToArrayAsync();
        }

//personalisation
        public async Task<Personalisation_Design> GetPersonalisationAsync(Guid personalisation_ID)
        {
            IQueryable<Personalisation_Design> query = _appDbContext.Personalisation_Designs
              .Where(u => u.Personalisation_Design_ID == personalisation_ID);
            return await query.FirstOrDefaultAsync();
        }

//stock item images
        public async Task<Stock_Image[]> GetAllStockItmagesAsync()
        {
            IQueryable<Stock_Image> query = _appDbContext.Stock_Images;
            return await query.ToArrayAsync();
        }
        public async Task<Stock_Image> GetStockImageByID(Guid stock_image_id)
        {
            IQueryable<Stock_Image> query = _appDbContext.Stock_Images
              .Where(u => u.Stock_Image_ID == stock_image_id);
            return await query.FirstOrDefaultAsync();
        }

//Stock Items
        public async Task<Stock_Item[]> GetAllStockItemsAsync()
        {
            IQueryable<Stock_Item> query = _appDbContext.Stock_Items;
            return await query.ToArrayAsync();
        }
        public async Task<IEnumerable<Stock_Item>> GetAllStockItemsIncludingPriceHistoryAsync()
        {
            //IQueryable<Stock_Item> query = _appDbContext.Stock_Items;
            return await _appDbContext.Stock_Items
                .Include(x => x.StockPriceHistory)
                .ToListAsync();
        }

        public async Task<Stock_Item> GetStockItemByName(string stock_Item_Name)
        {
            IQueryable<Stock_Item> query = _appDbContext.Stock_Items
              .Where(u => u.Stock_Item_Name == stock_Item_Name);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Stock_Item> GetStockItemDetailsAsync(Guid stock_Item_ID)
        {
            IQueryable<Stock_Item> query = _appDbContext.Stock_Items
                      .Where(u => u.Stock_Item_ID == stock_Item_ID);
            return await query.FirstOrDefaultAsync();
        }
        public object GetStockNames()
        {
            List<StockItemViewModel> stockitems = (
                from c in _appDbContext.Stock_Item_Colours.ToList()
                join s in _appDbContext.Stock_Items.ToList()
                on c.Stock_Item_Colour_ID equals s.Stock_Item_Colour_ID
                join t in _appDbContext.Stock_Types.ToList()
                on s.Stock_Type_ID equals t.Stock_Type_ID
                join i in _appDbContext.Stock_Images.ToList()
                on s.Stock_Image_ID equals i.Stock_Image_ID

                select new StockItemViewModel
                {
                    Stock_Item_ID = s.Stock_Item_ID,
                    Stock_Item_Name = s.Stock_Item_Name,
                    Stock_Item_Price = s.Stock_Item_Price,
                    Stock_Item_Size = s.Stock_Item_Size,
                    Stock_Item_Quantity = s.Stock_Item_Quantity,
                    Inventory_Comments = s.Inventory_Comments,
                    Inventory_Date = s.Inventory_Date,
                    Stock_Sale_Quantity = s.Stock_Sale_Quantity,

                    Stock_Item_Colour_ID = c.Stock_Item_Colour_ID,
                    StockColourName = c.Stock_Item_Colour_Name,

                    Stock_Type_ID = t.Stock_Type_ID,
                    StockTypeName = t.Stock_Type_Name,

                    Stock_Image_ID = i.Stock_Image_ID,
                    StockImageName = i.Stock_Image_Name,
                    StockImageFile = i.Stock_Image_File,
                }
                ).ToList();
            return stockitems;
        }
        public object GetStockList()
        {
            List<ExcelVM> stockitems = (
                from c in _appDbContext.Stock_Item_Colours.ToList()
                join s in _appDbContext.Stock_Items.ToList()
                on c.Stock_Item_Colour_ID equals s.Stock_Item_Colour_ID
                join t in _appDbContext.Stock_Types.ToList()
                on s.Stock_Type_ID equals t.Stock_Type_ID
                join i in _appDbContext.Stock_Images.ToList()
                on s.Stock_Image_ID equals i.Stock_Image_ID

                select new ExcelVM
                {
                    Stock_Item_Name = s.Stock_Item_Name,
                    Stock_Item_Price = s.Stock_Item_Price,
                    Stock_Item_Size = s.Stock_Item_Size,
                    Stock_Item_Quantity = s.Stock_Item_Quantity,

                    Inventory_Comments = s.Inventory_Comments,
                    Inventory_Date = s.Inventory_Date,

                    Stock_Type_Name = t.Stock_Type_Name,
                    Stock_Image_Name = i.Stock_Image_Name,
                    Stock_Colour_Name = c.Stock_Item_Colour_Name,
                }
                ).ToList();
            return stockitems;
        }
        public object GetStockNamesByType(Guid stocktypeID)
        {
            List<StockItemViewModel> stockitems = (
                from c in _appDbContext.Stock_Item_Colours.ToList()
                join s in _appDbContext.Stock_Items.ToList()
                on c.Stock_Item_Colour_ID equals s.Stock_Item_Colour_ID
                join t in _appDbContext.Stock_Types.ToList()
                on s.Stock_Type_ID equals t.Stock_Type_ID
                join i in _appDbContext.Stock_Images.ToList()
                on s.Stock_Image_ID equals i.Stock_Image_ID

                select new StockItemViewModel
                {
                    Stock_Item_ID = s.Stock_Item_ID,
                    Stock_Item_Name = s.Stock_Item_Name,
                    Stock_Item_Price = s.Stock_Item_Price,
                    Stock_Item_Size = s.Stock_Item_Size,
                    Stock_Item_Quantity = s.Stock_Item_Quantity,
                    Inventory_Comments = s.Inventory_Comments,
                    Inventory_Date = s.Inventory_Date,


                    Stock_Item_Colour_ID = c.Stock_Item_Colour_ID,
                    StockColourName = c.Stock_Item_Colour_Name,

                    Stock_Type_ID = t.Stock_Type_ID,
                    StockTypeName = t.Stock_Type_Name,

                    Stock_Image_ID = i.Stock_Image_ID,
                    StockImageName = i.Stock_Image_Name,
                    StockImageFile = i.Stock_Image_File,
                }
                ).ToList();
            IEnumerable<StockItemViewModel> query = stockitems.Where(x => x.Stock_Type_ID == stocktypeID);
            return query;
        }

//stock types
        public async Task<Stock_Type[]> GetAllStockTypesAsync()
        {
          IQueryable<Stock_Type> query = _appDbContext.Stock_Types;
          return await query.ToArrayAsync();
        }
        public async Task<Stock_Type> GetStockTypeDetailsAsync(Guid stock_Type_ID)
        {
            IQueryable<Stock_Type> query = _appDbContext.Stock_Types
                      .Where(u => u.Stock_Type_ID == stock_Type_ID);
            return await query.FirstOrDefaultAsync();
        }

//Stock item colours
        public async Task<Stock_Item_Colour[]> GetAllStockItemColoursAsync()
        {
            IQueryable<Stock_Item_Colour> query = _appDbContext.Stock_Item_Colours;
            return await query.ToArrayAsync();
        }
        public async Task<Stock_Item_Colour> GetStockItemColourDetailsAsync(Guid stock_Item_Colour_ID)
        {
            IQueryable<Stock_Item_Colour> query = _appDbContext.Stock_Item_Colours
                      .Where(u => u.Stock_Item_Colour_ID == stock_Item_Colour_ID);
            return await query.FirstOrDefaultAsync();
        } 

//product ratings
        public async Task<Product_Rating[]> GetAllProductRatingsAsync()
        {
            IQueryable<Product_Rating> query = _appDbContext.Product_Ratings;
            return await query.ToArrayAsync();
        }
        public async Task<Product_Rating> GetProductRatingDetailsAsync(Guid product_Rating_ID)
        {
          IQueryable<Product_Rating> query = _appDbContext.Product_Ratings
                    .Where(u => u.Product_Rating_ID == product_Rating_ID);
          return await query.FirstOrDefaultAsync();
        }
        public object GetProductRatingDetails(Guid product_Rating_ID)
        {
            List<ProductRatingViewModel> ratings = (

                  from pr in _appDbContext.Product_Ratings.ToList()
                  join s in _appDbContext.Stock_Items.ToList()
                  on pr.Stock_Item_ID equals s.Stock_Item_ID

                  select new ProductRatingViewModel
                  {
                      Stock_Item_Name = s.Stock_Item_Name,

                      Product_Rating_ID = pr.Product_Rating_ID,
                      Product_Rating_Comments = pr.Product_Rating_Comments,
                      Product_Star_Rating = pr.Product_Star_Rating,
                  }
                  ).ToList();

            IEnumerable<ProductRatingViewModel> query = ratings.Where(x => x.Product_Rating_ID == product_Rating_ID);
            return query;
        }
        public object GetRatingPerProduct()
        {
            List<ProductRatingViewModel> ratings = (

                from pr in _appDbContext.Product_Ratings.ToList()
                join s in _appDbContext.Stock_Items.ToList()
                on pr.Stock_Item_ID equals s.Stock_Item_ID

                select new ProductRatingViewModel
                {
                    Stock_Item_Name = s.Stock_Item_Name,
                    Product_Star_Rating = pr.Product_Star_Rating,
                }
                ).ToList();

            return ratings;
        }
        public object GetProductRatings()
        {
            List<ProductRatingViewModel> ratings = (

                from pr in _appDbContext.Product_Ratings.ToList()
                join s in _appDbContext.Stock_Items.ToList()
                on pr.Stock_Item_ID equals s.Stock_Item_ID
                join c in _appDbContext.Customers.ToList()
                on pr.Customer_ID equals c.Customer_ID

                select new ProductRatingViewModel
                {
                    Stock_Item_Name = s.Stock_Item_Name,
                    Product_Star_Rating = pr.Product_Star_Rating,
                    Product_Rating_Comments = pr.Product_Rating_Comments,
                    Customer_UserName = c.Username,
                }
                ).ToList();

            return ratings;
        }
        public object GetProductRatingByCustomerAsync(Guid customer_ID)
        {
            List<ProductRatingViewModel> ratings = (

                from pr in _appDbContext.Product_Ratings.ToList()
                join s in _appDbContext.Stock_Items.ToList()
                on pr.Stock_Item_ID equals s.Stock_Item_ID
                join c in _appDbContext.Customers.ToList()
                on pr.Customer_ID equals c.Customer_ID

                select new ProductRatingViewModel
                {
                    Stock_Item_Name = s.Stock_Item_Name,
                    Stock_Item_ID = s.Stock_Item_ID,

                    Product_Star_Rating = pr.Product_Star_Rating,
                    Product_Rating_Comments = pr.Product_Rating_Comments,
                    Product_Rating_ID = pr.Product_Rating_ID,

                    Customer_UserName = c.Username,
                    Customer_ID = c.Customer_ID,
                }
                ).ToList();

            IEnumerable<ProductRatingViewModel> query = ratings.Where(x => x.Customer_ID == customer_ID);
            return query;
        }

//experience ratings
        public async Task<Experience_Rating> GetExperienceRatingAsync(Guid Experience_Rating_ID)
        {
            IQueryable<Experience_Rating> query = _appDbContext.Experience_Ratings
                    .Where(u => u.Experience_Rating_ID == Experience_Rating_ID);
            return await query.FirstOrDefaultAsync();
        }
        public object GetAllExperienceRatings()
        {
            List<ExperienceRatingVM> ratings = (

                from e in _appDbContext.Experience_Ratings.ToList()
                join c in _appDbContext.Customers.ToList()
                on e.Customer_ID equals c.Customer_ID

                select new ExperienceRatingVM
                {
                    Experience_Rating_ID = e.Experience_Rating_ID,
                    Experience_Star_Rating = e.Experience_Star_Rating,
                    Experience_Rating_Comments = e.Experience_Rating_Comments,

                    Customer_ID = c.Customer_ID,
                    Customer_Surname = c.Surname,
                    Customer_FirstName = c.FirstName,
                }
            ).ToList();

            return ratings;
        }
        public object GetExperienceRatingByCustomerIDAsync(Guid customer_ID)
        {
            List<ExperienceRatingVM> ratings = (

                from e in _appDbContext.Experience_Ratings.ToList()
                join c in _appDbContext.Customers.ToList()
                on e.Customer_ID equals c.Customer_ID

                select new ExperienceRatingVM
                {
                    Experience_Star_Rating = e.Experience_Star_Rating,
                    Experience_Rating_Comments = e.Experience_Rating_Comments,
                    Experience_Rating_ID = e.Experience_Rating_ID,

                    Customer_ID = c.Customer_ID,
                    Customer_Surname = c.Surname,
                    Customer_FirstName = c.FirstName,
                }
            ).ToList();

            IEnumerable<ExperienceRatingVM> query = ratings.Where(x => x.Customer_ID == customer_ID);
            return query;
        }

//refund policies
        public async Task<Refund_Policy[]> GetAllPoliciesAsync()
        {
            IQueryable<Refund_Policy> query = _appDbContext.Refund_Policies;
            return await query.ToArrayAsync();
        }
        public async Task<Refund_Policy> GetPolicyAsync(Guid Refund_Policy_Id)
        {
            IQueryable<Refund_Policy> query = _appDbContext.Refund_Policies
                    .Where(u => u.Refund_Policy_ID == Refund_Policy_Id);
            return await query.FirstOrDefaultAsync();
        }

//refunds
        public async Task<Refund[]> GetAllPreviousRefunds()
        {
            IQueryable<Refund> query = _appDbContext.Refunds;
            return await query.ToArrayAsync();
        }
        public async Task<Refund> GetPreviousRefund(Guid refund_Id)
        {
            IQueryable<Refund> query = _appDbContext.Refunds
                    .Where(u => u.Refund_ID == refund_Id);
            return await query.FirstOrDefaultAsync();
        }

//GetAllDiscountsAsync
        public async Task<Discount[]> GetAllDiscountsAsync()
        {
            IQueryable<Discount> query = _appDbContext.Discounts;
            return await query.ToArrayAsync();
        }
        public async Task<Discount> GetDiscountAsync(Guid discount_Id)
        {
            IQueryable<Discount> query = _appDbContext.Discounts
                    .Where(u => u.Discount_ID == discount_Id);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Discount> GetDiscountByStockAsync(Guid stockItemID)
        {
            IQueryable<Discount> query = _appDbContext.Discounts
                    .Where(u => u.Stock_Item_ID == stockItemID);
            return await query.FirstOrDefaultAsync();
        }

//Best Sellers
        public object GetAllBestSellersAsync()
        {
            List<BestSellersVM> stockitems = (
                from c in _appDbContext.Stock_Item_Colours.ToList()
                join s in _appDbContext.Stock_Items.ToList()
                on c.Stock_Item_Colour_ID equals s.Stock_Item_Colour_ID
                join t in _appDbContext.Stock_Types.ToList()
                on s.Stock_Type_ID equals t.Stock_Type_ID
                join i in _appDbContext.Stock_Images.ToList()
                on s.Stock_Image_ID equals i.Stock_Image_ID
                join b in _appDbContext.BestSellers.ToList()
                on s.Stock_Item_ID equals b.Stock_Item_ID

                select new BestSellersVM
                {
                    BestSeller_ID = b.BestSeller_ID, 

                    Stock_Item_ID = s.Stock_Item_ID,
                    Stock_Item_Name = s.Stock_Item_Name,
                    Stock_Item_Price = s.Stock_Item_Price,
                    Stock_Item_Size = s.Stock_Item_Size,
                    Stock_Item_Quantity = s.Stock_Item_Quantity,
                    Stock_Sale_Quantity = s.Stock_Sale_Quantity,
                    Inventory_Comments = s.Inventory_Comments,
                    Inventory_Date = s.Inventory_Date,

                    Stock_Type_Name = t.Stock_Type_Name,
                    Stock_Image_Name = i.Stock_Image_Name,
                    Stock_Image_File = i.Stock_Image_File,
                    Stock_Colour_Name = c.Stock_Item_Colour_Name,
                }
                ).ToList();
            return stockitems;
        }
        public async Task<BestSellers> GetBestSellerByID(Guid bestsellerID)
        {
            IQueryable<BestSellers> query = _appDbContext.BestSellers
                    .Where(u => u.BestSeller_ID == bestsellerID);
            return await query.FirstOrDefaultAsync();
        }


 //Order line items       
        public async Task<Order_Line_Item> GetOrderLineItemByID(Guid orderlineitemID)
        {
            IQueryable<Order_Line_Item> query = _appDbContext.Order_Line_Item
                    .Where(u => u.Order_Line_Item_ID == orderlineitemID);
            return await query.FirstOrDefaultAsync();
        }
        public object GetOrderLineDetailsByID(Guid orderlineitemID)
        {
            List<OrderLineItemVM> orderlineitem = (
                from or in _appDbContext.Order_Requests.ToList()
                join orli in _appDbContext.Order_Line_Item.ToList()
                on or.Order_Request_ID equals orli.Order_Request_ID
                //order request
                join cust in _appDbContext.Customers.ToList()
                on or.Customer_ID equals cust.Customer_ID
                join d in _appDbContext.Deliveries.ToList()
                on or.Delivery_ID equals d.Delivery_ID
                join com in _appDbContext.Delivery_Companies.ToList()
                on d.Delivery_Company_ID equals com.Delivery_Company_ID
                join a in _appDbContext.Delivery_Address.ToList()
                on d.Delivery_Address_ID equals a.Delivery_Address_ID

                join pd in _appDbContext.Personalisation_Designs.ToList()
                on orli.Personalisation_ID equals pd.Personalisation_Design_ID
                join s in _appDbContext.Stock_Items.ToList()
                on pd.Stock_Item_ID equals s.Stock_Item_ID
                join c in _appDbContext.Stock_Item_Colours.ToList()
                on s.Stock_Item_Colour_ID equals c.Stock_Item_Colour_ID
                join di in _appDbContext.Design_Images.ToList()
                on pd.Design_Image_ID equals di.Design_Image_ID
                join dt in _appDbContext.Design_Texts.ToList()
                on pd.Design_Text_ID equals dt.Design_Text_ID

                select new OrderLineItemVM
                {
                    Customer_UserName = cust.Username,
                    Customer_ID = cust.Customer_ID,
                    Delivery_ID = d.Delivery_ID,

                    Delivery_Price = com.Delivery_Price,
                    Delivery_Status = d.Delivery_Status,

                    Delivery_Company_Name = com.Delivery_Company_Name,

                    StreetName = a.StreetName,
                    StreetNumber = a.StreetNumber,
                    City = a.City,
                    Dwelling_Type = a.Dwelling_Type,
                    Unit_Number = a.Unit_Number,
                    Province = a.Province,
                    AreaCode = a.AreaCode,

                    Order_Status = orli.Order_Status,
                    Order_Request_Date = or.Order_Request_Date,
                    Order_Request_Total_Price = or.Order_Request_Total_Price,

                    Image_File = di.Image_File,
                    Design_Text = dt.Design_Text_Description,

                    Stock_Item_ID = s.Stock_Item_ID,
                    Stock_Item_Name = s.Stock_Item_Name,
                    Stock_Colour_Name = c.Stock_Item_Colour_Name,
                    Stock_Item_Size = s.Stock_Item_Size,

                    Order_Line_Item_ID = orli.Order_Line_Item_ID,
                    Order_Line_Item_Total_Price = orli.Order_Line_Item_Total_Price,
                    Order_Line_Item_Quantity = orli.Order_Line_Item_Quantity,
                }
                ).ToList();

            IEnumerable<OrderLineItemVM> query = orderlineitem.Where(x => x.Order_Line_Item_ID == orderlineitemID);
            return query;
        }
        public object GetOrderLineItembyStatus(string orderlinestatus)
        {
            List<OrderLineItemVM> orderlineitem = (
                from or in _appDbContext.Order_Requests.ToList()
                join orli in _appDbContext.Order_Line_Item.ToList()
                on or.Order_Request_ID equals orli.Order_Request_ID
                //order request
                join cust in _appDbContext.Customers.ToList()
                on or.Customer_ID equals cust.Customer_ID
                join d in _appDbContext.Deliveries.ToList()
                on or.Delivery_ID equals d.Delivery_ID
                join com in _appDbContext.Delivery_Companies.ToList()
                on d.Delivery_Company_ID equals com.Delivery_Company_ID
                join a in _appDbContext.Delivery_Address.ToList()
                on d.Delivery_Address_ID equals a.Delivery_Address_ID

                join pd in _appDbContext.Personalisation_Designs.ToList()
                on orli.Personalisation_ID equals pd.Personalisation_Design_ID
                join s in _appDbContext.Stock_Items.ToList()
                on pd.Stock_Item_ID equals s.Stock_Item_ID
                join c in _appDbContext.Stock_Item_Colours.ToList()
                on s.Stock_Item_Colour_ID equals c.Stock_Item_Colour_ID
                join di in _appDbContext.Design_Images.ToList()
                on pd.Design_Image_ID equals di.Design_Image_ID
                join dt in _appDbContext.Design_Texts.ToList()
                on pd.Design_Text_ID equals dt.Design_Text_ID

                select new OrderLineItemVM
                {
                    Customer_UserName = cust.Username,
                    Customer_ID = cust.Customer_ID,
                    Delivery_ID = d.Delivery_ID,

                    Delivery_Price = com.Delivery_Price,
                    Delivery_Status = d.Delivery_Status,

                    Delivery_Company_Name = com.Delivery_Company_Name,

                    StreetName = a.StreetName,
                    StreetNumber = a.StreetNumber,
                    City = a.City,
                    Dwelling_Type = a.Dwelling_Type,
                    Unit_Number = a.Unit_Number,
                    Province = a.Province,
                    AreaCode = a.AreaCode,

                    Order_Status = orli.Order_Status,
                    Order_Request_Date = or.Order_Request_Date,
                    Order_Request_Total_Price = or.Order_Request_Total_Price,

                    Image_File = di.Image_File,
                    Design_Text = dt.Design_Text_Description,

                    Stock_Item_ID = s.Stock_Item_ID,
                    Stock_Item_Name = s.Stock_Item_Name,
                    Stock_Colour_Name = c.Stock_Item_Colour_Name,
                    Stock_Item_Size = s.Stock_Item_Size,

                    Order_Line_Item_ID = orli.Order_Line_Item_ID,
                    Order_Line_Item_Total_Price = orli.Order_Line_Item_Total_Price,
                    Order_Line_Item_Quantity = orli.Order_Line_Item_Quantity,
                }
                ).ToList();

            IEnumerable<OrderLineItemVM> query = orderlineitem.Where(x => x.Order_Status == orderlinestatus);
            return query;
        }
        public object GetAllOrderLineItems()
        {
            List<OrderLineItemVM> orderlineitem = (
                from or in _appDbContext.Order_Requests.ToList()
                join orli in _appDbContext.Order_Line_Item.ToList()
                on or.Order_Request_ID equals orli.Order_Request_ID
                //order request
                join cust in _appDbContext.Customers.ToList()
                on or.Customer_ID equals cust.Customer_ID
                join d in _appDbContext.Deliveries.ToList()
                on or.Delivery_ID equals d.Delivery_ID
                join com in _appDbContext.Delivery_Companies.ToList()
                on d.Delivery_Company_ID equals com.Delivery_Company_ID
                join a in _appDbContext.Delivery_Address.ToList()
                on d.Delivery_Address_ID equals a.Delivery_Address_ID

                join pd in _appDbContext.Personalisation_Designs.ToList()
                on orli.Personalisation_ID equals pd.Personalisation_Design_ID
                join s in _appDbContext.Stock_Items.ToList()
                on pd.Stock_Item_ID equals s.Stock_Item_ID
                join c in _appDbContext.Stock_Item_Colours.ToList()
                on s.Stock_Item_Colour_ID equals c.Stock_Item_Colour_ID
                join di in _appDbContext.Design_Images.ToList()
                on pd.Design_Image_ID equals di.Design_Image_ID
                join dt in _appDbContext.Design_Texts.ToList()
                on pd.Design_Text_ID equals dt.Design_Text_ID

                select new OrderLineItemVM
                {
                    Customer_UserName = cust.Username,
                    Customer_ID = cust.Customer_ID,
                    Delivery_ID = d.Delivery_ID,

                    Delivery_Price = com.Delivery_Price,
                    Delivery_Status = d.Delivery_Status,

                    Delivery_Company_Name = com.Delivery_Company_Name,

                    StreetName = a.StreetName,
                    StreetNumber = a.StreetNumber,
                    City = a.City,
                    Dwelling_Type = a.Dwelling_Type,
                    Unit_Number = a.Unit_Number,
                    Province = a.Province,
                    AreaCode = a.AreaCode,

                    Order_Status = orli.Order_Status,
                    Order_Request_Date = or.Order_Request_Date,
                    Order_Request_Total_Price = or.Order_Request_Total_Price,

                    Image_File = di.Image_File,
                    Design_Text = dt.Design_Text_Description,

                    Stock_Item_Name = s.Stock_Item_Name,
                    Stock_Colour_Name = c.Stock_Item_Colour_Name,
                    Stock_Item_Size = s.Stock_Item_Size,

                    Order_Line_Item_ID = orli.Order_Line_Item_ID,
                    Order_Line_Item_Total_Price = orli.Order_Line_Item_Total_Price,
                    Order_Line_Item_Quantity = orli.Order_Line_Item_Quantity,
                }
                ).ToList();

            return orderlineitem;
        }

//sales
        public object GetSalesReport(string stocktypename)
        {
            List<SalesVM> sales = (
                from s in _appDbContext.Stock_Items.ToList()
                join t in _appDbContext.Stock_Types.ToList()
                on s.Stock_Type_ID equals t.Stock_Type_ID
                select new SalesVM
                {
                    Stock_Item_Name = s.Stock_Item_Name,
                    Stock_Type_Name = t.Stock_Type_Name,
                    Order_Line_Item_Quantity = s.Stock_Sale_Quantity,
                    Total_Amount = s.Stock_Sale_Quantity * s.Stock_Item_Price,
                }
                ).ToList();

            IEnumerable<SalesVM> query = sales.Where(x => x.Stock_Type_Name == stocktypename);
            return query;
        }
        public async Task<Payment[]> GetAlPaymentsAsync()
        {
            IQueryable<Payment> query = _appDbContext.Payments;
            return await query.ToArrayAsync();
        }
        public object GetCustomerSales(string username)
        {
            List<SalesVM> sales = (
                from p in _appDbContext.Payments.ToList()
                join s in _appDbContext.Stock_Items.ToList()
                on p.Stock_Item_ID equals s.Stock_Item_ID

                select new SalesVM
                {
                    Order_Completed_Date = p.Sale_Date,
                    UserName = p.Customer_UserName,
                    Stock_Item_Name = s.Stock_Item_Name,
                    Order_Line_Item_Quantity = p.Sale_Quantity,

                }
                ).ToList();

            IEnumerable<SalesVM> query = sales.Where(x => x.UserName == username);
            return query;
        }

//write off
        public object GetWrittenOffItems()
        {
            List<WriteOffVM> writeoffs = (

                from wo in _appDbContext.Write_Offs.ToList()
                join woli in _appDbContext.Write_Off_Line_Items.ToList()
                on wo.Write_Off_ID equals woli.Write_Off_ID
                join s in _appDbContext.Stock_Items.ToList()
                on woli.Stock_Item_ID equals s.Stock_Item_ID

                select new WriteOffVM
                {
                    Write_Off_Line_Item_ID = woli.Write_Off_Line_Item_ID,
                    Write_Off_Quantity = woli.Write_Off_Quantity,
                    Write_Off_Reason = woli.Write_Off_Reason,

                    Write_Off_ID = wo.Write_Off_ID,
                    Write_Off_Date = wo.Write_Off_Date,

                    Stock_Item_ID = s.Stock_Item_ID,
                    Stock_Item_Name = s.Stock_Item_Name,
                }              
                ).ToList();

            return writeoffs;
        }
        
//audit trail
        public object GetAdminAuditTrailDetails()
        {
            List<AuditTrailVM> trail = (
                from t in _appDbContext.AuditTrail.ToList()
                join a in _appDbContext.Admin.ToList()
                on t.Admin_ID equals a.Admin_ID

                select new AuditTrailVM
                {
                    ActionDate = t.ActionDate,
                    ActionName = t.ActionName,

                    FirstName = a.FirstName,
                    Surname = a.Surname,
                }
                ).ToList();
            return trail;
        }

        public object GetEmployeeAuditTrailDetails()
        {
            List<AuditTrailVM> trail = (
                from t in _appDbContext.AuditTrail.ToList()
                join e in _appDbContext.Employees.ToList()
                on t.Employee_ID equals e.Employee_ID

                select new AuditTrailVM
                {
                    ActionDate = t.ActionDate,
                    ActionName = t.ActionName,

                    FirstName = e.FirstName,
                    Surname = e.Surname,
                }
                ).ToList();
            return trail;
        }

        public object GetCustomerAuditTrailDetails()
        {
            List<AuditTrailVM> trail = (
                from t in _appDbContext.AuditTrail.ToList()
                join c in _appDbContext.Customers.ToList()
                on t.Customer_ID equals c.Customer_ID

                select new AuditTrailVM
                {
                    ActionDate = t.ActionDate,
                    ActionName = t.ActionName,

                    FirstName = c.FirstName,
                    Surname = c.Surname,
                }
                ).ToList();
            return trail;
        }

 //contact us
        public async Task<ContactUs[]> GetAllContactUsAsync()
        {
            IQueryable<ContactUs> query = _appDbContext.Contact_Us;
            return await query.ToArrayAsync();
        }

        public async Task<ContactUs> GetContactUsByID(Guid contactusID)
        {
            IQueryable<ContactUs> query = _appDbContext.Contact_Us
                    .Where(u => u.Contact_Us_ID == contactusID);
            return await query.FirstOrDefaultAsync();
        }

//referential integrity checks
        public async Task<Stock_Item> GetStockItemByColour(Guid stock_Item_Colour_ID)
        {
            IQueryable<Stock_Item> query = _appDbContext.Stock_Items
              .Where(u => u.Stock_Item_Colour_ID == stock_Item_Colour_ID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Stock_Item> GetStockItemByImage(Guid stock_Item_Image_ID)
        {
            IQueryable<Stock_Item> query = _appDbContext.Stock_Items
              .Where(u => u.Stock_Image_ID == stock_Item_Image_ID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Stock_Item> GetStockItemByType(Guid stock_Item_Type_ID)
        {
            IQueryable<Stock_Item> query = _appDbContext.Stock_Items
              .Where(u => u.Stock_Type_ID == stock_Item_Type_ID);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Delivery> GetInProgressDeliveriesByCompany(Guid delivery_Company_ID)
        {
            IQueryable<Delivery> query = _appDbContext.Deliveries
                      .Where(u => u.Delivery_Company_ID == delivery_Company_ID && u.Delivery_Status == "Out");
            return await query.FirstOrDefaultAsync();
        }

        public object GetOrderLineItemByStockItem(Guid stock_Item_ID)
        {
            List<OrderLineItemVM> orderlineitem = (
                from orli in _appDbContext.Order_Line_Item.ToList()
                join pd in _appDbContext.Personalisation_Designs.ToList()
                on orli.Personalisation_ID equals pd.Personalisation_Design_ID
                join s in _appDbContext.Stock_Items.ToList()
                on pd.Stock_Item_ID equals s.Stock_Item_ID

                select new OrderLineItemVM
                {
                    Stock_Item_ID = s.Stock_Item_ID,
                }
                ).ToList();

            IEnumerable<OrderLineItemVM> query = orderlineitem.Where(x => x.Stock_Item_ID == stock_Item_ID);
            return query;
        }


    }
}

/*
//orders
 public async Task<Order[]> GetAllOrdersAsync()
 {
     IQueryable<Order> query = _appDbContext.Orders;
     return await query.ToArrayAsync();
 }

 public async Task<Order> GetOrderDetailsAsync(Guid order_ID)
 {
     IQueryable<Order> query = _appDbContext.Orders
       .Where(u => u.Order_ID == order_ID);
     return await query.FirstOrDefaultAsync();
 }

//Order Requests
 public async Task<Order_Request[]> GetAllOrderRequestsAsync()
 {
   IQueryable<Order_Request> query = _appDbContext.Order_Requests;
   return await query.ToArrayAsync();
 }

 public async Task<Order_Request> GetOrderRequestAsync(Guid order_Request_ID)
 {
     IQueryable<Order_Request> query = _appDbContext.Order_Requests
               .Where(u => u.Order_Request_ID == order_Request_ID);
     return await query.FirstOrDefaultAsync();
 }

//personalisation
 public async Task<Personalisation_Design> GetPersonalisationAsync(Guid personalisation_ID)
 {
     IQueryable<Personalisation_Design> query = _appDbContext.Personalisation_Designs
       .Where(u => u.Personalisation_Design_ID == personalisation_ID);
     return await query.FirstOrDefaultAsync();
 }

//stock item images
 public async Task<Stock_Image[]> GetAllStockItmagesAsync()
 {
     IQueryable<Stock_Image> query = _appDbContext.Stock_Images;
     return await query.ToArrayAsync();
 }
 public async Task<Stock_Image> GetStockImageByID(Guid stock_image_id)
 {
     IQueryable<Stock_Image> query = _appDbContext.Stock_Images
       .Where(u => u.Stock_Image_ID == stock_image_id);
     return await query.FirstOrDefaultAsync();
 }

//Stock Items
 public async Task<Stock_Item[]> GetAllStockItemsAsync()
 {
     IQueryable<Stock_Item> query = _appDbContext.Stock_Items;
     return await query.ToArrayAsync();
 }
 public async Task<Stock_Item> GetStockItemByName(string stock_Item_Name)
 {
     IQueryable<Stock_Item> query = _appDbContext.Stock_Items
       .Where(u => u.Stock_Item_Name == stock_Item_Name);
     return await query.FirstOrDefaultAsync();
 }
 public async Task<Stock_Item> GetStockItemDetailsAsync(Guid stock_Item_ID)
 {
     IQueryable<Stock_Item> query = _appDbContext.Stock_Items
               .Where(u => u.Stock_Item_ID == stock_Item_ID);
     return await query.FirstOrDefaultAsync();
 }

 public object GetStockNames()
 {
     List<StockItemViewModel> stockitems = (
         from c in _appDbContext.Stock_Item_Colours.ToList()
         join s in _appDbContext.Stock_Items.ToList()
         on c.Stock_Item_Colour_ID equals s.Stock_Item_Colour_ID
         join t in _appDbContext.Stock_Types.ToList()
         on s.Stock_Type_ID equals t.Stock_Type_ID
         join i in _appDbContext.Stock_Images.ToList()
         on s.Stock_Image_ID equals i.Stock_Image_ID

         select new StockItemViewModel
         {
             Stock_Item_ID = s.Stock_Item_ID,
             Stock_Item_Name = s.Stock_Item_Name,
             Stock_Item_Price = s.Stock_Item_Price,
             Stock_Item_Size = s.Stock_Item_Size,
             Stock_Item_Quantity = s.Stock_Item_Quantity,
             Inventory_Comments = s.Inventory_Comments,
             Inventory_Date = s.Inventory_Date,


             Stock_Item_Colour_ID = c.Stock_Item_Colour_ID,
             StockColourName = c.Stock_Item_Colour_Name,

             Stock_Type_ID = t.Stock_Type_ID,
             StockTypeName = t.Stock_Type_Name,

             Stock_Image_ID = i.Stock_Image_ID,
             StockImageName = i.Stock_Image_Name,
             StockImageFile = i.Stock_Image_File,
         }
         ).ToList();
     return stockitems;
 }


//stock types
 public async Task<Stock_Type[]> GetAllStockTypesAsync()
 {
   IQueryable<Stock_Type> query = _appDbContext.Stock_Types;
   return await query.ToArrayAsync();
 }

 public async Task<Stock_Type> GetStockTypeDetailsAsync(Guid stock_Type_ID)
 {
     IQueryable<Stock_Type> query = _appDbContext.Stock_Types
               .Where(u => u.Stock_Type_ID == stock_Type_ID);
     return await query.FirstOrDefaultAsync();
 } 

//Stock item colours
 public async Task<Stock_Item_Colour[]> GetAllStockItemColoursAsync()
 {
     IQueryable<Stock_Item_Colour> query = _appDbContext.Stock_Item_Colours;
     return await query.ToArrayAsync();
 }
 public async Task<Stock_Item_Colour> GetStockItemColourDetailsAsync(Guid stock_Item_Colour_ID)
 {
     IQueryable<Stock_Item_Colour> query = _appDbContext.Stock_Item_Colours
               .Where(u => u.Stock_Item_Colour_ID == stock_Item_Colour_ID);
     return await query.FirstOrDefaultAsync();
 } 

//product ratings
 public async Task<Product_Rating[]> GetAllProductRatingsAsync()
 {
     IQueryable<Product_Rating> query = _appDbContext.Product_Ratings;
     return await query.ToArrayAsync();
 }

 public async Task<Product_Rating> GetProductRatingDetailsAsync(Guid product_Rating_ID)
 {
   IQueryable<Product_Rating> query = _appDbContext.Product_Ratings
             .Where(u => u.Product_Rating_ID == product_Rating_ID);
   return await query.FirstOrDefaultAsync();
 }    

//experience ratings
 public async Task<Experience_Rating> GetExperienceRatingAsync(Guid Experience_Rating_ID)
 {
     IQueryable<Experience_Rating> query = _appDbContext.Experience_Ratings
             .Where(u => u.Experience_Rating_ID == Experience_Rating_ID);
     return await query.FirstOrDefaultAsync();
 }

 public async Task<Experience_Rating[]> GetAllExperienceRatings()
 {
     IQueryable<Experience_Rating> query = _appDbContext.Experience_Rating;
     return await query.ToArrayAsync();
 }

//refund policies
 public async Task<Refund_Policy[]> GetAllPoliciesAsync()
 {
     IQueryable<Refund_Policy> query = _appDbContext.Refund_Policies;
     return await query.ToArrayAsync();
 }

 public async Task<Refund_Policy> GetPolicyAsync(Guid Refund_Policy_Id)
 {
     IQueryable<Refund_Policy> query = _appDbContext.Refund_Policies
             .Where(u => u.Refund_Policy_ID == Refund_Policy_Id);
     return await query.FirstOrDefaultAsync();
 }

//refunds
 public async Task<Refund[]> GetAllPreviousRefunds()
 {
     IQueryable<Refund> query = _appDbContext.Refunds;
     return await query.ToArrayAsync();
 }

 public async Task<Refund> GetPreviousRefund(Guid refund_Id)
 {
     IQueryable<Refund> query = _appDbContext.Refunds
             .Where(u => u.Refund_ID == refund_Id);
     return await query.FirstOrDefaultAsync();
 }

//GetAllDiscountsAsync
 public async Task<Discount[]> GetAllDiscountsAsync()
 {
     IQueryable<Discount> query = _appDbContext.Discounts;
     return await query.ToArrayAsync();
 }
 public async Task<Discount> GetDiscountAsync(Guid discount_Id)
 {
     IQueryable<Discount> query = _appDbContext.Discounts
             .Where(u => u.Discount_ID == discount_Id);
     return await query.FirstOrDefaultAsync();
 }

//bestsellers
 public async Task<BestSellers[]> GetAllBestSellersAsync()
 {
     IQueryable<BestSellers> query = _appDbContext.BestSellers;
     return await query.ToArrayAsync();
 }*/