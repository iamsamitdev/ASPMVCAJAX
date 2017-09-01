using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using AjaxCrudJson.Models;

namespace AjaxCrudJson.Controllers
{
    public class ProductController : Controller
    {
        private MyAjaxModel _dbContext;
        public ProductController()
        {
            _dbContext = new MyAjaxModel();
        }

        // GET: Product
        public ActionResult Index()
        {
            return View();
        }


        // GET Product All
        [HttpGet]
        public ActionResult GetProducts()
        {
            var tblProducts = _dbContext.Product.ToList(); // array
            return Json(tblProducts, JsonRequestBehavior.AllowGet);
        }

        // GET: Product/Details/5
        [HttpGet]
        public ActionResult Details(int id)
        {
            return View();
        }

        // Get product by id
        public ActionResult Get(int id)
        {
            var product = _dbContext.Product.ToList().Find(x => x.Id == id);
            return Json(product, JsonRequestBehavior.AllowGet);
        }

        // Create a new product
        [HttpPost]
        public ActionResult Create([Bind(Exclude = "Id")] Product product)
        {
            if (ModelState.IsValid)
            {
                _dbContext.Product.Add(product);
                _dbContext.SaveChanges();
            }

            return Json(product, JsonRequestBehavior.AllowGet);
        }

        // Update product
        [HttpPost]
        public ActionResult Update(Product product)
        {
            if (ModelState.IsValid)
            {
                _dbContext.Entry(product).State = EntityState.Modified;
                _dbContext.SaveChanges();
            }

            return Json(product, JsonRequestBehavior.AllowGet);
        }

        // Delete product by id
        [HttpPost]
        public ActionResult Delete(int id)
        {
            var product = _dbContext.Product.ToList().Find(x => x.Id == id);
            if (product != null)
            {
                _dbContext.Product.Remove(product);
                _dbContext.SaveChanges();
            }

            return Json(product, JsonRequestBehavior.AllowGet);
        }
    }
}
