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
        void Update<T>(T entity) where T : class;

        Task<Admin[]> GetAllAdminssAsync();
        Task<Admin> GetAdminDetailsAsync(Guid admin_ID);
        Task<Admin> GetAdmin(string username);
        Task<Employee> GetEmployeeDetailsAsync(Guid employee_ID);
        Task<Employee[]> GetAllEmployeesAsync();
        Task<Employee> GetEmployee(string username);
        Task<Customer> GetCustomerDetailsAsync(Guid customer_ID);
        Task<Customer[]> GetAllCustomersAsync();
        
        Task<User> GetUserDetailsAsync(Guid user_ID);
        Task<User[]> GetAllUsersAsync();
        Task<User_Role> GetUserRoleDetailsAsync(int user_Role_ID);
        Task<User_Role[]> GetAllUserRolesAsync();
        Task<Delivery> GetDeliveryDetailsAsync(Guid delivery_ID);
        Task<Delivery[]> GetAllDeliveriesAsync();

        object GetAllBestSellersAsync();
        Task<BestSellers> GetBestSellerByID(Guid bestsellerID);

        Task<Stock_Image> GetStockImageByID(Guid stock_image_id);
        Task<Stock_Image[]> GetAllStockItmagesAsync();

        //Stock items
        Task<Stock_Item[]> GetAllStockItemsAsync();
        Task<Stock_Item> GetStockItemDetailsAsync(Guid stock_Item_ID);
        Task<Stock_Item> GetStockItemByName(string stock_Item_Name);
        object GetStockNames();
        object GetStockList();
        object GetStockNamesByType(Guid stocktypeID);

        Task<Stock_Type> GetStockTypeDetailsAsync(Guid stock_Type_ID);
        Task<Stock_Type[]> GetAllStockTypesAsync();
        Task<Stock_Item_Colour> GetStockItemColourDetailsAsync(Guid stock_Item_Colour_ID);
        Task<Stock_Item_Colour[]> GetAllStockItemColoursAsync();
        
        Task<Delivery_Company> GetDeliveryCompanyDetailsAsync(Guid delivery_Company_ID);
        Task<Delivery_Company[]> GetAllDeliveryCompaniesAsync();
        Task<Personalisation_Design> GetPersonalisationAsync(Guid personalisation_ID);
        Task<Order[]> GetAllOrdersAsync();
        Task<Order> GetOrderDetailsAsync(Guid order_ID);
        object GetOrderByCustomerAsync(Guid customer_ID);
        Task<Order_Request> GetOrderRequestAsync(Guid order_Request_ID);
        Task<Order_Request[]> GetAllOrderRequestsAsync();

        object GetRatingPerProduct();        
        Task<Product_Rating> GetProductRatingDetailsAsync(Guid product_Rating_ID);
        Task<Product_Rating[]> GetAllProductRatingsAsync();
        object GetProductRatingDetails(Guid product_Rating_ID);
        object GetProductRatingByCustomerAsync(Guid customer_ID);
        object GetProductRatings();

        object GetAllExperienceRatings();
        object GetExperienceRatingByCustomerIDAsync(Guid customer_ID);
        Task<Experience_Rating> GetExperienceRatingAsync(Guid Experience_Rating_ID);

        Task<Refund_Policy> GetPolicyAsync(Guid Refund_Policy_Id);
        Task<Refund_Policy[]> GetAllPoliciesAsync();
        Task<Discount[]> GetAllDiscountsAsync();
        Task<Discount> GetDiscountAsync(Guid discount_Id);
        Task<Discount> GetDiscountByStockAsync(Guid stockItemID);
        Task<Refund[]> GetAllPreviousRefunds();
        Task<Refund> GetPreviousRefund(Guid refund_Id);
        Task<Customer> GetUser(string username);

        object GetDeliveryByCompany(string company);
        object GetDeliveryByID(Guid deliveryID);
        object GetAllDeliveries();
        object GetDeliveryBySatus(string status);

        Task<Order_Line_Item> GetOrderLineItemByID(Guid orderlineitemID);
        object GetOrderLineDetailsByID(Guid orderlineitemID);
        object GetOrderLineItembyStatus(string orderlinestatus);        
        object GetAllOrderLineItems();

        object GetSalesReport(string stocktypename);
        Task<Payment[]> GetAlPaymentsAsync();
        object GetCustomerSales(string username);

        object GetWrittenOffItems();

        object GetAdminAuditTrailDetails();
        object GetEmployeeAuditTrailDetails();
        object GetCustomerAuditTrailDetails();

        Task<ContactUs[]> GetAllContactUsAsync();
        Task<ContactUs> GetContactUsByID(Guid contactusID);

        Task<Stock_Item> GetStockItemByColour(Guid stock_Item_Colour_ID);
        Task<Stock_Item> GetStockItemByImage(Guid stock_Item_Image_ID);
        Task<Stock_Item> GetStockItemByType(Guid stock_Item_Type_ID);
        Task<Delivery> GetInProgressDeliveriesByCompany(Guid delivery_Company_ID);
        object GetOrderLineItemByStockItem(Guid stock_Item_ID);

    }
}
