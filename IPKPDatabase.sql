USE [master]
GO
/****** Object:  Database [IPKPDatabase]    Script Date: 2023/08/03 13:46:35 ******/
CREATE DATABASE [IPKPDatabase]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'IPKPDatabase', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\IPKPDatabase.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'IPKPDatabase_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\IPKPDatabase_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [IPKPDatabase] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [IPKPDatabase].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [IPKPDatabase] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [IPKPDatabase] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [IPKPDatabase] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [IPKPDatabase] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [IPKPDatabase] SET ARITHABORT OFF 
GO
ALTER DATABASE [IPKPDatabase] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [IPKPDatabase] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [IPKPDatabase] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [IPKPDatabase] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [IPKPDatabase] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [IPKPDatabase] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [IPKPDatabase] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [IPKPDatabase] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [IPKPDatabase] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [IPKPDatabase] SET  ENABLE_BROKER 
GO
ALTER DATABASE [IPKPDatabase] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [IPKPDatabase] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [IPKPDatabase] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [IPKPDatabase] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [IPKPDatabase] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [IPKPDatabase] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [IPKPDatabase] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [IPKPDatabase] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [IPKPDatabase] SET  MULTI_USER 
GO
ALTER DATABASE [IPKPDatabase] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [IPKPDatabase] SET DB_CHAINING OFF 
GO
ALTER DATABASE [IPKPDatabase] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [IPKPDatabase] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [IPKPDatabase] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [IPKPDatabase] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [IPKPDatabase] SET QUERY_STORE = OFF
GO
USE [IPKPDatabase]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Admin]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Admin](
	[Admin_ID] [uniqueidentifier] NOT NULL,
	[FirstName] [nvarchar](255) NULL,
	[Surname] [nvarchar](255) NULL,
	[Cell_Number] [nvarchar](13) NULL,
	[Email] [nvarchar](255) NULL,
	[Username] [nvarchar](255) NULL,
	[User_ID] [uniqueidentifier] NOT NULL,
	[User_ID1] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Admin] PRIMARY KEY CLUSTERED 
(
	[Admin_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](450) NOT NULL,
	[ProviderKey] [nvarchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](450) NOT NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [nvarchar](450) NOT NULL,
	[LoginProvider] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](450) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Basket]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Basket](
	[Basket_ID] [uniqueidentifier] NOT NULL,
	[Basket_Quantity] [int] NOT NULL,
	[Stock_Item_ID] [uniqueidentifier] NULL,
	[Stock_Item_ID1] [uniqueidentifier] NULL,
	[Customer_ID] [uniqueidentifier] NULL,
	[Customer_ID1] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Basket] PRIMARY KEY CLUSTERED 
(
	[Basket_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BestSellers]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BestSellers](
	[BestSeller_ID] [uniqueidentifier] NOT NULL,
	[Stock_Item_ID] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_BestSellers] PRIMARY KEY CLUSTERED 
(
	[BestSeller_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BestSellersStock_Item]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BestSellersStock_Item](
	[BestSellersBestSeller_ID] [uniqueidentifier] NOT NULL,
	[Stock_Item_ID] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_BestSellersStock_Item] PRIMARY KEY CLUSTERED 
(
	[BestSellersBestSeller_ID] ASC,
	[Stock_Item_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customers]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customers](
	[Customer_ID] [uniqueidentifier] NOT NULL,
	[FirstName] [nvarchar](255) NULL,
	[Surname] [nvarchar](255) NULL,
	[Cell_Number] [nvarchar](13) NULL,
	[Email] [nvarchar](255) NULL,
	[Username] [nvarchar](255) NULL,
	[User_ID] [uniqueidentifier] NOT NULL,
	[User_ID1] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Customers] PRIMARY KEY CLUSTERED 
(
	[Customer_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Deliveries]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Deliveries](
	[Delivery_ID] [uniqueidentifier] NOT NULL,
	[Delivery_Price] [float] NOT NULL,
	[Tracking_Number] [int] NOT NULL,
	[Delivery_Address_ID] [uniqueidentifier] NULL,
	[Delivery_Address_ID1] [uniqueidentifier] NULL,
	[Delivery_Company_ID] [uniqueidentifier] NULL,
	[Delivery_Company_ID1] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Deliveries] PRIMARY KEY CLUSTERED 
(
	[Delivery_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Delivery_Address]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Delivery_Address](
	[Delivery_Address_ID] [uniqueidentifier] NOT NULL,
	[StreetNumber] [nvarchar](255) NULL,
	[StreetName] [nvarchar](255) NULL,
	[City] [nvarchar](255) NULL,
	[Province] [nvarchar](255) NULL,
	[AreaCode] [nvarchar](255) NULL,
	[Country] [nvarchar](255) NULL,
 CONSTRAINT [PK_Delivery_Address] PRIMARY KEY CLUSTERED 
(
	[Delivery_Address_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Delivery_Companies]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Delivery_Companies](
	[Delivery_Company_ID] [uniqueidentifier] NOT NULL,
	[Delivery_Company_Name] [nvarchar](255) NULL,
 CONSTRAINT [PK_Delivery_Companies] PRIMARY KEY CLUSTERED 
(
	[Delivery_Company_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Design_Images]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Design_Images](
	[Design_Image_ID] [uniqueidentifier] NOT NULL,
	[Design_Image_Size] [int] NOT NULL,
	[Design_Price_Pixel_AmountDesign_Price_History_ID] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Design_Images] PRIMARY KEY CLUSTERED 
(
	[Design_Image_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Design_Price_History]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Design_Price_History](
	[Design_Price_History_ID] [uniqueidentifier] NOT NULL,
	[Design_Price_Pixel_Amount] [float] NOT NULL,
	[Effective_From_Date] [datetime2](7) NOT NULL,
	[Effective_To_Date] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Design_Price_History] PRIMARY KEY CLUSTERED 
(
	[Design_Price_History_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Design_Texts]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Design_Texts](
	[Design_Text_ID] [uniqueidentifier] NOT NULL,
	[Design_Text_Description] [nvarchar](255) NULL,
	[Design_Text_Size] [int] NOT NULL,
	[Design_Price_Pixel_AmountDesign_Price_History_ID] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Design_Texts] PRIMARY KEY CLUSTERED 
(
	[Design_Text_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Discounts]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Discounts](
	[Discount_ID] [uniqueidentifier] NOT NULL,
	[Discount_Name] [nvarchar](255) NULL,
	[Discount_Amount] [float] NOT NULL,
	[Effective_From_Date] [datetime2](7) NOT NULL,
	[Effective_To_Date] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Discounts] PRIMARY KEY CLUSTERED 
(
	[Discount_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employees]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employees](
	[Employee_ID] [uniqueidentifier] NOT NULL,
	[FirstName] [nvarchar](255) NULL,
	[Surname] [nvarchar](255) NULL,
	[Cell_Number] [nvarchar](13) NULL,
	[Email] [nvarchar](255) NULL,
	[Username] [nvarchar](255) NULL,
	[User_ID] [uniqueidentifier] NOT NULL,
	[User_ID1] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Employees] PRIMARY KEY CLUSTERED 
(
	[Employee_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Experience_Rating]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Experience_Rating](
	[Experience_Rating_ID] [uniqueidentifier] NOT NULL,
	[Customer_ID] [uniqueidentifier] NULL,
	[Experience_Star_Rating] [int] NOT NULL,
	[Experience_Rating_Comments] [nvarchar](255) NULL,
 CONSTRAINT [PK_Experience_Rating] PRIMARY KEY CLUSTERED 
(
	[Experience_Rating_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Images]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Images](
	[Image_ID] [uniqueidentifier] NOT NULL,
	[Image_Size] [int] NOT NULL,
	[Image_File] [nvarchar](max) NULL,
 CONSTRAINT [PK_Images] PRIMARY KEY CLUSTERED 
(
	[Image_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Inventories]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Inventories](
	[Inventory_ID] [uniqueidentifier] NOT NULL,
	[Inventory_Date] [datetime2](7) NOT NULL,
	[Inventory_Comments] [nvarchar](255) NULL,
 CONSTRAINT [PK_Inventories] PRIMARY KEY CLUSTERED 
(
	[Inventory_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Inventory_Line_Items]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Inventory_Line_Items](
	[Inventory_Line_Item_ID] [uniqueidentifier] NOT NULL,
	[Inventory_Line_Quantity] [int] NOT NULL,
	[Inventory_ID] [uniqueidentifier] NOT NULL,
	[Inventory_ID1] [uniqueidentifier] NULL,
	[Stock_Item_ID] [uniqueidentifier] NOT NULL,
	[Stock_Item_ID1] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Inventory_Line_Items] PRIMARY KEY CLUSTERED 
(
	[Inventory_Line_Item_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Invoice_Discount]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Invoice_Discount](
	[Invoice_Discount_ID] [uniqueidentifier] NOT NULL,
	[Discount_ID] [uniqueidentifier] NULL,
	[Discount_Reason] [nvarchar](255) NULL,
 CONSTRAINT [PK_Invoice_Discount] PRIMARY KEY CLUSTERED 
(
	[Invoice_Discount_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Invoices]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Invoices](
	[Invoice_ID] [uniqueidentifier] NOT NULL,
	[Invoice_Discount_ID] [uniqueidentifier] NULL,
	[Delivery_Price] [float] NOT NULL,
	[Invoice_Total_exclVAT] [float] NOT NULL,
	[Invoice_Total_VAT] [float] NOT NULL,
	[Invoice_Total_inclVAT] [float] NOT NULL,
 CONSTRAINT [PK_Invoices] PRIMARY KEY CLUSTERED 
(
	[Invoice_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order_Requests]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order_Requests](
	[Order_Request_ID] [uniqueidentifier] NOT NULL,
	[Order_Request_Date] [datetime2](7) NOT NULL,
	[Order_Request_Total_Price] [float] NOT NULL,
	[IsAccepted] [bit] NOT NULL,
	[Customer_ID] [uniqueidentifier] NULL,
	[Customer_ID1] [uniqueidentifier] NULL,
	[Invoice_ID] [uniqueidentifier] NULL,
	[Invoice_ID1] [uniqueidentifier] NULL,
	[Delivery_Address_ID] [uniqueidentifier] NULL,
	[Delivery_Address_ID1] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Order_Requests] PRIMARY KEY CLUSTERED 
(
	[Order_Request_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order_Statuses]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order_Statuses](
	[Order_Status_ID] [uniqueidentifier] NOT NULL,
	[Order_Status_Description] [nvarchar](255) NULL,
 CONSTRAINT [PK_Order_Statuses] PRIMARY KEY CLUSTERED 
(
	[Order_Status_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[Order_ID] [uniqueidentifier] NOT NULL,
	[Order_Request_ID] [uniqueidentifier] NULL,
	[Order_Status_ID] [uniqueidentifier] NULL,
	[Order_Notes] [nvarchar](255) NULL,
	[Order_Date] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[Order_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment_Types]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment_Types](
	[Payment_Type_ID] [uniqueidentifier] NOT NULL,
	[Payment_Type_Name] [nvarchar](255) NULL,
 CONSTRAINT [PK_Payment_Types] PRIMARY KEY CLUSTERED 
(
	[Payment_Type_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payments]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payments](
	[Payment_ID] [uniqueidentifier] NOT NULL,
	[Invoice_ID] [uniqueidentifier] NULL,
	[Payment_Amount] [float] NOT NULL,
 CONSTRAINT [PK_Payments] PRIMARY KEY CLUSTERED 
(
	[Payment_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permissions]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permissions](
	[Permission_ID] [uniqueidentifier] NOT NULL,
	[Permission_Name] [nvarchar](255) NULL,
 CONSTRAINT [PK_Permissions] PRIMARY KEY CLUSTERED 
(
	[Permission_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personalisation_Designs]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personalisation_Designs](
	[Personalisation_Design_ID] [uniqueidentifier] NOT NULL,
	[Design_Image_ID] [uniqueidentifier] NULL,
	[Design_Text_ID] [uniqueidentifier] NULL,
	[ItemColour] [nvarchar](max) NULL,
	[DesignText] [nvarchar](max) NULL,
	[TextPosition] [nvarchar](max) NULL,
	[TextColour] [nvarchar](max) NULL,
	[Personalisation_Design_Price] [float] NOT NULL,
 CONSTRAINT [PK_Personalisation_Designs] PRIMARY KEY CLUSTERED 
(
	[Personalisation_Design_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_Ratings]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_Ratings](
	[Product_Rating_ID] [uniqueidentifier] NOT NULL,
	[Customer_ID] [uniqueidentifier] NULL,
	[Product_Rating_Comments] [nvarchar](255) NULL,
	[Product_Star_Rating] [int] NOT NULL,
 CONSTRAINT [PK_Product_Ratings] PRIMARY KEY CLUSTERED 
(
	[Product_Rating_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_RatingStock_Item]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_RatingStock_Item](
	[Product_Rating_ID] [uniqueidentifier] NOT NULL,
	[Stock_Item_ID] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Product_RatingStock_Item] PRIMARY KEY CLUSTERED 
(
	[Product_Rating_ID] ASC,
	[Stock_Item_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Refund_Policies]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Refund_Policies](
	[Refund_Policy_ID] [uniqueidentifier] NOT NULL,
	[Refund_Policy_Date] [datetime2](7) NOT NULL,
	[Refund_Policy_Version] [int] NOT NULL,
	[Refund_Policy_Description] [nvarchar](max) NULL,
 CONSTRAINT [PK_Refund_Policies] PRIMARY KEY CLUSTERED 
(
	[Refund_Policy_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Refund_Reasons]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Refund_Reasons](
	[Refund_Reason_ID] [uniqueidentifier] NOT NULL,
	[Refund_Reason_Description] [nvarchar](255) NULL,
 CONSTRAINT [PK_Refund_Reasons] PRIMARY KEY CLUSTERED 
(
	[Refund_Reason_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Refunds]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Refunds](
	[Refund_ID] [uniqueidentifier] NOT NULL,
	[Customer_ID] [uniqueidentifier] NULL,
	[Customer_Email] [nvarchar](max) NULL,
	[Refund_Policy_ID] [uniqueidentifier] NULL,
	[Refund_Comment] [nvarchar](255) NULL,
	[Refund_Status] [nvarchar](max) NULL,
 CONSTRAINT [PK_Refunds] PRIMARY KEY CLUSTERED 
(
	[Refund_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Stock_Images]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Stock_Images](
	[Stock_Image_ID] [uniqueidentifier] NOT NULL,
	[Stock_Image_File] [nvarchar](max) NULL,
 CONSTRAINT [PK_Stock_Images] PRIMARY KEY CLUSTERED 
(
	[Stock_Image_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Stock_Item_Colours]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Stock_Item_Colours](
	[Stock_Item_Colour_ID] [uniqueidentifier] NOT NULL,
	[Stock_Item_Colour_Name] [nvarchar](255) NULL,
 CONSTRAINT [PK_Stock_Item_Colours] PRIMARY KEY CLUSTERED 
(
	[Stock_Item_Colour_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Stock_Items]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Stock_Items](
	[Stock_Item_ID] [uniqueidentifier] NOT NULL,
	[Stock_Item_Name] [nvarchar](255) NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[Stock_Item_Size] [nvarchar](255) NULL,
	[Stock_Type_ID] [uniqueidentifier] NOT NULL,
	[Stock_Type_ID1] [uniqueidentifier] NULL,
	[Stock_Image_ID] [uniqueidentifier] NOT NULL,
	[Stock_Image_ID1] [uniqueidentifier] NULL,
	[Stock_Item_Colour_ID] [uniqueidentifier] NOT NULL,
	[Stock_Item_Colour_ID1] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Stock_Items] PRIMARY KEY CLUSTERED 
(
	[Stock_Item_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Stock_Price_Histories]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Stock_Price_Histories](
	[Stock_Price_History_ID] [uniqueidentifier] NOT NULL,
	[Stock_Price_Amount] [float] NOT NULL,
	[Effective_From_Date] [datetime2](7) NOT NULL,
	[Effective_To_Date] [datetime2](7) NOT NULL,
	[Stock_Item_ID] [uniqueidentifier] NOT NULL,
	[Stock_Item_ID1] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Stock_Price_Histories] PRIMARY KEY CLUSTERED 
(
	[Stock_Price_History_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Stock_Types]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Stock_Types](
	[Stock_Type_ID] [uniqueidentifier] NOT NULL,
	[Stock_Type_Name] [nvarchar](255) NULL,
 CONSTRAINT [PK_Stock_Types] PRIMARY KEY CLUSTERED 
(
	[Stock_Type_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User_Role_Permissions]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User_Role_Permissions](
	[User_Role_Permission_ID] [uniqueidentifier] NOT NULL,
	[User_Role_ID] [int] NOT NULL,
	[User_Role_ID1] [int] NULL,
	[Permission_ID] [int] NOT NULL,
	[Permission_ID1] [uniqueidentifier] NULL,
 CONSTRAINT [PK_User_Role_Permissions] PRIMARY KEY CLUSTERED 
(
	[User_Role_Permission_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User_Roles]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User_Roles](
	[User_Role_ID] [int] IDENTITY(1,1) NOT NULL,
	[User_Role_Name] [nvarchar](255) NULL,
 CONSTRAINT [PK_User_Roles] PRIMARY KEY CLUSTERED 
(
	[User_Role_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[User_ID] [uniqueidentifier] NOT NULL,
	[Username] [nvarchar](max) NULL,
	[Password] [nvarchar](max) NULL,
	[User_Role_ID] [int] NOT NULL,
	[User_Role_ID1] [int] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[User_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Write_Off_Line_Items]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Write_Off_Line_Items](
	[Write_Off_Line_Item_ID] [uniqueidentifier] NOT NULL,
	[Write_Off_Quantity] [nvarchar](255) NULL,
	[Write_Off_Reason] [nvarchar](255) NULL,
	[Write_Off_ID] [uniqueidentifier] NULL,
	[Stock_Item_ID] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Write_Off_Line_Items] PRIMARY KEY CLUSTERED 
(
	[Write_Off_Line_Item_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Write_Offs]    Script Date: 2023/08/03 13:46:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Write_Offs](
	[Write_Off_ID] [uniqueidentifier] NOT NULL,
	[Write_Off_Date] [datetime2](7) NOT NULL,
	[Inventory_ID] [uniqueidentifier] NULL,
	[Inventory_ID1] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Write_Offs] PRIMARY KEY CLUSTERED 
(
	[Write_Off_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_Admin_User_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Admin_User_ID1] ON [dbo].[Admin]
(
	[User_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetRoleClaims_RoleId]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetRoleClaims_RoleId] ON [dbo].[AspNetRoleClaims]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [RoleNameIndex]    Script Date: 2023/08/03 13:46:35 ******/
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[AspNetRoles]
(
	[NormalizedName] ASC
)
WHERE ([NormalizedName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserClaims_UserId]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserClaims_UserId] ON [dbo].[AspNetUserClaims]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserLogins_UserId]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserLogins_UserId] ON [dbo].[AspNetUserLogins]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserRoles_RoleId]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserRoles_RoleId] ON [dbo].[AspNetUserRoles]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [EmailIndex]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [EmailIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UserNameIndex]    Script Date: 2023/08/03 13:46:35 ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedUserName] ASC
)
WHERE ([NormalizedUserName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Basket_Customer_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Basket_Customer_ID1] ON [dbo].[Basket]
(
	[Customer_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Basket_Stock_Item_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Basket_Stock_Item_ID1] ON [dbo].[Basket]
(
	[Stock_Item_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_BestSellersStock_Item_Stock_Item_ID]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_BestSellersStock_Item_Stock_Item_ID] ON [dbo].[BestSellersStock_Item]
(
	[Stock_Item_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Customers_User_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Customers_User_ID1] ON [dbo].[Customers]
(
	[User_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Deliveries_Delivery_Address_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Deliveries_Delivery_Address_ID1] ON [dbo].[Deliveries]
(
	[Delivery_Address_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Deliveries_Delivery_Company_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Deliveries_Delivery_Company_ID1] ON [dbo].[Deliveries]
(
	[Delivery_Company_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Design_Images_Design_Price_Pixel_AmountDesign_Price_History_ID]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Design_Images_Design_Price_Pixel_AmountDesign_Price_History_ID] ON [dbo].[Design_Images]
(
	[Design_Price_Pixel_AmountDesign_Price_History_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Design_Texts_Design_Price_Pixel_AmountDesign_Price_History_ID]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Design_Texts_Design_Price_Pixel_AmountDesign_Price_History_ID] ON [dbo].[Design_Texts]
(
	[Design_Price_Pixel_AmountDesign_Price_History_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Employees_User_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Employees_User_ID1] ON [dbo].[Employees]
(
	[User_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Experience_Rating_Customer_ID]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Experience_Rating_Customer_ID] ON [dbo].[Experience_Rating]
(
	[Customer_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Inventory_Line_Items_Inventory_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Inventory_Line_Items_Inventory_ID1] ON [dbo].[Inventory_Line_Items]
(
	[Inventory_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Inventory_Line_Items_Stock_Item_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Inventory_Line_Items_Stock_Item_ID1] ON [dbo].[Inventory_Line_Items]
(
	[Stock_Item_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Invoice_Discount_Discount_ID]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Invoice_Discount_Discount_ID] ON [dbo].[Invoice_Discount]
(
	[Discount_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Invoices_Invoice_Discount_ID]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Invoices_Invoice_Discount_ID] ON [dbo].[Invoices]
(
	[Invoice_Discount_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Order_Requests_Customer_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Order_Requests_Customer_ID1] ON [dbo].[Order_Requests]
(
	[Customer_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Order_Requests_Delivery_Address_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Order_Requests_Delivery_Address_ID1] ON [dbo].[Order_Requests]
(
	[Delivery_Address_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Order_Requests_Invoice_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Order_Requests_Invoice_ID1] ON [dbo].[Order_Requests]
(
	[Invoice_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Orders_Order_Request_ID]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Orders_Order_Request_ID] ON [dbo].[Orders]
(
	[Order_Request_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Orders_Order_Status_ID]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Orders_Order_Status_ID] ON [dbo].[Orders]
(
	[Order_Status_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Payments_Invoice_ID]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Payments_Invoice_ID] ON [dbo].[Payments]
(
	[Invoice_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Personalisation_Designs_Design_Image_ID]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Personalisation_Designs_Design_Image_ID] ON [dbo].[Personalisation_Designs]
(
	[Design_Image_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Personalisation_Designs_Design_Text_ID]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Personalisation_Designs_Design_Text_ID] ON [dbo].[Personalisation_Designs]
(
	[Design_Text_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Product_Ratings_Customer_ID]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Product_Ratings_Customer_ID] ON [dbo].[Product_Ratings]
(
	[Customer_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Product_RatingStock_Item_Stock_Item_ID]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Product_RatingStock_Item_Stock_Item_ID] ON [dbo].[Product_RatingStock_Item]
(
	[Stock_Item_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Refunds_Customer_ID]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Refunds_Customer_ID] ON [dbo].[Refunds]
(
	[Customer_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Refunds_Refund_Policy_ID]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Refunds_Refund_Policy_ID] ON [dbo].[Refunds]
(
	[Refund_Policy_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Stock_Items_Stock_Image_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Stock_Items_Stock_Image_ID1] ON [dbo].[Stock_Items]
(
	[Stock_Image_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Stock_Items_Stock_Item_Colour_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Stock_Items_Stock_Item_Colour_ID1] ON [dbo].[Stock_Items]
(
	[Stock_Item_Colour_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Stock_Items_Stock_Type_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Stock_Items_Stock_Type_ID1] ON [dbo].[Stock_Items]
(
	[Stock_Type_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Stock_Price_Histories_Stock_Item_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Stock_Price_Histories_Stock_Item_ID1] ON [dbo].[Stock_Price_Histories]
(
	[Stock_Item_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_User_Role_Permissions_Permission_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_User_Role_Permissions_Permission_ID1] ON [dbo].[User_Role_Permissions]
(
	[Permission_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_User_Role_Permissions_User_Role_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_User_Role_Permissions_User_Role_ID1] ON [dbo].[User_Role_Permissions]
(
	[User_Role_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Users_User_Role_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Users_User_Role_ID1] ON [dbo].[Users]
(
	[User_Role_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Write_Off_Line_Items_Stock_Item_ID]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Write_Off_Line_Items_Stock_Item_ID] ON [dbo].[Write_Off_Line_Items]
(
	[Stock_Item_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Write_Off_Line_Items_Write_Off_ID]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Write_Off_Line_Items_Write_Off_ID] ON [dbo].[Write_Off_Line_Items]
(
	[Write_Off_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Write_Offs_Inventory_ID1]    Script Date: 2023/08/03 13:46:35 ******/
CREATE NONCLUSTERED INDEX [IX_Write_Offs_Inventory_ID1] ON [dbo].[Write_Offs]
(
	[Inventory_ID1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Admin]  WITH CHECK ADD  CONSTRAINT [FK_Admin_Users_User_ID1] FOREIGN KEY([User_ID1])
REFERENCES [dbo].[Users] ([User_ID])
GO
ALTER TABLE [dbo].[Admin] CHECK CONSTRAINT [FK_Admin_Users_User_ID1]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[Basket]  WITH CHECK ADD  CONSTRAINT [FK_Basket_Customers_Customer_ID1] FOREIGN KEY([Customer_ID1])
REFERENCES [dbo].[Customers] ([Customer_ID])
GO
ALTER TABLE [dbo].[Basket] CHECK CONSTRAINT [FK_Basket_Customers_Customer_ID1]
GO
ALTER TABLE [dbo].[Basket]  WITH CHECK ADD  CONSTRAINT [FK_Basket_Stock_Items_Stock_Item_ID1] FOREIGN KEY([Stock_Item_ID1])
REFERENCES [dbo].[Stock_Items] ([Stock_Item_ID])
GO
ALTER TABLE [dbo].[Basket] CHECK CONSTRAINT [FK_Basket_Stock_Items_Stock_Item_ID1]
GO
ALTER TABLE [dbo].[BestSellersStock_Item]  WITH CHECK ADD  CONSTRAINT [FK_BestSellersStock_Item_BestSellers_BestSellersBestSeller_ID] FOREIGN KEY([BestSellersBestSeller_ID])
REFERENCES [dbo].[BestSellers] ([BestSeller_ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BestSellersStock_Item] CHECK CONSTRAINT [FK_BestSellersStock_Item_BestSellers_BestSellersBestSeller_ID]
GO
ALTER TABLE [dbo].[BestSellersStock_Item]  WITH CHECK ADD  CONSTRAINT [FK_BestSellersStock_Item_Stock_Items_Stock_Item_ID] FOREIGN KEY([Stock_Item_ID])
REFERENCES [dbo].[Stock_Items] ([Stock_Item_ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BestSellersStock_Item] CHECK CONSTRAINT [FK_BestSellersStock_Item_Stock_Items_Stock_Item_ID]
GO
ALTER TABLE [dbo].[Customers]  WITH CHECK ADD  CONSTRAINT [FK_Customers_Users_User_ID1] FOREIGN KEY([User_ID1])
REFERENCES [dbo].[Users] ([User_ID])
GO
ALTER TABLE [dbo].[Customers] CHECK CONSTRAINT [FK_Customers_Users_User_ID1]
GO
ALTER TABLE [dbo].[Deliveries]  WITH CHECK ADD  CONSTRAINT [FK_Deliveries_Delivery_Address_Delivery_Address_ID1] FOREIGN KEY([Delivery_Address_ID1])
REFERENCES [dbo].[Delivery_Address] ([Delivery_Address_ID])
GO
ALTER TABLE [dbo].[Deliveries] CHECK CONSTRAINT [FK_Deliveries_Delivery_Address_Delivery_Address_ID1]
GO
ALTER TABLE [dbo].[Deliveries]  WITH CHECK ADD  CONSTRAINT [FK_Deliveries_Delivery_Companies_Delivery_Company_ID1] FOREIGN KEY([Delivery_Company_ID1])
REFERENCES [dbo].[Delivery_Companies] ([Delivery_Company_ID])
GO
ALTER TABLE [dbo].[Deliveries] CHECK CONSTRAINT [FK_Deliveries_Delivery_Companies_Delivery_Company_ID1]
GO
ALTER TABLE [dbo].[Design_Images]  WITH CHECK ADD  CONSTRAINT [FK_Design_Images_Design_Price_History_Design_Price_Pixel_AmountDesign_Price_History_ID] FOREIGN KEY([Design_Price_Pixel_AmountDesign_Price_History_ID])
REFERENCES [dbo].[Design_Price_History] ([Design_Price_History_ID])
GO
ALTER TABLE [dbo].[Design_Images] CHECK CONSTRAINT [FK_Design_Images_Design_Price_History_Design_Price_Pixel_AmountDesign_Price_History_ID]
GO
ALTER TABLE [dbo].[Design_Texts]  WITH CHECK ADD  CONSTRAINT [FK_Design_Texts_Design_Price_History_Design_Price_Pixel_AmountDesign_Price_History_ID] FOREIGN KEY([Design_Price_Pixel_AmountDesign_Price_History_ID])
REFERENCES [dbo].[Design_Price_History] ([Design_Price_History_ID])
GO
ALTER TABLE [dbo].[Design_Texts] CHECK CONSTRAINT [FK_Design_Texts_Design_Price_History_Design_Price_Pixel_AmountDesign_Price_History_ID]
GO
ALTER TABLE [dbo].[Employees]  WITH CHECK ADD  CONSTRAINT [FK_Employees_Users_User_ID1] FOREIGN KEY([User_ID1])
REFERENCES [dbo].[Users] ([User_ID])
GO
ALTER TABLE [dbo].[Employees] CHECK CONSTRAINT [FK_Employees_Users_User_ID1]
GO
ALTER TABLE [dbo].[Experience_Rating]  WITH CHECK ADD  CONSTRAINT [FK_Experience_Rating_Customers_Customer_ID] FOREIGN KEY([Customer_ID])
REFERENCES [dbo].[Customers] ([Customer_ID])
GO
ALTER TABLE [dbo].[Experience_Rating] CHECK CONSTRAINT [FK_Experience_Rating_Customers_Customer_ID]
GO
ALTER TABLE [dbo].[Inventory_Line_Items]  WITH CHECK ADD  CONSTRAINT [FK_Inventory_Line_Items_Inventories_Inventory_ID1] FOREIGN KEY([Inventory_ID1])
REFERENCES [dbo].[Inventories] ([Inventory_ID])
GO
ALTER TABLE [dbo].[Inventory_Line_Items] CHECK CONSTRAINT [FK_Inventory_Line_Items_Inventories_Inventory_ID1]
GO
ALTER TABLE [dbo].[Inventory_Line_Items]  WITH CHECK ADD  CONSTRAINT [FK_Inventory_Line_Items_Stock_Items_Stock_Item_ID1] FOREIGN KEY([Stock_Item_ID1])
REFERENCES [dbo].[Stock_Items] ([Stock_Item_ID])
GO
ALTER TABLE [dbo].[Inventory_Line_Items] CHECK CONSTRAINT [FK_Inventory_Line_Items_Stock_Items_Stock_Item_ID1]
GO
ALTER TABLE [dbo].[Invoice_Discount]  WITH CHECK ADD  CONSTRAINT [FK_Invoice_Discount_Discounts_Discount_ID] FOREIGN KEY([Discount_ID])
REFERENCES [dbo].[Discounts] ([Discount_ID])
GO
ALTER TABLE [dbo].[Invoice_Discount] CHECK CONSTRAINT [FK_Invoice_Discount_Discounts_Discount_ID]
GO
ALTER TABLE [dbo].[Invoices]  WITH CHECK ADD  CONSTRAINT [FK_Invoices_Invoice_Discount_Invoice_Discount_ID] FOREIGN KEY([Invoice_Discount_ID])
REFERENCES [dbo].[Invoice_Discount] ([Invoice_Discount_ID])
GO
ALTER TABLE [dbo].[Invoices] CHECK CONSTRAINT [FK_Invoices_Invoice_Discount_Invoice_Discount_ID]
GO
ALTER TABLE [dbo].[Order_Requests]  WITH CHECK ADD  CONSTRAINT [FK_Order_Requests_Customers_Customer_ID1] FOREIGN KEY([Customer_ID1])
REFERENCES [dbo].[Customers] ([Customer_ID])
GO
ALTER TABLE [dbo].[Order_Requests] CHECK CONSTRAINT [FK_Order_Requests_Customers_Customer_ID1]
GO
ALTER TABLE [dbo].[Order_Requests]  WITH CHECK ADD  CONSTRAINT [FK_Order_Requests_Delivery_Address_Delivery_Address_ID1] FOREIGN KEY([Delivery_Address_ID1])
REFERENCES [dbo].[Delivery_Address] ([Delivery_Address_ID])
GO
ALTER TABLE [dbo].[Order_Requests] CHECK CONSTRAINT [FK_Order_Requests_Delivery_Address_Delivery_Address_ID1]
GO
ALTER TABLE [dbo].[Order_Requests]  WITH CHECK ADD  CONSTRAINT [FK_Order_Requests_Invoices_Invoice_ID1] FOREIGN KEY([Invoice_ID1])
REFERENCES [dbo].[Invoices] ([Invoice_ID])
GO
ALTER TABLE [dbo].[Order_Requests] CHECK CONSTRAINT [FK_Order_Requests_Invoices_Invoice_ID1]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Order_Requests_Order_Request_ID] FOREIGN KEY([Order_Request_ID])
REFERENCES [dbo].[Order_Requests] ([Order_Request_ID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Order_Requests_Order_Request_ID]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Order_Statuses_Order_Status_ID] FOREIGN KEY([Order_Status_ID])
REFERENCES [dbo].[Order_Statuses] ([Order_Status_ID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Order_Statuses_Order_Status_ID]
GO
ALTER TABLE [dbo].[Payments]  WITH CHECK ADD  CONSTRAINT [FK_Payments_Invoices_Invoice_ID] FOREIGN KEY([Invoice_ID])
REFERENCES [dbo].[Invoices] ([Invoice_ID])
GO
ALTER TABLE [dbo].[Payments] CHECK CONSTRAINT [FK_Payments_Invoices_Invoice_ID]
GO
ALTER TABLE [dbo].[Personalisation_Designs]  WITH CHECK ADD  CONSTRAINT [FK_Personalisation_Designs_Design_Images_Design_Image_ID] FOREIGN KEY([Design_Image_ID])
REFERENCES [dbo].[Design_Images] ([Design_Image_ID])
GO
ALTER TABLE [dbo].[Personalisation_Designs] CHECK CONSTRAINT [FK_Personalisation_Designs_Design_Images_Design_Image_ID]
GO
ALTER TABLE [dbo].[Personalisation_Designs]  WITH CHECK ADD  CONSTRAINT [FK_Personalisation_Designs_Design_Texts_Design_Text_ID] FOREIGN KEY([Design_Text_ID])
REFERENCES [dbo].[Design_Texts] ([Design_Text_ID])
GO
ALTER TABLE [dbo].[Personalisation_Designs] CHECK CONSTRAINT [FK_Personalisation_Designs_Design_Texts_Design_Text_ID]
GO
ALTER TABLE [dbo].[Product_Ratings]  WITH CHECK ADD  CONSTRAINT [FK_Product_Ratings_Customers_Customer_ID] FOREIGN KEY([Customer_ID])
REFERENCES [dbo].[Customers] ([Customer_ID])
GO
ALTER TABLE [dbo].[Product_Ratings] CHECK CONSTRAINT [FK_Product_Ratings_Customers_Customer_ID]
GO
ALTER TABLE [dbo].[Product_RatingStock_Item]  WITH CHECK ADD  CONSTRAINT [FK_Product_RatingStock_Item_Product_Ratings_Product_Rating_ID] FOREIGN KEY([Product_Rating_ID])
REFERENCES [dbo].[Product_Ratings] ([Product_Rating_ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Product_RatingStock_Item] CHECK CONSTRAINT [FK_Product_RatingStock_Item_Product_Ratings_Product_Rating_ID]
GO
ALTER TABLE [dbo].[Product_RatingStock_Item]  WITH CHECK ADD  CONSTRAINT [FK_Product_RatingStock_Item_Stock_Items_Stock_Item_ID] FOREIGN KEY([Stock_Item_ID])
REFERENCES [dbo].[Stock_Items] ([Stock_Item_ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Product_RatingStock_Item] CHECK CONSTRAINT [FK_Product_RatingStock_Item_Stock_Items_Stock_Item_ID]
GO
ALTER TABLE [dbo].[Refunds]  WITH CHECK ADD  CONSTRAINT [FK_Refunds_Customers_Customer_ID] FOREIGN KEY([Customer_ID])
REFERENCES [dbo].[Customers] ([Customer_ID])
GO
ALTER TABLE [dbo].[Refunds] CHECK CONSTRAINT [FK_Refunds_Customers_Customer_ID]
GO
ALTER TABLE [dbo].[Refunds]  WITH CHECK ADD  CONSTRAINT [FK_Refunds_Refund_Policies_Refund_Policy_ID] FOREIGN KEY([Refund_Policy_ID])
REFERENCES [dbo].[Refund_Policies] ([Refund_Policy_ID])
GO
ALTER TABLE [dbo].[Refunds] CHECK CONSTRAINT [FK_Refunds_Refund_Policies_Refund_Policy_ID]
GO
ALTER TABLE [dbo].[Stock_Items]  WITH CHECK ADD  CONSTRAINT [FK_Stock_Items_Stock_Images_Stock_Image_ID1] FOREIGN KEY([Stock_Image_ID1])
REFERENCES [dbo].[Stock_Images] ([Stock_Image_ID])
GO
ALTER TABLE [dbo].[Stock_Items] CHECK CONSTRAINT [FK_Stock_Items_Stock_Images_Stock_Image_ID1]
GO
ALTER TABLE [dbo].[Stock_Items]  WITH CHECK ADD  CONSTRAINT [FK_Stock_Items_Stock_Item_Colours_Stock_Item_Colour_ID1] FOREIGN KEY([Stock_Item_Colour_ID1])
REFERENCES [dbo].[Stock_Item_Colours] ([Stock_Item_Colour_ID])
GO
ALTER TABLE [dbo].[Stock_Items] CHECK CONSTRAINT [FK_Stock_Items_Stock_Item_Colours_Stock_Item_Colour_ID1]
GO
ALTER TABLE [dbo].[Stock_Items]  WITH CHECK ADD  CONSTRAINT [FK_Stock_Items_Stock_Types_Stock_Type_ID1] FOREIGN KEY([Stock_Type_ID1])
REFERENCES [dbo].[Stock_Types] ([Stock_Type_ID])
GO
ALTER TABLE [dbo].[Stock_Items] CHECK CONSTRAINT [FK_Stock_Items_Stock_Types_Stock_Type_ID1]
GO
ALTER TABLE [dbo].[Stock_Price_Histories]  WITH CHECK ADD  CONSTRAINT [FK_Stock_Price_Histories_Stock_Items_Stock_Item_ID1] FOREIGN KEY([Stock_Item_ID1])
REFERENCES [dbo].[Stock_Items] ([Stock_Item_ID])
GO
ALTER TABLE [dbo].[Stock_Price_Histories] CHECK CONSTRAINT [FK_Stock_Price_Histories_Stock_Items_Stock_Item_ID1]
GO
ALTER TABLE [dbo].[User_Role_Permissions]  WITH CHECK ADD  CONSTRAINT [FK_User_Role_Permissions_Permissions_Permission_ID1] FOREIGN KEY([Permission_ID1])
REFERENCES [dbo].[Permissions] ([Permission_ID])
GO
ALTER TABLE [dbo].[User_Role_Permissions] CHECK CONSTRAINT [FK_User_Role_Permissions_Permissions_Permission_ID1]
GO
ALTER TABLE [dbo].[User_Role_Permissions]  WITH CHECK ADD  CONSTRAINT [FK_User_Role_Permissions_User_Roles_User_Role_ID1] FOREIGN KEY([User_Role_ID1])
REFERENCES [dbo].[User_Roles] ([User_Role_ID])
GO
ALTER TABLE [dbo].[User_Role_Permissions] CHECK CONSTRAINT [FK_User_Role_Permissions_User_Roles_User_Role_ID1]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_User_Roles_User_Role_ID1] FOREIGN KEY([User_Role_ID1])
REFERENCES [dbo].[User_Roles] ([User_Role_ID])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_User_Roles_User_Role_ID1]
GO
ALTER TABLE [dbo].[Write_Off_Line_Items]  WITH CHECK ADD  CONSTRAINT [FK_Write_Off_Line_Items_Stock_Items_Stock_Item_ID] FOREIGN KEY([Stock_Item_ID])
REFERENCES [dbo].[Stock_Items] ([Stock_Item_ID])
GO
ALTER TABLE [dbo].[Write_Off_Line_Items] CHECK CONSTRAINT [FK_Write_Off_Line_Items_Stock_Items_Stock_Item_ID]
GO
ALTER TABLE [dbo].[Write_Off_Line_Items]  WITH CHECK ADD  CONSTRAINT [FK_Write_Off_Line_Items_Write_Offs_Write_Off_ID] FOREIGN KEY([Write_Off_ID])
REFERENCES [dbo].[Write_Offs] ([Write_Off_ID])
GO
ALTER TABLE [dbo].[Write_Off_Line_Items] CHECK CONSTRAINT [FK_Write_Off_Line_Items_Write_Offs_Write_Off_ID]
GO
ALTER TABLE [dbo].[Write_Offs]  WITH CHECK ADD  CONSTRAINT [FK_Write_Offs_Inventories_Inventory_ID1] FOREIGN KEY([Inventory_ID1])
REFERENCES [dbo].[Inventories] ([Inventory_ID])
GO
ALTER TABLE [dbo].[Write_Offs] CHECK CONSTRAINT [FK_Write_Offs_Inventories_Inventory_ID1]
GO
USE [master]
GO
ALTER DATABASE [IPKPDatabase] SET  READ_WRITE 
GO
