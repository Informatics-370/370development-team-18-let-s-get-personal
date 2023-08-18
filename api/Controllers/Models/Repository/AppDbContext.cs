using IPKP___API.Controllers.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Repository
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Admin> Admin { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Delivery> Deliveries { get; set; }
        public DbSet<Delivery_Company> Delivery_Companies { get; set; }
        public DbSet<Design_Image> Design_Images { get; set; }
        public DbSet<Design_Text> Design_Texts { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Experience_Rating> Experience_Ratings { get; set; }
        //public DbSet<Image> Images { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Order> Orders { get; set; }
        //public DbSet<Order_Status> Order_Statuses { get; set; }
        public DbSet<Order_Request> Order_Requests { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Payment_Type> Payment_Types { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Personalisation_Design> Personalisation_Designs { get; set; }
        public DbSet<Product_Rating> Product_Ratings { get; set; }
        public DbSet<Refund> Refunds { get; set; }
        public DbSet<Refund_Policy> Refund_Policies { get; set; }
        public DbSet<Refund_Reason> Refund_Reasons { get; set; }
        public DbSet<Stock_Image> Stock_Images { get; set; }
        public DbSet<Stock_Item> Stock_Items { get; set; }
        public DbSet<Stock_Item_Colour> Stock_Item_Colours { get; set; }
        public DbSet<Stock_Price_History> Stock_Price_Histories { get; set; }
        public DbSet<Stock_Type> Stock_Types { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<User_Role> User_Roles { get; set; }
        public DbSet<User_Role_Permission> User_Role_Permissions { get; set; }
        public DbSet<Write_Off> Write_Offs { get; set; }
        public DbSet<Write_Off_Line_Item> Write_Off_Line_Items { get; set; }
        public DbSet<BestSellers> BestSellers { get; set; }
        public DbSet<Experience_Rating> Experience_Rating { get; set; }
       
        public DbSet<Delivery_Address> Delivery_Address { get; set; }

        public DbSet<Order_Line_Item> Order_Line_Item { get; set; }
    }
}
