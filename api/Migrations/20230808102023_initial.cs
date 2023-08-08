using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IPKP___API.Migrations
{
    public partial class initial : Migration 
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
                name: "Delivery_Address",
                columns: table => new
                {
                    Delivery_Address_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StreetNumber = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    StreetName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    City = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Province = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    AreaCode = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Country = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Delivery_Address", x => x.Delivery_Address_ID);
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
                name: "Images",
                columns: table => new
                {
                    Image_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Image_Size = table.Column<int>(type: "int", nullable: false),
                    Image_File = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Image_Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Image_ID);
                });

            migrationBuilder.CreateTable(
                name: "Order_Statuses",
                columns: table => new
                {
                    Order_Status_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Order_Status_Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order_Statuses", x => x.Order_Status_ID);
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
                    Stock_Image_Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stock_Images", x => x.Stock_Image_ID);
                });

            migrationBuilder.CreateTable(
                name: "Stock_Item_Colours",
                columns: table => new
                {
                    Stock_Item_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Stock_Item_Colour_Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stock_Item_Colours", x => x.Stock_Item_ID);
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
                name: "User_Roles",
                columns: table => new
                {
                    User_Role_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
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
                name: "Deliveries",
                columns: table => new
                {
                    Delivery_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Delivery_Price = table.Column<double>(type: "float", nullable: false),
                    Tracking_Number = table.Column<int>(type: "int", nullable: false),
                    Delivery_Address_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Delivery_Address_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Delivery_Company_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Delivery_Company_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deliveries", x => x.Delivery_ID);
                    table.ForeignKey(
                        name: "FK_Deliveries_Delivery_Address_Delivery_Address_ID1",
                        column: x => x.Delivery_Address_ID1,
                        principalTable: "Delivery_Address",
                        principalColumn: "Delivery_Address_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Deliveries_Delivery_Companies_Delivery_Company_ID1",
                        column: x => x.Delivery_Company_ID1,
                        principalTable: "Delivery_Companies",
                        principalColumn: "Delivery_Company_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Design_Images",
                columns: table => new
                {
                    Design_Image_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Design_Image_Size = table.Column<int>(type: "int", nullable: false),
                    Design_Price_Pixel_AmountDesign_Price_History_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
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
                    Design_Text_Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Design_Text_Size = table.Column<int>(type: "int", nullable: false),
                    Design_Price_Pixel_AmountDesign_Price_History_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
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
                name: "Stock_Items",
                columns: table => new
                {
                    Stock_Item_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Stock_Image_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Stock_Type_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Stock_Item_Colour_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Stock_Item_Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Stock_Item_Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Stock_Item_Size = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Inventory_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Inventory_Comments = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Stock_Item_Quantity = table.Column<int>(type: "int", nullable: false),
                    Stock_Type_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Stock_Image_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Stock_Item_Colour_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stock_Items", x => x.Stock_Item_ID);
                    table.ForeignKey(
                        name: "FK_Stock_Items_Stock_Images_Stock_Image_ID1",
                        column: x => x.Stock_Image_ID1,
                        principalTable: "Stock_Images",
                        principalColumn: "Stock_Image_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Stock_Items_Stock_Item_Colours_Stock_Item_Colour_ID1",
                        column: x => x.Stock_Item_Colour_ID1,
                        principalTable: "Stock_Item_Colours",
                        principalColumn: "Stock_Item_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Stock_Items_Stock_Types_Stock_Type_ID1",
                        column: x => x.Stock_Type_ID1,
                        principalTable: "Stock_Types",
                        principalColumn: "Stock_Type_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "User_Role_Permissions",
                columns: table => new
                {
                    User_Role_Permission_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    User_Role_ID = table.Column<int>(type: "int", nullable: false),
                    User_Role_ID1 = table.Column<int>(type: "int", nullable: true),
                    Permission_ID = table.Column<int>(type: "int", nullable: false),
                    Permission_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_Role_Permissions", x => x.User_Role_Permission_ID);
                    table.ForeignKey(
                        name: "FK_User_Role_Permissions_Permissions_Permission_ID1",
                        column: x => x.Permission_ID1,
                        principalTable: "Permissions",
                        principalColumn: "Permission_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_User_Role_Permissions_User_Roles_User_Role_ID1",
                        column: x => x.User_Role_ID1,
                        principalTable: "User_Roles",
                        principalColumn: "User_Role_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    User_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    User_Role_ID = table.Column<int>(type: "int", nullable: false),
                    User_Role_ID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.User_ID);
                    table.ForeignKey(
                        name: "FK_Users_User_Roles_User_Role_ID1",
                        column: x => x.User_Role_ID1,
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
                    ItemColour = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DesignText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TextPosition = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TextColour = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                name: "Invoices",
                columns: table => new
                {
                    Invoice_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
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
                        name: "FK_Invoices_Invoice_Discount_Invoice_Discount_ID",
                        column: x => x.Invoice_Discount_ID,
                        principalTable: "Invoice_Discount",
                        principalColumn: "Invoice_Discount_ID",
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
                name: "Stock_Price_Histories",
                columns: table => new
                {
                    Stock_Price_History_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Stock_Price_Amount = table.Column<double>(type: "float", nullable: false),
                    Effective_From_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Effective_To_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Stock_Item_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Stock_Item_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stock_Price_Histories", x => x.Stock_Price_History_ID);
                    table.ForeignKey(
                        name: "FK_Stock_Price_Histories_Stock_Items_Stock_Item_ID1",
                        column: x => x.Stock_Item_ID1,
                        principalTable: "Stock_Items",
                        principalColumn: "Stock_Item_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Write_Offs",
                columns: table => new
                {
                    Write_Off_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Write_Off_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Stock_Item_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Stock_Item_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Write_Offs", x => x.Write_Off_ID);
                    table.ForeignKey(
                        name: "FK_Write_Offs_Stock_Items_Stock_Item_ID1",
                        column: x => x.Stock_Item_ID1,
                        principalTable: "Stock_Items",
                        principalColumn: "Stock_Item_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Admin",
                columns: table => new
                {
                    Admin_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Surname = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Cell_Number = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Username = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    User_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    User_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin", x => x.Admin_ID);
                    table.ForeignKey(
                        name: "FK_Admin_Users_User_ID1",
                        column: x => x.User_ID1,
                        principalTable: "Users",
                        principalColumn: "User_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Customer_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Surname = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Cell_Number = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Username = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    User_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    User_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Customer_ID);
                    table.ForeignKey(
                        name: "FK_Customers_Users_User_ID1",
                        column: x => x.User_ID1,
                        principalTable: "Users",
                        principalColumn: "User_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Employee_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Surname = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Cell_Number = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Username = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    User_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    User_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Employee_ID);
                    table.ForeignKey(
                        name: "FK_Employees_Users_User_ID1",
                        column: x => x.User_ID1,
                        principalTable: "Users",
                        principalColumn: "User_ID",
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
                    Write_Off_Quantity = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Write_Off_Reason = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Write_Off_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Stock_Item_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
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

            migrationBuilder.CreateTable(
                name: "Basket",
                columns: table => new
                {
                    Basket_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Basket_Quantity = table.Column<int>(type: "int", nullable: false),
                    Stock_Item_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Stock_Item_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Customer_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Customer_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
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
                        name: "FK_Basket_Stock_Items_Stock_Item_ID1",
                        column: x => x.Stock_Item_ID1,
                        principalTable: "Stock_Items",
                        principalColumn: "Stock_Item_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Experience_Rating",
                columns: table => new
                {
                    Experience_Rating_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Customer_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Experience_Star_Rating = table.Column<int>(type: "int", nullable: false),
                    Experience_Rating_Comments = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Experience_Rating", x => x.Experience_Rating_ID);
                    table.ForeignKey(
                        name: "FK_Experience_Rating_Customers_Customer_ID",
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
                    Order_Request_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Order_Request_Total_Price = table.Column<double>(type: "float", nullable: false),
                    IsAccepted = table.Column<bool>(type: "bit", nullable: false),
                    Customer_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Customer_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Invoice_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Invoice_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Delivery_Address_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Delivery_Address_ID1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order_Requests", x => x.Order_Request_ID);
                    table.ForeignKey(
                        name: "FK_Order_Requests_Customers_Customer_ID1",
                        column: x => x.Customer_ID1,
                        principalTable: "Customers",
                        principalColumn: "Customer_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Order_Requests_Delivery_Address_Delivery_Address_ID1",
                        column: x => x.Delivery_Address_ID1,
                        principalTable: "Delivery_Address",
                        principalColumn: "Delivery_Address_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Order_Requests_Invoices_Invoice_ID1",
                        column: x => x.Invoice_ID1,
                        principalTable: "Invoices",
                        principalColumn: "Invoice_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Product_Ratings",
                columns: table => new
                {
                    Product_Rating_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Customer_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Product_Rating_Comments = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Product_Star_Rating = table.Column<int>(type: "int", nullable: false)
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
                        name: "FK_Orders_Order_Statuses_Order_Status_ID",
                        column: x => x.Order_Status_ID,
                        principalTable: "Order_Statuses",
                        principalColumn: "Order_Status_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Product_RatingStock_Item",
                columns: table => new
                {
                    Product_Rating_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Stock_Item_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product_RatingStock_Item", x => new { x.Product_Rating_ID, x.Stock_Item_ID });
                    table.ForeignKey(
                        name: "FK_Product_RatingStock_Item_Product_Ratings_Product_Rating_ID",
                        column: x => x.Product_Rating_ID,
                        principalTable: "Product_Ratings",
                        principalColumn: "Product_Rating_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Product_RatingStock_Item_Stock_Items_Stock_Item_ID",
                        column: x => x.Stock_Item_ID,
                        principalTable: "Stock_Items",
                        principalColumn: "Stock_Item_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Admin_User_ID1",
                table: "Admin",
                column: "User_ID1");

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
                name: "IX_Basket_Stock_Item_ID1",
                table: "Basket",
                column: "Stock_Item_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_BestSellersStock_Item_Stock_Item_ID",
                table: "BestSellersStock_Item",
                column: "Stock_Item_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_User_ID1",
                table: "Customers",
                column: "User_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_Deliveries_Delivery_Address_ID1",
                table: "Deliveries",
                column: "Delivery_Address_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_Deliveries_Delivery_Company_ID1",
                table: "Deliveries",
                column: "Delivery_Company_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_Design_Images_Design_Price_Pixel_AmountDesign_Price_History_ID",
                table: "Design_Images",
                column: "Design_Price_Pixel_AmountDesign_Price_History_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Design_Texts_Design_Price_Pixel_AmountDesign_Price_History_ID",
                table: "Design_Texts",
                column: "Design_Price_Pixel_AmountDesign_Price_History_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_User_ID1",
                table: "Employees",
                column: "User_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_Experience_Rating_Customer_ID",
                table: "Experience_Rating",
                column: "Customer_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_Discount_Discount_ID",
                table: "Invoice_Discount",
                column: "Discount_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_Invoice_Discount_ID",
                table: "Invoices",
                column: "Invoice_Discount_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Order_Requests_Customer_ID1",
                table: "Order_Requests",
                column: "Customer_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_Order_Requests_Delivery_Address_ID1",
                table: "Order_Requests",
                column: "Delivery_Address_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_Order_Requests_Invoice_ID1",
                table: "Order_Requests",
                column: "Invoice_ID1");

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
                name: "IX_Product_RatingStock_Item_Stock_Item_ID",
                table: "Product_RatingStock_Item",
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
                name: "IX_Stock_Items_Stock_Image_ID1",
                table: "Stock_Items",
                column: "Stock_Image_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_Stock_Items_Stock_Item_Colour_ID1",
                table: "Stock_Items",
                column: "Stock_Item_Colour_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_Stock_Items_Stock_Type_ID1",
                table: "Stock_Items",
                column: "Stock_Type_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_Stock_Price_Histories_Stock_Item_ID1",
                table: "Stock_Price_Histories",
                column: "Stock_Item_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_User_Role_Permissions_Permission_ID1",
                table: "User_Role_Permissions",
                column: "Permission_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_User_Role_Permissions_User_Role_ID1",
                table: "User_Role_Permissions",
                column: "User_Role_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_Users_User_Role_ID1",
                table: "Users",
                column: "User_Role_ID1");

            migrationBuilder.CreateIndex(
                name: "IX_Write_Off_Line_Items_Stock_Item_ID",
                table: "Write_Off_Line_Items",
                column: "Stock_Item_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Write_Off_Line_Items_Write_Off_ID",
                table: "Write_Off_Line_Items",
                column: "Write_Off_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Write_Offs_Stock_Item_ID1",
                table: "Write_Offs",
                column: "Stock_Item_ID1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admin");

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
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Experience_Rating");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Payment_Types");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Personalisation_Designs");

            migrationBuilder.DropTable(
                name: "Product_RatingStock_Item");

            migrationBuilder.DropTable(
                name: "Refund_Reasons");

            migrationBuilder.DropTable(
                name: "Refunds");

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
                name: "BestSellers");

            migrationBuilder.DropTable(
                name: "Delivery_Companies");

            migrationBuilder.DropTable(
                name: "Order_Requests");

            migrationBuilder.DropTable(
                name: "Order_Statuses");

            migrationBuilder.DropTable(
                name: "Design_Images");

            migrationBuilder.DropTable(
                name: "Design_Texts");

            migrationBuilder.DropTable(
                name: "Product_Ratings");

            migrationBuilder.DropTable(
                name: "Refund_Policies");

            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "Write_Offs");

            migrationBuilder.DropTable(
                name: "Delivery_Address");

            migrationBuilder.DropTable(
                name: "Invoices");

            migrationBuilder.DropTable(
                name: "Design_Price_History");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "Stock_Items");

            migrationBuilder.DropTable(
                name: "Invoice_Discount");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Stock_Images");

            migrationBuilder.DropTable(
                name: "Stock_Item_Colours");

            migrationBuilder.DropTable(
                name: "Stock_Types");

            migrationBuilder.DropTable(
                name: "Discounts");

            migrationBuilder.DropTable(
                name: "User_Roles");
        }
    }
}
