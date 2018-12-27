using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        //[RegularExpression(@"^[A-Z]+[a-zA-z""'\s-]*$",ErrorMessage = "capitalize the first letter")]
        //[Required]
        public string Firstname { get; set; }
        //[RegularExpression(@"^[A-Z]+[a-zA-z""'\s-]*$", ErrorMessage = "capitalize the first letter")]
        //[Required]
        public string Lastname { get; set; }
        public bool IsComplete { get; set; }
        //[Required]
        public string Gender { get; set; }
        
        //[DataType(DataType.Date)]
        public DateTime Birthday { get; set; }
        //[RegularExpression(@"^1[358]\d{9}$", ErrorMessage = "input 1（3/5/8）XXXXXXXXX")]
        public long PhoneNumber { get; set; }
        public string Address { get; set; }
        //[EmailAddress]
        //[Remote(action: "VerifyEmail", controller: "Employees", AdditionalFields = "ID")]
        public string Email { get; set; }
        public string Department { get; set; }

    }
}