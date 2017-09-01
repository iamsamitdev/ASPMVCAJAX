using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AjaxCrudJson.Startup))]
namespace AjaxCrudJson
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
