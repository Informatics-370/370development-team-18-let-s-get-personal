﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IPKP___API.Migrations
{
    public partial class IPKPSnapShot : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BestSellers",
                columns: table => new
                {
                    BestSeller_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Stock_Item_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BestSellers", x => x.BestSeller_ID);
                });

            migrationBuilder.CreateTable(
                name: "Delivery_Companies",
                columns: table => new
                {
                    Delivery_Company_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Delivery_Company_Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Delivery_Companies", x => x.Delivery_Company_ID);
                });

            migrationBuilder.CreateTable(
                name: "Design_Price_History",
                columns: table => new
                {
                    Design_Price_History_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Design_Price_Pixel_Amount = table.Column<double>(type: "float", nullable: false),
                    Effective_From_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Effective_To_Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Design_Price_History", x => x.Design_Price_History_ID);
                });

            migrationBuilder.CreateTable(
                name: "Discounts",
                columns: table => new
                {
                    Discount_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Discount_Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Discount_Amount = table.Column<double>(type: "float", nullable: false),
                    Effective_From_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Effective_To_Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Discounts", x => x.Discount_ID);
                });

            migrationBuilder.CreateTable(
                name: "Genders",
                columns: table => new
                {
                    Gender_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Gender_Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genders", x => x.Gender_ID);
                });

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Image_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Image_Size = table.Column<int>(type: "int", nullable: false),
                    Image_File = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Image_ID);
                });

            migrationBuilder.CreateTable(
                name: "Inventories",
                columns: table => new
                {
                    Stock_Item_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Inventory_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Inventory_Comments = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventories", x => x.Stock_Item_ID);
                });

            migrationBuilder.CreateTable(
                name: "Order_Status",
                columns: table => new
                {
                    Order_Status_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Order_Status_Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order_Status", x => x.Order_Status_ID);
                });

            migrationBuilder.CreateTable(
                name: "Payment_Types",
                columns: table => new
                {
                    Payment_Type_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Payment_Type_Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payment_Types", x => x.Payment_Type_ID);
                });

            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    Permission_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Permission_Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.Permission_ID);
                });

            migrationBuilder.CreateTable(
                name: "Provinces",
                columns: table => new
                {
                    Province_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Province_Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Provinces", x => x.Province_ID);
                });

            migrationBuilder.CreateTable(
                name: "Refund_Policies",
                columns: table => new
                {
                    Refund_Policy_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Refund_Policy_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Refund_Policy_Version = table.Column<int>(type: "int", nullable: false),
                    Refund_Policy_Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Refund_Policies", x => x.Refund_Policy_ID);
                });

            migrationBuilder.CreateTable(
                name: "Refund_Reasons",
                columns: table => new
                {
                    Refund_Reason_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Refund_Reason_Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Refund_Reasons", x => x.Refund_Reason_ID);
                });

            migrationBuilder.CreateTable(
                name: "Stock_Images",
                columns: table => new
                {
                    Stock_Image_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Stock_Image_File = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Stock_Item_Id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stock_Images", x => x.Stock_Image_ID);
                });

            migrationBuilder.CreateTable(
                name: "Stock_Item_Colours",
                columns: table => new
                {
                    Stock_Item_Colour_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Stock_Item_Colour_Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Stock_Item_Colour_Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Stock_Item_Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stock_Item_Colours", x => x.Stock_Item_Colour_ID);
                });

            migrationBuilder.CreateTable(
                name: "Stock_Items",
                columns: table => new
                {
                    Stock_Item_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Stock_Item_Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stock_Items", x => x.Stock_Item_ID);
                });

            migrationBuilder.CreateTable(
                name: "Stock_Types",
                columns: table => new
                {
                    Stock_Type_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Stock_Type_Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stock_Types", x => x.Stock_Type_ID);
                });

            migrationBuilder.CreateTable(
                name: "Titles",
                columns: table => new
                {
                    Title_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title_Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Titles", x => x.Title_ID);
                });

            migrationBuilder.CreateTable(
                name: "User_Roles",
                columns: table => new
                {
                    User_Role_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    User_Role_Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_Roles", x => x.User_Role_ID);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Design_Images",
                columns: table => new
                {
                    Design_Image_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Design_Price_Pixel_AmountDesign_Price_History_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Design_Image_Size = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Design_Images", x => x.Design_Image_ID);
                    table.ForeignKey(
                        name: "FK_Design_Images_Design_Price_History_Design_Price_Pixel_AmountDesign_Price_History_ID",
                        column: x => x.Design_Price_Pixel_AmountDesign_Price_History_ID,
                        principalTable: "Design_Price_History",
                        principalColumn: "Design_Price_History_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Design_Texts",
                columns: table => new
                {
                    Design_Text_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Design_Price_Pixel_AmountDesign_Price_History_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Design_Text_Size = table.Column<int>(type: "int", nullable: false),
                    Design_Text_Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Design_Texts", x => x.Design_Text_ID);
                    table.ForeignKey(
                        name: "FK_Design_Texts_Design_Price_History_Design_Price_Pixel_AmountDesign_Price_History_ID",
                        column: x => x.Design_Price_Pixel_AmountDesign_Price_History_ID,
                        principalTable: "Design_Price_History",
                        principalColumn: "Design_Price_History_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Invoice_Discount",
                columns: table => new
                {
                    Invoice_Discount_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Discount_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Discount_Reason = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoice_Discount", x => x.Invoice_Discount_ID);
                    table.ForeignKey(
                        name: "FK_Invoice_Discount_Discounts_Discount_ID",
                        column: x => x.Discount_ID,
                        principalTable: "Discounts",
                        principalColumn: "Discount_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Cities",
                columns: table => new
                {
                    City_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Province_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    City_Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cities", x => x.City_ID);
                    table.ForeignKey(
                        name: "FK_Cities_Provinces_Province_ID",
                        column: x => x.Province_ID,
                        principalTable: "Provinces",
                        principalColumn: "Province_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BestSellersStock_Item",
                columns: table => new
                {
                    BestSellersBestSeller_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Stock_Item_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BestSellersStock_Item", x => new { x.BestSellersBestSeller_ID, x.Stock_Item_ID });
                    table.ForeignKey(
                        name: "FK_BestSellersStock_Item_BestSellers_BestSellersBestSeller_ID",
                        column: x => x.BestSellersBestSeller_ID,
                        principalTable: "BestSellers",
                        principalColumn: "BestSeller_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BestSellersStock_Item_Stock_Items_Stock_Item_ID",
                        column: x => x.Stock_Item_ID,
                        principalTable: "Stock_Items",
                        principalColumn: "Stock_Item_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Stock_ImageStock_Item",
                columns: table => new
                {
                    Stock_ImagesStock_Image_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Stock_Item_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stock_ImageStock_Item", x => new { x.Stock_ImagesStock_Image_ID, x.Stock_Item_ID });
                    table.ForeignKey(
                        name: "FK_Stock_ImageStock_Item_Stock_Images_Stock_ImagesStock_Image_ID",
                        column: x => x.Stock_ImagesStock_Image_ID,
                        principalTable: "Stock_Images",
                        principalColumn: "Stock_Image_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Stock_ImageStock_Item_Stock_Items_Stock_Item_ID",
                        column: x => x.Stock_Item_ID,
                        principalTable: "Stock_Items",
                        principalColumn: "Stock_Item_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Stock_ItemStock_Item_Colour",
                columns: table => new
                {
                    Stock_Item_ColoursStock_Item_Colour_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Stock_Item_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stock_ItemStock_Item_Colour", x => new { x.Stock_Item_ColoursStock_Item_Colour_ID, x.Stock_Item_ID });
                    table.ForeignKey(
                        name: "FK_Stock_ItemStock_Item_Colour_Stock_Item_Colours_Stock_Item_ColoursStock_Item_Colour_ID",
                        column: x => x.Stock_Item_ColoursStock_Item_Colour_ID,
                        principalTable: "Stock_Item_Colours",
                        principalColumn: "Stock_Item_Colour_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Stock_ItemStock_Item_Colour_Stock_Items_Stock_Item_ID",
                        column: x => x.Stock_Item_ID,
                        principalTable: "Stock_Items",
                        principalColumn: "Stock_Item_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Stock_Price_Histories",
                columns: table => new
                {
                    Stock_Price_History_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Stock_Item_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Stock_Price_Amount = table.Column<double>(type: "float", nullable: false),
                    Effective_From_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Effective_To_Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stock_Price_Histories", x => x.Stock_Price_History_ID);
                    table.ForeignKey(
                        name: "FK_Stock_Price_Histories_Stock_Items_Stock_Item_ID",
                        column: x => x.Stock_Item_ID,
                        principalTable: "Stock_Items",
                        principalColumn: "Stock_Item_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Stock_ItemStock_Type",
                columns: table => new
                {
                    Stock_Item_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Stock_TypesStock_Type_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stock_ItemStock_Type", x => new { x.Stock_Item_ID, x.Stock_TypesStock_Type_ID });
                    table.ForeignKey(
                        name: "FK_Stock_ItemStock_Type_Stock_Items_Stock_Item_ID",
                        column: x => x.Stock_Item_ID,
                        principalTable: "Stock_Items",
                        principalColumn: "Stock_Item_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Stock_ItemStock_Type_Stock_Types_Stock_TypesStock_Type_ID",
                        column: x => x.Stock_TypesStock_Type_ID,
                        principalTable: "Stock_Types",
                        principalColumn: "Stock_Type_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "User_Role_Permissions",
                columns: table => new
                {
                    User_Role_Permission_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    User_Role_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Permission_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_Role_Permissions", x => x.User_Role_Permission_ID);
                    table.ForeignKey(
                        name: "FK_User_Role_Permissions_Permissions_Permission_ID",
                        column: x => x.Permission_ID,
                        principalTable: "Permissions",
                        principalColumn: "Permission_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_User_Role_Permissions_User_Roles_User_Role_ID",
                        column: x => x.User_Role_ID,
                        principalTable: "User_Roles",
                        principalColumn: "User_Role_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    User_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    User_Role_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.User_ID);
                    table.ForeignKey(
                        name: "FK_Users_User_Roles_User_Role_ID",
                        column: x => x.User_Role_ID,
                        principalTable: "User_Roles",
                        principalColumn: "User_Role_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Personalisation_Designs",
                columns: table => new
                {
                    Personalisation_Design_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Design_Image_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Design_Text_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Personalisation_Design_Price = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Personalisation_Designs", x => x.Personalisation_Design_ID);
                    table.ForeignKey(
                        name: "FK_Personalisation_Designs_Design_Images_Design_Image_ID",
                        column: x => x.Design_Image_ID,
                        principalTable: "Design_Images",
                        principalColumn: "Design_Image_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Personalisation_Designs_Design_Texts_Design_Text_ID",
                        column: x => x.Design_Text_ID,
                        principalTable: "Design_Texts",
                        principalColumn: "Design_Text_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Address_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Province_NameProvince_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    City_NameCity_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Street = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Number = table.Column<int>(type: "int", nullable: false),
                    Dwelling_Type = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Unit_Number = table.Column<int>(type: "int", nullable: false),
                    Area_Code = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Address_ID);
                    table.ForeignKey(
                        name: "FK_Addresses_Cities_City_NameCity_ID",
                        column: x => x.City_NameCity_ID,
                        principalTable: "Cities",
                        principalColumn: "City_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Addresses_Provinces_Province_NameProvince_ID",
                        column: x => x.Province_NameProvince_ID,
                        principalTable: "Provinces",
                        principalColumn: "Province_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Customer_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Gender_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Address_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    User_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Surname = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Cell_Number = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Customer_ID);
                    table.ForeignKey(
                        name: "FK_Customers_Addresses_Address_ID",
                        column: x => x.Address_ID,
                        principalTable: "Addresses",
                        principalColumn: "Address_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Customers_Genders_Gender_ID",
                        column: x => x.Gender_ID,
                        principalTable: "Genders",
                        principalColumn: "Gender_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Customers_Titles_Title_ID",
                        column: x => x.Title_ID,
                        principalTable: "Titles",
                        principalColumn: "Title_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Customers_Users_User_ID",
                        column: x => x.User_ID,
                        principalTable: "Users",
                        principalColumn: "User_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Deliveries",
                columns: table => new
                {
                    Delivery_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Delivery_Company_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Delivery_AddressAddress_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Delivery_Price = table.Column<double>(type: "float", nullable: false),
                    Tracking_Number = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deliveries", x => x.Delivery_ID);
                    table.ForeignKey(
                        name: "FK_Deliveries_Addresses_Delivery_AddressAddress_ID",
                        column: x => x.Delivery_AddressAddress_ID,
                        principalTable: "Addresses",
                        principalColumn: "Address_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Deliveries_Delivery_Companies_Delivery_Company_ID",
                        column: x => x.Delivery_Company_ID,
                        principalTable: "Delivery_Companies",
                        principalColumn: "Delivery_Company_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Employee_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Gender_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Address_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    User_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Surname = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Cell_Number = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Employee_ID);
                    table.ForeignKey(
                        name: "FK_Employees_Addresses_Address_ID",
                        column: x => x.Address_ID,
                        principalTable: "Addresses",
                        principalColumn: "Address_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Employees_Genders_Gender_ID",
                        column: x => x.Gender_ID,
                        principalTable: "Genders",
                        principalColumn: "Gender_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Employees_Titles_Title_ID",
                        column: x => x.Title_ID,
                        principalTable: "Titles",
                        principalColumn: "Title_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Employees_Users_User_ID",
                        column: x => x.User_ID,
                        principalTable: "Users",
                        principalColumn: "User_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Basket",
                columns: table => new
                {
                    Basket_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Basket_Quantity = table.Column<int>(type: "int", nullable: false),
                    Customer_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Stock_Item_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Stock_Type_NameStock_Type_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Stock_Image_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Stock_Item_Colour_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Personalisation_Design_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Stock_Item_Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Stock_Item_ID = table.Column<int>(type: "int", nullable: false),
                    Customer_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Basket", x => x.Basket_ID);
                    table.ForeignKey(
                        name: "FK_Basket_Customers_Customer_ID1",
                        column: x => x.Customer_ID1,
                        principalTable: "Customers",
                        principalColumn: "Customer_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Basket_Personalisation_Designs_Personalisation_Design_ID",
                        column: x => x.Personalisation_Design_ID,
                        principalTable: "Personalisation_Designs",
                        principalColumn: "Personalisation_Design_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Basket_Stock_Images_Stock_Image_ID1",
                        column: x => x.Stock_Image_ID1,
                        principalTable: "Stock_Images",
                        principalColumn: "Stock_Image_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Basket_Stock_Item_Colours_Stock_Item_Colour_ID",
                        column: x => x.Stock_Item_Colour_ID,
                        principalTable: "Stock_Item_Colours",
                        principalColumn: "Stock_Item_Colour_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Basket_Stock_Items_Stock_Item_ID1",
                        column: x => x.Stock_Item_ID1,
                        principalTable: "Stock_Items",
                        principalColumn: "Stock_Item_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Basket_Stock_Types_Stock_Type_NameStock_Type_ID",
                        column: x => x.Stock_Type_NameStock_Type_ID,
                        principalTable: "Stock_Types",
                        principalColumn: "Stock_Type_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Experience_Ratings",
                columns: table => new
                {
                    Experience_Rating_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Customer_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Experience_Star_Rating = table.Column<int>(type: "int", nullable: false),
                    Experience_Rating_Comments = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Experience_Ratings", x => x.Experience_Rating_ID);
                    table.ForeignKey(
                        name: "FK_Experience_Ratings_Customers_Customer_ID",
                        column: x => x.Customer_ID,
                        principalTable: "Customers",
                        principalColumn: "Customer_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Order_Requests",
                columns: table => new
                {
                    Order_Request_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Customer_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Order_Request_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Order_Request_Total_Price = table.Column<double>(type: "float", nullable: false),
                    IsAccepted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order_Requests", x => x.Order_Request_ID);
                    table.ForeignKey(
                        name: "FK_Order_Requests_Customers_Customer_ID",
                        column: x => x.Customer_ID,
                        principalTable: "Customers",
                        principalColumn: "Customer_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Product_Ratings",
                columns: table => new
                {
                    Product_Rating_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Customer_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Stock_Item_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Product_Star_Rating = table.Column<int>(type: "int", nullable: false),
                    Product_Rating_Comments = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product_Ratings", x => x.Product_Rating_ID);
                    table.ForeignKey(
                        name: "FK_Product_Ratings_Customers_Customer_ID",
                        column: x => x.Customer_ID,
                        principalTable: "Customers",
                        principalColumn: "Customer_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Product_Ratings_Stock_Items_Stock_Item_ID",
                        column: x => x.Stock_Item_ID,
                        principalTable: "Stock_Items",
                        principalColumn: "Stock_Item_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Refunds",
                columns: table => new
                {
                    Refund_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Customer_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Customer_Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Refund_Policy_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Refund_Comment = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Refund_Status = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Refunds", x => x.Refund_ID);
                    table.ForeignKey(
                        name: "FK_Refunds_Customers_Customer_ID",
                        column: x => x.Customer_ID,
                        principalTable: "Customers",
                        principalColumn: "Customer_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Refunds_Refund_Policies_Refund_Policy_ID",
                        column: x => x.Refund_Policy_ID,
                        principalTable: "Refund_Policies",
                        principalColumn: "Refund_Policy_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Invoices",
                columns: table => new
                {
                    Invoice_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Customer_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Employee_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Invoice_Discount_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Delivery_Price = table.Column<double>(type: "float", nullable: false),
                    Invoice_Total_exclVAT = table.Column<double>(type: "float", nullable: false),
                    Invoice_Total_VAT = table.Column<double>(type: "float", nullable: false),
                    Invoice_Total_inclVAT = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoices", x => x.Invoice_ID);
                    table.ForeignKey(
                        name: "FK_Invoices_Customers_Customer_ID",
                        column: x => x.Customer_ID,
                        principalTable: "Customers",
                        principalColumn: "Customer_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Invoices_Employees_Employee_ID",
                        column: x => x.Employee_ID,
                        principalTable: "Employees",
                        principalColumn: "Employee_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Invoices_Invoice_Discount_Invoice_Discount_ID",
                        column: x => x.Invoice_Discount_ID,
                        principalTable: "Invoice_Discount",
                        principalColumn: "Invoice_Discount_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Write_Offs",
                columns: table => new
                {
                    Write_Off_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Inventory_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Employee_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Write_Off_Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Write_Offs", x => x.Write_Off_ID);
                    table.ForeignKey(
                        name: "FK_Write_Offs_Employees_Employee_ID",
                        column: x => x.Employee_ID,
                        principalTable: "Employees",
                        principalColumn: "Employee_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Write_Offs_Inventories_Inventory_ID",
                        column: x => x.Inventory_ID,
                        principalTable: "Inventories",
                        principalColumn: "Stock_Item_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Order_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Order_Request_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Order_Status_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Order_Notes = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Order_Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Order_ID);
                    table.ForeignKey(
                        name: "FK_Orders_Order_Requests_Order_Request_ID",
                        column: x => x.Order_Request_ID,
                        principalTable: "Order_Requests",
                        principalColumn: "Order_Request_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Orders_Order_Status_Order_Status_ID",
                        column: x => x.Order_Status_ID,
                        principalTable: "Order_Status",
                        principalColumn: "Order_Status_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Payment_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Invoice_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Payment_Amount = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.Payment_ID);
                    table.ForeignKey(
                        name: "FK_Payments_Invoices_Invoice_ID",
                        column: x => x.Invoice_ID,
                        principalTable: "Invoices",
                        principalColumn: "Invoice_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Write_Off_Line_Items",
                columns: table => new
                {
                    Write_Off_Line_Item_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Write_Off_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Stock_Item_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Write_Off_Quantity = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Write_Off_Reason = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Write_Off_Line_Items", x => x.Write_Off_Line_Item_ID);
                    table.ForeignKey(
                        name: "FK_Write_Off_Line_Items_Stock_Items_Stock_Item_ID",
                        column: x => x.Stock_Item_ID,
                        principalTable: "Stock_Items",
                        principalColumn: "Stock_Item_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Write_Off_Line_Items_Write_Offs_Write_Off_ID",
                        column: x => x.Write_Off_ID,
                        principalTable: "Write_Offs",
                        principalColumn: "Write_Off_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_City_NameCity_ID",
                table: "Addresses",
                column: "City_NameCity_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_Province_NameProvince_ID",
                table: "Addresses",
                column: "Province_NameProvince_ID");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Basket_Customer_ID1",
                table: "Basket",
                column: "Customer_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_Basket_Personalisation_Design_ID",
                table: "Basket",
                column: "Personalisation_Design_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Basket_Stock_Image_ID1",
                table: "Basket",
                column: "Stock_Image_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_Basket_Stock_Item_Colour_ID",
                table: "Basket",
                column: "Stock_Item_Colour_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Basket_Stock_Item_ID1",
                table: "Basket",
                column: "Stock_Item_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_Basket_Stock_Type_NameStock_Type_ID",
                table: "Basket",
                column: "Stock_Type_NameStock_Type_ID");

            migrationBuilder.CreateIndex(
                name: "IX_BestSellersStock_Item_Stock_Item_ID",
                table: "BestSellersStock_Item",
                column: "Stock_Item_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Cities_Province_ID",
                table: "Cities",
                column: "Province_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_Address_ID",
                table: "Customers",
                column: "Address_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_Gender_ID",
                table: "Customers",
                column: "Gender_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_Title_ID",
                table: "Customers",
                column: "Title_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_User_ID",
                table: "Customers",
                column: "User_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Deliveries_Delivery_AddressAddress_ID",
                table: "Deliveries",
                column: "Delivery_AddressAddress_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Deliveries_Delivery_Company_ID",
                table: "Deliveries",
                column: "Delivery_Company_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Design_Images_Design_Price_Pixel_AmountDesign_Price_History_ID",
                table: "Design_Images",
                column: "Design_Price_Pixel_AmountDesign_Price_History_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Design_Texts_Design_Price_Pixel_AmountDesign_Price_History_ID",
                table: "Design_Texts",
                column: "Design_Price_Pixel_AmountDesign_Price_History_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_Address_ID",
                table: "Employees",
                column: "Address_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_Gender_ID",
                table: "Employees",
                column: "Gender_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_Title_ID",
                table: "Employees",
                column: "Title_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_User_ID",
                table: "Employees",
                column: "User_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Experience_Ratings_Customer_ID",
                table: "Experience_Ratings",
                column: "Customer_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_Discount_Discount_ID",
                table: "Invoice_Discount",
                column: "Discount_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_Customer_ID",
                table: "Invoices",
                column: "Customer_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_Employee_ID",
                table: "Invoices",
                column: "Employee_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_Invoice_Discount_ID",
                table: "Invoices",
                column: "Invoice_Discount_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Order_Requests_Customer_ID",
                table: "Order_Requests",
                column: "Customer_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_Order_Request_ID",
                table: "Orders",
                column: "Order_Request_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_Order_Status_ID",
                table: "Orders",
                column: "Order_Status_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_Invoice_ID",
                table: "Payments",
                column: "Invoice_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Personalisation_Designs_Design_Image_ID",
                table: "Personalisation_Designs",
                column: "Design_Image_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Personalisation_Designs_Design_Text_ID",
                table: "Personalisation_Designs",
                column: "Design_Text_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Product_Ratings_Customer_ID",
                table: "Product_Ratings",
                column: "Customer_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Product_Ratings_Stock_Item_ID",
                table: "Product_Ratings",
                column: "Stock_Item_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Refunds_Customer_ID",
                table: "Refunds",
                column: "Customer_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Refunds_Refund_Policy_ID",
                table: "Refunds",
                column: "Refund_Policy_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Stock_ImageStock_Item_Stock_Item_ID",
                table: "Stock_ImageStock_Item",
                column: "Stock_Item_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Stock_ItemStock_Item_Colour_Stock_Item_ID",
                table: "Stock_ItemStock_Item_Colour",
                column: "Stock_Item_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Stock_ItemStock_Type_Stock_TypesStock_Type_ID",
                table: "Stock_ItemStock_Type",
                column: "Stock_TypesStock_Type_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Stock_Price_Histories_Stock_Item_ID",
                table: "Stock_Price_Histories",
                column: "Stock_Item_ID");

            migrationBuilder.CreateIndex(
                name: "IX_User_Role_Permissions_Permission_ID",
                table: "User_Role_Permissions",
                column: "Permission_ID");

            migrationBuilder.CreateIndex(
                name: "IX_User_Role_Permissions_User_Role_ID",
                table: "User_Role_Permissions",
                column: "User_Role_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Users_User_Role_ID",
                table: "Users",
                column: "User_Role_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Write_Off_Line_Items_Stock_Item_ID",
                table: "Write_Off_Line_Items",
                column: "Stock_Item_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Write_Off_Line_Items_Write_Off_ID",
                table: "Write_Off_Line_Items",
                column: "Write_Off_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Write_Offs_Employee_ID",
                table: "Write_Offs",
                column: "Employee_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Write_Offs_Inventory_ID",
                table: "Write_Offs",
                column: "Inventory_ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Basket");

            migrationBuilder.DropTable(
                name: "BestSellersStock_Item");

            migrationBuilder.DropTable(
                name: "Deliveries");

            migrationBuilder.DropTable(
                name: "Experience_Ratings");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Payment_Types");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Product_Ratings");

            migrationBuilder.DropTable(
                name: "Refund_Reasons");

            migrationBuilder.DropTable(
                name: "Refunds");

            migrationBuilder.DropTable(
                name: "Stock_ImageStock_Item");

            migrationBuilder.DropTable(
                name: "Stock_ItemStock_Item_Colour");

            migrationBuilder.DropTable(
                name: "Stock_ItemStock_Type");

            migrationBuilder.DropTable(
                name: "Stock_Price_Histories");

            migrationBuilder.DropTable(
                name: "User_Role_Permissions");

            migrationBuilder.DropTable(
                name: "Write_Off_Line_Items");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Personalisation_Designs");

            migrationBuilder.DropTable(
                name: "BestSellers");

            migrationBuilder.DropTable(
                name: "Delivery_Companies");

            migrationBuilder.DropTable(
                name: "Order_Requests");

            migrationBuilder.DropTable(
                name: "Order_Status");

            migrationBuilder.DropTable(
                name: "Invoices");

            migrationBuilder.DropTable(
                name: "Refund_Policies");

            migrationBuilder.DropTable(
                name: "Stock_Images");

            migrationBuilder.DropTable(
                name: "Stock_Item_Colours");

            migrationBuilder.DropTable(
                name: "Stock_Types");

            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "Stock_Items");

            migrationBuilder.DropTable(
                name: "Write_Offs");

            migrationBuilder.DropTable(
                name: "Design_Images");

            migrationBuilder.DropTable(
                name: "Design_Texts");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "Invoice_Discount");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Inventories");

            migrationBuilder.DropTable(
                name: "Design_Price_History");

            migrationBuilder.DropTable(
                name: "Discounts");

            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "Genders");

            migrationBuilder.DropTable(
                name: "Titles");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Cities");

            migrationBuilder.DropTable(
                name: "User_Roles");

            migrationBuilder.DropTable(
                name: "Provinces");
        }
    }
}
