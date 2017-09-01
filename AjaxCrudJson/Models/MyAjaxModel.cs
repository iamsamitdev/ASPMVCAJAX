namespace AjaxCrudJson.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class MyAjaxModel : DbContext
    {
        public MyAjaxModel()
            : base("name=MyAjaxModel")
        {
        }

        public virtual DbSet<Product> Product { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .Property(e => e.Name)
                .IsFixedLength();
        }
    }
}
