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

        //users
        public async Task<User_Role[]> GetAllUserRolesAsync()
        {
            IQueryable<User_Role> query = _appDbContext.User_Roles;
            return await query.ToArrayAsync();
        }

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

        public async Task<User_Role> GetUserRoleDetailsAsync(int user_Role_ID)
        {
            IQueryable<User_Role> query = _appDbContext.User_Roles
                      .Where(u => u.User_Role_ID == user_Role_ID);
            return await query.FirstOrDefaultAsync();
        }

        //deliveries
        public async Task<Delivery[]> GetAllDeliveriesAsync()
        {
          IQueryable<Delivery> query = _appDbContext.Deliveries;
          return await query.ToArrayAsync();
        }

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

        public async Task<Delivery> GetDeliveryDetailsAsync(Guid delivery_ID)
        {
            IQueryable<Delivery> query = _appDbContext.Deliveries
                      .Where(u => u.Delivery_ID == delivery_ID);
            return await query.FirstOrDefaultAsync();
        }

        //orders
        public async Task<Order_Request[]> GetAllOrderRequestsAsync()
        {
          IQueryable<Order_Request> query = _appDbContext.Order_Requests;
          return await query.ToArrayAsync();
        }

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

        //get price by stock type id 

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

        public async Task<BestSellers[]> GetAllBestSellersAsync()
        {
            IQueryable<BestSellers> query = _appDbContext.BestSellers;
            return await query.ToArrayAsync();
        }

        public async Task<Customer> GetUser(string username)
        {
            return await _appDbContext.Customers
                .FirstOrDefaultAsync(x => x.Username == username);
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
        
        public async Task<Order_Line_Item> GetOrderLineItemByID(Guid orderlineitemID)
        {
            IQueryable<Order_Line_Item> query = _appDbContext.Order_Line_Item
                    .Where(u => u.Order_Line_Item_ID == orderlineitemID);
            return await query.FirstOrDefaultAsync();
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

        public object GetSalesReport()
        {
            List<SalesVM> sales= ( 
                from orli in _appDbContext.Order_Line_Item.ToList() 
                join pd in _appDbContext.Personalisation_Designs.ToList()
                on orli.Personalisation_ID equals pd.Personalisation_Design_ID
                join s in _appDbContext.Stock_Items.ToList()
                on pd.Stock_Item_ID equals s.Stock_Item_ID              
                
                select new SalesVM
                {
                    Stock_Item_Name = s.Stock_Item_Name,
                    Order_Line_Item_Quantity = orli.Order_Line_Item_Quantity,
                    //Stock_Item_Quantity = s.Stock_Item_Quantity,
                }                 
                ).ToList();

            return sales;   
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


        public object ProductTrends()
        {
            var grouped =
                from orli in _appDbContext.Order_Line_Item.ToList()
                join pd in _appDbContext.Personalisation_Designs.ToList()
                on orli.Personalisation_ID equals pd.Personalisation_Design_ID
                join s in _appDbContext.Stock_Items.ToList()
                on pd.Stock_Item_ID equals s.Stock_Item_ID
                group new //pd by s.Stock_Item_ID
                {   
                    s.Stock_Item_Name,
                    orli.Order_Line_Item_Quantity,
                } by s.Stock_Item_ID into g
                select g;
                
            return grouped;
        }
    }
}
