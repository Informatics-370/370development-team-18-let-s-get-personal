using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IPKP___API.Controllers.Models.Entities;
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

        public async Task<Order_Status[]> GetAllOrderStatusesAsync()
        {
          IQueryable<Order_Status> query = _appDbContext.Order_Statuses;
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

        public async Task<Order_Status> GetOrderStatusByNameAsync(string orderStatus)
        {
            IQueryable<Order_Status> query = _appDbContext.Order_Statuses
              .Where(u => u.Order_Status_Description == orderStatus);
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

        //basket
        public async Task<Basket> GetBasketAsync(Guid Basket_Id)
        {
            IQueryable<Basket> query = _appDbContext.Basket
                    .Where(u => u.Basket_ID == Basket_Id);
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

        public async Task<Inventory_Line_Item[]> GetAllInventoryAsync()
        {
            IQueryable<Inventory_Line_Item> query = _appDbContext.Inventory_Line_Items
                .Include(p => p.Stock_Item)
                .Include(p => p.Inventory)
                //.Include(p => p.Stock_Item.Stock_Type_ID)
                //.Include(p => p.Stock_Item.Stock_Item_Colour)
                //.Include(p => p.Stock_Item.Stock_Image)
                ////.Include(p => p.Inventory.)
                ;
            
            return await query.ToArrayAsync();
        }

        public async Task<User> GetUser(string username)
        {
            return await _appDbContext.Users
                .Include(x => x.Customer)
                .Include(x => x.Employee)
                .FirstOrDefaultAsync(x => x.Username == username);
        }

    }
}
