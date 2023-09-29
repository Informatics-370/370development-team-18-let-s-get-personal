export class OrderLineItemVM{
    delivery_Price!: number
    delivery_Company_Name!: string
    delivery_Status!: string
    streetName!: string
    streetNumber!: number
    dwelling_Type!: string
    unit_Number!: number
    city!: string
    province!: string
    areaCode!: string
   
    customer_ID!: number
    customer_Username!: string

    order_Request_Date!: Date
    order_Request_Total_Price!: number

    image_File!: string
    image_Price_amount!: number
    
    design_Text!: string
    text_Price_Amount!: number

    stock_Item_Name!: string
    stock_Item_Price!: number
    stock_Item_Size!: string
    stock_Colour_Name!: string
    personalisation_Design_Price!: number

    order_Line_Item_ID!: number
    order_Line_Item_Price!: number
    order_Line_Item_Quantity!: number
    order_Line_Item_Total_Price!: number
    order_Status!: string
}