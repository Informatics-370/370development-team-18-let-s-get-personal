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
        public Customer()
        {
            Basket = new HashSet<Basket>();
            Order_Request = new HashSet<Order_Request>();
        }

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

        //foreign key Title

        [Column("Title_ID")]
        public Guid? Title_ID { get; set; }

        [ForeignKey(nameof(Title_ID))]
        [InverseProperty("Customer")]
        public virtual Title Title { get; set; }

        //foreign key user
        [Column("User_ID")]
        public Guid User_ID { get; set; }

        [ForeignKey(nameof(User_ID))]
        [InverseProperty("Customer")]
        public virtual User User { get; set; }

        //foreign key address
        [Column("Address_ID")]
        public Guid Address_ID { get; set; }

        [ForeignKey(nameof(Address_ID))]
        [InverseProperty("Customer")]
        public virtual Address Address { get; set; }

        
        //inverse properties
        [InverseProperty("Customer")]
        public virtual ICollection<Basket> Basket { get; set; }


        [InverseProperty("Customer")]
        public virtual ICollection<Order_Request> Order_Request { get; set; }
        
    }
}
