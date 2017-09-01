namespace AjaxCrudJson.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Product")]
    public partial class Product
    {
        public int Id { get; set; }

        [StringLength(200)]
        public string Name { get; set; }

        public double? Price { get; set; }
    }
}
