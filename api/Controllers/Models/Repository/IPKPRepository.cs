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

    public async Task<City[]> GetAllCitiesAsync()
    {
      IQueryable<City> query = _appDbContext.Cities;
      return await query.ToArrayAsync();
    }

    public async Task<Customer[]> GetAllCustomersAsync()
    {
      IQueryable<Customer> query = _appDbContext.Customers;
      return await query.ToArrayAsync();
    }

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

    public async Task<Employee[]> GetAllEmployeesAsync()
    {
      IQueryable<Employee> query = _appDbContext.Employees;
      return await query.ToArrayAsync();
    }

    public async Task<Gender[]> GetAllGendersAsync()
    {
      IQueryable<Gender> query = _appDbContext.Genders;
      return await query.ToArrayAsync();
    }

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

    public async Task<Product_Rating[]> GetAllProductRatingsAsync()
    {
      IQueryable<Product_Rating> query = _appDbContext.Product_Ratings;
      return await query.ToArrayAsync();
    }

    public async Task<Province[]> GetAllProvincesAsync()
    {
      IQueryable<Province> query = _appDbContext.Provinces;
      return await query.ToArrayAsync();
    }

    public async Task<Stock_Item_Colour[]> GetAllStockItemColoursAsync()
    {
      IQueryable<Stock_Item_Colour> query = _appDbContext.Stock_Item_Colours;
      return await query.ToArrayAsync();
    }

    public async Task<Stock_Item[]> GetAllStockItemsAsync()
    {
      IQueryable<Stock_Item> query = _appDbContext.Stock_Items;
      return await query.ToArrayAsync();
    }

    public async Task<Stock_Type[]> GetAllStockTypesAsync()
    {
      IQueryable<Stock_Type> query = _appDbContext.Stock_Types;
      return await query.ToArrayAsync();
    }

    public async Task<Title[]> GetAllTitlesAsync()
    {
      IQueryable<Title> query = _appDbContext.Titles;
      return await query.ToArrayAsync();
    }

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

    public async Task<City> GetCityByNameAsync(string cityname)
    {
      IQueryable<City> query = _appDbContext.Cities
        .Where(u => u.City_Name == cityname);
      return await query.FirstOrDefaultAsync();
    }

    public async Task<Customer> GetCustomerDetailsAsync(Guid customer_ID)
    {
      IQueryable<Customer> query = _appDbContext.Customers
                .Where(u => u.Customer_ID == customer_ID);
      return await query.FirstOrDefaultAsync();
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

    public async Task<Employee> GetEmployeeDetailsAsync(Guid employee_ID)
    {
      IQueryable<Employee> query = _appDbContext.Employees
                .Where(u => u.Employee_ID == employee_ID);
      return await query.FirstOrDefaultAsync();
    }

    public async Task<Gender> GetGenderByDescriptionAsync(string gendername)
    {
      IQueryable<Gender> query = _appDbContext.Genders
        .Where(u => u.Gender_Name == gendername);
      return await query.FirstOrDefaultAsync();
    }

    public async Task<Best_Sellers> GetLatestBestSellersAsync()
    {
      IQueryable<Best_Sellers> query = _appDbContext.Best_Sellers;
      return await query.FirstOrDefaultAsync();
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

    public async Task<Personalisation_Design> GetPersonalisationAsync(Guid personalisation_ID)
    {
      IQueryable<Personalisation_Design> query = _appDbContext.Personalisation_Designs
        .Where(u => u.Personalisation_Design_ID == personalisation_ID);
      return await query.FirstOrDefaultAsync();
    }

    public async Task<Product_Rating> GetProductRatingDetailsAsync(Guid product_Rating_ID)
    {
      IQueryable<Product_Rating> query = _appDbContext.Product_Ratings
                .Where(u => u.Product_Rating_ID == product_Rating_ID);
      return await query.FirstOrDefaultAsync();
    }

    public async Task<Province> GetProvinceByNameAsync(string provincename)
    {
      IQueryable<Province> query = _appDbContext.Provinces
                .Where(u => u.Province_Name == provincename);
      return await query.FirstOrDefaultAsync();
    }

    public async Task<Stock_Item> GetStockItemByName(string stock_Item_Name)
    {
      IQueryable<Stock_Item> query = _appDbContext.Stock_Items
        .Where(u => u.Stock_Item_Name == stock_Item_Name);
      return await query.FirstOrDefaultAsync();
    }

    public async Task<Stock_Item_Colour> GetStockItemColourDetailsAsync(Guid stock_Item_Colour_ID)
    {
      IQueryable<Stock_Item_Colour> query = _appDbContext.Stock_Item_Colours
                .Where(u => u.Stock_Item_Colour_ID == stock_Item_Colour_ID);
      return await query.FirstOrDefaultAsync();
    }

    public async Task<Stock_Item> GetStockItemDetailsAsync(Guid stock_Item_ID)
    {
      IQueryable<Stock_Item> query = _appDbContext.Stock_Items
                .Where(u => u.Stock_Item_ID == stock_Item_ID);
      return await query.FirstOrDefaultAsync();
    }

    public async Task<Stock_Type> GetStockTypeDetailsAsync(Guid stock_Type_ID)
    {
      IQueryable<Stock_Type> query = _appDbContext.Stock_Types
                .Where(u => u.Stock_Type_ID == stock_Type_ID);
      return await query.FirstOrDefaultAsync();
    }

    public async Task<Title> GetTitleByDescriptionAsync(string titlename)
    {
      IQueryable<Title> query = _appDbContext.Titles
                .Where(u => u.Title_Name == titlename);
      return await query.FirstOrDefaultAsync();
    }

    public async Task<User> GetUserDetailsAsync(Guid user_ID)
    {
      IQueryable<User> query = _appDbContext.Users
                .Where(u => u.User_ID == user_ID);
      return await query.FirstOrDefaultAsync();
    }

    public async Task<User_Role> GetUserRoleDetailsAsync(Guid user_Role_ID)
    {
      IQueryable<User_Role> query = _appDbContext.User_Roles
                .Where(u => u.User_Role_ID == user_Role_ID);
      return await query.FirstOrDefaultAsync();
    }

    public async Task<bool> SaveChangesAsync()
    {
      return await _appDbContext.SaveChangesAsync() > 0;
    }
  }
}
