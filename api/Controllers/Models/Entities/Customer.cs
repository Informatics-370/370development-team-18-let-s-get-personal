using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Customer
  {
        [Key]
        public Guid Customer_ID { get; set; }

        [StringLength(255)]
        public string FirstName { get; set; }

        [StringLength(255)]
        public string Surname { get; set; }

        [StringLength(13)]
        public string Cell_Number { get; set; }

        [StringLength(255)]
        public string Email { get; set; }

        [StringLength(255)]
        public string Username { get; set; }

        public DateTime Date_Registered { get; set; }

        //foreign key user        
        public Guid User_ID { get; set; }

        public User User { get; set; }

        public virtual ICollection<Basket> Basket { get; set; }


        public virtual ICollection<Order_Request> Order_Request { get; set; }
        
    }
}
//public Customer()
//{
//    Basket = new HashSet<Basket>();
//    Order_Request = new HashSet<Order_Request>();
//}

//public virtual ICollection<User> User { get; set; }

//FK basket
//public Guid Basket_ID { get; set; }
//public Basket Basket { get; set; }

//foreign key Title

//public Guid? Title_ID { get; set; }        
//public virtual Title Title { get; set; }

//FK Order request
//public Guid Order_Request_ID { get; set; }
//public Order_Request Order_Request { get; set; }

//inverse properties

//public virtual ICollection<Address> Address { get; set; }