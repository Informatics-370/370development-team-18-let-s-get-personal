using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IPKP___API.Controllers.Models.Entities;

namespace IPKP___API.Controllers.Models.Repository
{
  public interface IIPKPRepository
  {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();
        Task<Employee> GetEmployeeDetailsAsync(int employee_ID);
        Task<Employee[]> GetAllEmployeesAsync();
        Task<Customer> GetCustomerDetailsAsync(int customer_ID);
        Task<Customer[]> GetAllCustomersAsync();
        Task<Title[]> GetTitlesAsync();
        Task<User> GetUserDetailsAsync(int user_ID);
        Task<User[]> GetAllUsersAsync();
        Task<User_Role> GetUserRoleDetailsAsync(int user_Role_ID);
        Task<User_Role[]> GetAllUserRolesAsync();
        Task<Delivery> GetDeliveryDetailsAsync(int delivery_ID);
        Task<Delivery[]> GetAllDeliveriesAsync();
        Task<Stock_Item> GetStockItemDetailsAsync(int stock_Item_ID);
        Task<Stock_Item> GetStockItemByName(string stock_Item_Name);
        Task<Stock_Item[]> GetAllStockItemsAsync();
        Task<Stock_Type> GetStockTypeDetailsAsync(int stock_Type_ID);
        Task<Stock_Type[]> GetAllStockTypesAsync();
        Task<Stock_Item_Colour> GetStockItemColourDetailsAsync(int stock_Item_Colour_ID);
        Task<Stock_Item_Colour[]> GetAllStockItemColoursAsync();
        Task<Product_Rating> GetProductRatingDetailsAsync(int product_Rating_ID);
        Task<Product_Rating[]> GetAllProductRatingsAsync();
        Task<Delivery_Company> GetDeliveryCompanyDetailsAsync(int delivery_Company_ID);
        Task<Delivery_Company[]> GetAllDeliveryCompaniesAsync();
        Task<Personalisation_Design> GetPersonalisationAsync(int personalisation_ID);
        Task<Order[]> GetAllOrdersAsync();
        Task<Order> GetOrderDetailsAsync(int order_ID);
        Task<Order_Request> GetOrderRequestAsync(int order_Request_ID);
        Task<Order_Request[]> GetAllOrderRequestsAsync();
        Task<Order_Status[]> GetAllOrderStatusesAsync();
        Task<Order_Status> GetOrderStatusByNameAsync(string orderStatus);
        //Task<Best_Sellers[]> GetLatestBestSellersAsync();
        Task<Experience_Rating[]> GetAllExperienceRatings();
        Task<Experience_Rating> GetExperienceRatingAsync(int Experience_Rating_ID);
        Task<Refund_Policy> GetPolicyAsync(int Refund_Policy_Id);
        Task<Refund_Policy[]> GetAllPoliciesAsync();
        Task<Basket> GetBasketAsync(int Basket_Id);
        Task<Discount[]> GetAllDiscountsAsync();
        Task<Discount> GetDiscountAsync(int discount_Id);
        Task<Refund[]> GetAllPreviousRefunds();
        Task<Refund> GetPreviousRefund(int refund_Id);
        Task<Address[]> GetAllAddressesAsync();

  }
}
